import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Search, Plus, ChefHat, User, Home, UtensilsCrossed, X, Menu, Printer, Check, Heart, Trash2, PlusCircle, Palette, ChevronRight, Edit2, Share2, Clock, Thermometer, ArrowLeft, LayoutGrid, List, Soup, Croissant, Cake, Pizza, Leaf, Droplet, Coffee, Image as ImageIcon, AlertTriangle, ChevronDown, FileJson, Copy, Database, Cloud, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
// @ts-ignore
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
// @ts-ignore
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
// @ts-ignore
import { getAnalytics, logEvent } from "firebase/analytics";

// --- Type Definitions ---
export interface Recipe {
  id: string;
  title: string;
  category: Category;
  ingredients: string[];
  instructions: string[];
  yields?: string;
  prepTime?: string;
  cookTime?: string;
  temp?: string;
  description?: string; // Subtitle or extra notes
  addedBy: string; // "Nan" for original, or user name
  userColor?: string; // Hex code for user avatar/badge
  timestamp: number;
  imageUrl?: string;
}

export enum Category {
  APPETIZERS = "Appetizers & Dips",
  SOUPS_SALADS = "Soups & Salads",
  BREADS_MUFFINS = "Breads & Muffins",
  MAIN_DISHES = "Main Dishes",
  SIDE_DISHES = "Side Dishes",
  DESSERTS = "Desserts & Baked Goods",
  SAUCES = "Sauces, Condiments & Extras"
}

export interface UserColorMap {
  [username: string]: string;
}

// --- Helpers ---

const getEnv = (key: string) => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key] || import.meta.env[`VITE_${key}`];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env) {
       return process.env[key] || process.env[`VITE_${key}`];
    }
  } catch (e) {}
  return "";
}

// Helper to safely get API Key without crashing if process is undefined (Vercel/Vite issue)
const getApiKey = () => getEnv('API_KEY');

// Helper to create IDs
const id = () => Math.random().toString(36).substr(2, 9);

// Image Resizer and Optimizer
const resizeImage = (file: File, maxWidth: number = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Export as JPEG with 0.8 quality for compression
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
            reject(new Error("Could not get canvas context"));
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID')
};

// Initialize Firebase only if config is present
let db: any = null;
let storage: any = null;
let analytics: any = null;

if (firebaseConfig.apiKey) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    try {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized");
    } catch (e) {
        console.warn("Analytics failed to initialize (likely due to environment)", e);
    }
    console.log("Firebase initialized successfully");
  } catch (e) {
    console.error("Firebase initialization failed:", e);
  }
}

// --- Data Service Layer ---
const DataService = {
  async getRecipes(): Promise<Recipe[]> {
    // Try Firebase first
    if (db) {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipes: Recipe[] = [];
        querySnapshot.forEach((doc: any) => {
          recipes.push(doc.data() as Recipe);
        });
        
        // If DB has data, return it
        if (recipes.length > 0) return recipes;
        // If DB is valid but empty, it might be a new setup, fall through to check local/initial
      } catch (e) {
        console.error("Error fetching from Firebase (falling back to local):", e);
        // Fall through to local storage
      }
    }

    // Fallback to LocalStorage
    const stored = localStorage.getItem('shirleys_kitchen_recipes');
    if (stored) return JSON.parse(stored);
    
    // Default fallback
    return [];
  },

  async uploadImage(base64Image: string, recipeId: string): Promise<string> {
    // If storage is not available, return the base64 string directly
    // NOTE: This might hit Firestore 1MB limits, but it's the only fallback without storage.
    if (!storage) {
        console.warn("Firebase Storage not configured. Saving image as Base64 (size limit risk).");
        return base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`; 
    }

    try {
        // Strip metadata prefix if present for uploadString
        const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
        const storageRef = ref(storage, `recipe-images/${recipeId}_${Date.now()}.jpg`);
        await uploadString(storageRef, cleanBase64, 'base64', { contentType: 'image/jpeg' });
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (e) {
        console.error("Image upload failed:", e);
        throw e; // Re-throw to handle in UI
    }
  },

  async saveRecipe(recipe: Recipe): Promise<void> {
    let savedToCloud = false;
    
    if (db) {
      try {
        await setDoc(doc(db, "recipes", recipe.id), recipe);
        savedToCloud = true;
        
        if (analytics) {
            logEvent(analytics, 'save_recipe', { title: recipe.title, category: recipe.category });
        }
      } catch(e) {
        console.error("Error saving to Firebase (saving locally instead):", e);
      }
    }

    // Always sync to local storage as backup/cache
    const currentStr = localStorage.getItem('shirleys_kitchen_recipes');
    let current: Recipe[] = currentStr ? JSON.parse(currentStr) : [];
    
    // If we have initial recipes loaded but not in local storage yet, we might need to fetch them from state
    // But here we just manage the array in local storage
    const exists = current.find(r => r.id === recipe.id);
    let updated;
    if (exists) {
      updated = current.map(r => r.id === recipe.id ? recipe : r);
    } else {
      updated = [...current, recipe];
    }
    localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(updated));
  },

  async deleteRecipe(id: string): Promise<void> {
    if (db) {
      try {
        await deleteDoc(doc(db, "recipes", id));
      } catch (e) {
        console.error("Error deleting from Firebase:", e);
      }
    }
    
    // Always update local
    const currentStr = localStorage.getItem('shirleys_kitchen_recipes');
    if (currentStr) {
      const current: Recipe[] = JSON.parse(currentStr);
      const updated = current.filter(r => r.id !== id);
      localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(updated));
    }
  }
};

// --- Data ---
export const INITIAL_RECIPES: Recipe[] = [
  {
    id: "moms-yeast-rolls",
    title: "Mom's Yeast Rolls",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "2 cups Warm Water",
      "1/2 cup Sugar",
      "2 1/4 tsp Yeast (Traditional)",
      "1 Egg",
      "1/2 cup Oil",
      "1 tsp Salt",
      "6-7 cups Flour"
    ],
    instructions: [
      "Dissolve sugar and yeast in warm water. Let stand until bubbly (about 10 mins).",
      "In a large bowl, mix egg, oil, and salt. Add the yeast mixture.",
      "Gradually add flour, one cup at a time, mixing until a soft dough forms.",
      "Knead on a floured surface until smooth and elastic (about 8-10 mins).",
      "Place in a greased bowl, turning once to grease the top. Cover and let rise in a warm place until doubled (approx 1 hour).",
      "Punch down dough and shape into rolls.",
      "Place on greased baking sheets or in pans. Cover and let rise again until doubled (about 30-45 mins).",
      "Bake at 350°F for 15-20 minutes or until golden brown."
    ],
    temp: "350°F",
    cookTime: "15-20 mins",
    prepTime: "2 hours",
    yields: "2-3 dozen",
    description: "Fluffy, golden rolls that are a staple at every family dinner. Best served warm with butter.",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: "seafood-chowder",
    title: "Seafood Chowder",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "2 cups Potatoes (diced)",
      "1 cup Carrots (diced)",
      "1 cup Celery (diced)",
      "1 Onion (chopped)",
      "Water (to cover vegetables)",
      "1 lb Haddock (or Cod)",
      "1 lb Scallops",
      "1 lb Shrimp (cooked)",
      "1 can Evaporated Milk",
      "2 cups Whole Milk (approx)",
      "1/4 cup Butter",
      "Salt & Pepper to taste"
    ],
    instructions: [
      "In a large pot, combine potatoes, carrots, celery, and onion. Add just enough water to cover.",
      "Boil gently until vegetables are tender (do not drain).",
      "Cut fish into chunks and add to the pot. Simmer for about 5-10 minutes until fish flakes easily.",
      "Add scallops and cook for another 2-3 minutes.",
      "Stir in the shrimp, evaporated milk, whole milk, and butter.",
      "Heat through but do not boil (or milk may curdle).",
      "Season with salt and pepper to taste. Serve hot with crusty bread."
    ],
    cookTime: "45 mins",
    yields: "8 servings",
    description: "A rich and creamy Atlantic classic, packed with fresh haddock, scallops, and shrimp.",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: "nans-date-squares",
    title: "Nan's Date Squares",
    category: Category.DESSERTS,
    ingredients: [
      "1 3/4 cups Oatmeal",
      "1 1/2 cups Flour",
      "1 cup Brown Sugar",
      "1 tsp Baking Soda",
      "3/4 cup Butter (melted)",
      "FILLING:",
      "1 lb Dates (chopped)",
      "1 cup Water",
      "1/2 cup White Sugar",
      "1 tsp Vanilla"
    ],
    instructions: [
      "Prepare the filling: In a saucepan, combine dates, water, and white sugar. Simmer until thick. Remove from heat and stir in vanilla. Let cool slightly.",
      "In a bowl, mix oatmeal, flour, brown sugar, and baking soda.",
      "Pour melted butter over the dry ingredients and mix until crumbly.",
      "Press half of the crumb mixture into the bottom of a greased 9x9 inch pan.",
      "Spread the date filling evenly over the base.",
      "Top with the remaining crumb mixture, pressing down lightly.",
      "Bake at 350°F for 30 minutes or until golden brown.",
      "Cool completely before cutting into squares."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    yields: "16 squares",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: "wades-chili",
    title: "Wade's Famous Chili",
    category: Category.MAIN_DISHES,
    ingredients: [
      "2 lbs Ground Beef",
      "2 Onions (chopped)",
      "1 Green Pepper (chopped)",
      "2 cloves Garlic (minced)",
      "1 can (28oz) Diced Tomatoes",
      "1 can (19oz) Kidney Beans (rinsed)",
      "1 can Tomato Soup",
      "2 tbsp Chili Powder",
      "1 tsp Cumin",
      "1 tsp Salt",
      "1/2 tsp Pepper",
      "Dash of Hot Sauce (optional)"
    ],
    instructions: [
      "In a large pot, brown the ground beef with onions, green pepper, and garlic. Drain excess fat.",
      "Stir in diced tomatoes, kidney beans, and tomato soup.",
      "Add chili powder, cumin, salt, pepper, and hot sauce.",
      "Simmer covered for at least 1 hour, stirring occasionally to prevent sticking.",
      "For best flavor, let it sit for a few hours or overnight before serving.",
      "Serve with cheese and fresh buns."
    ],
    cookTime: "1 hr 15 mins",
    prepTime: "15 mins",
    description: "Hearty, warming, and perfect for cold winter nights. The secret is the long simmer.",
    addedBy: "Wade",
    timestamp: Date.now()
  },
  {
    id: "donettas-lasagna",
    title: "Donetta's Cheesy Lasagna",
    category: Category.MAIN_DISHES,
    ingredients: [
      "12 Lasagna Noodles (cooked)",
      "1 lb Ground Beef",
      "1 jar (24oz) Pasta Sauce",
      "2 cups Cottage Cheese",
      "1 Egg",
      "1/2 cup Parmesan Cheese",
      "3 cups Mozzarella Cheese (shredded)",
      "1 tbsp Dried Parsley",
      "Salt & Pepper"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Brown beef in a skillet; drain. Stir in pasta sauce and simmer for 5 mins.",
      "In a bowl, mix cottage cheese, egg, Parmesan, parsley, salt, and pepper.",
      "Spread a little meat sauce in a 9x13 inch baking dish.",
      "Layer: 4 noodles, 1/3 meat sauce, 1/2 cottage cheese mixture, 1 cup mozzarella.",
      "Repeat layers once.",
      "Top with remaining noodles, remaining meat sauce, and remaining mozzarella.",
      "Cover with foil and bake for 40 minutes. Remove foil and bake 10-15 minutes more until bubbly and browned.",
      "Let stand 10 minutes before serving."
    ],
    temp: "375°F",
    cookTime: "55 mins",
    yields: "8-10 servings",
    addedBy: "Donetta",
    timestamp: Date.now()
  },
  {
    id: "adriennes-spinach-dip",
    title: "Adrienne's Spinach Dip in Sourdough",
    category: Category.APPETIZERS,
    ingredients: [
      "1 package (10oz) Frozen Spinach (thawed and squeezed dry)",
      "1 cup Sour Cream",
      "1 cup Mayonnaise",
      "1 package Knorr Vegetable Soup Mix",
      "1 can (8oz) Water Chestnuts (chopped)",
      "3 Green Onions (chopped)",
      "1 Round Sourdough Bread Loaf"
    ],
    instructions: [
      "In a medium bowl, mix spinach, sour cream, mayonnaise, vegetable soup mix, water chestnuts, and green onions.",
      "Refrigerate for at least 2 hours to let flavors blend.",
      "Slice the top off the sourdough loaf and hollow out the inside to create a bowl. Cube the removed bread for dipping.",
      "Fill the bread bowl with the spinach dip.",
      "Serve with the bread cubes and fresh veggies."
    ],
    yields: "4 cups",
    prepTime: "15 mins + chill",
    addedBy: "Adrienne",
    timestamp: Date.now()
  },
  {
    id: "cactus-dip",
    title: "Cactus Dip (Boston Pizza Style)",
    category: Category.APPETIZERS,
    ingredients: [
      "1 cup Sour cream",
      "1/2 cup Creamy Caesar dressing",
      "1/4 cup Shredded Parmesan cheese",
      "1/4 cup Finely chopped green onion",
      "1/2 – 1 tsp Crushed chilies / red pepper flakes"
    ],
    instructions: [
      "In a bowl, whisk together the sour cream, Caesar dressing, Parmesan cheese, green onion, and crushed chilies/red pepper flakes until well combined.",
      "Cover the bowl and chill the dip in the refrigerator until ready to use. For best flavour, chill ideally overnight.",
      "Serve chilled with chips, crackers, or vegetables."
    ],
    yields: "Approx 1.75 cups",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: "apple-crisp",
    title: "Apple Crisp",
    category: Category.DESSERTS,
    ingredients: [
      "5 cups Apples (washed, peeled, and sliced)",
      "1 cup Flour",
      "1 cup Rolled Oats",
      "1 cup Brown Sugar",
      "1 tsp Cinnamon (for crumb mixture)",
      "1/2 cup Butter or Margarine",
      "1/2 tsp Cinnamon (for apples)"
    ],
    instructions: [
      "Preheat oven to 350°F.",
      "Mix together flour, rolled oats, brown sugar, and 1 tsp cinnamon.",
      "Cut in butter or margarine. Set aside.",
      "Butter an 8x13 pan.",
      "Spread sliced apples in the pan and sprinkle with 1/2 tsp cinnamon.",
      "Cover with crumb mixture and pat down lightly.",
      "Bake at 350°F for 35 to 40 minutes.",
      "Serve with cream or ice cream."
    ],
    temp: "350°F",
    cookTime: "35-40 mins",
    yields: "8x13 pan",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
      id: "evangeline-soup",
      title: "The Evangeline Vegetable Soup",
      category: Category.SOUPS_SALADS,
      ingredients: [
        "1 1/2 cups Turnips",
        "1 1/2 cups Carrots",
        "1 1/2 cups Potatoes",
        "1 can Tomato Sauce (or Heinz Tomato Soup)",
        "1 can Peas (small)",
        "1 Onion",
        "1 can String Beans (small)",
        "1/2 cup Dry Soup Mix (Vegetable)",
        "1/2 tbsp Beef Soup Mix (Bovril)",
        "2 tsp Salt",
        "1 tbsp Butter",
        "Water"
      ],
      instructions: [
        "Prepare vegetables: chop turnips, carrots, potatoes, and onion.",
        "In a large pot, combine all vegetables, canned goods, soup mixes, salt, and butter.",
        "Add water to cover.",
        "Simmer for 2 hours."
      ],
      cookTime: "2 hours",
      addedBy: "Nan",
      timestamp: Date.now()
  }
];

// --- Styles for MacIntosh Red Tartan (Heritage Intro) ---
const tartanStyles = {
  backgroundColor: '#cc0000', // MacIntosh Red Base
  backgroundImage: `
    repeating-linear-gradient(90deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    
    repeating-linear-gradient(90deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    
    repeating-linear-gradient(90deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px)
  `
};

const FAMILY_MEMBERS = ['Nan', 'Wade', 'Donetta', 'Adrienne'];

const OWNER_COLORS: Record<string, string> = {
  'Nan': '#b45309',      // Amber-700
  'Wade': '#0369a1',     // Sky-700
  'Donetta': '#be185d',  // Pink-700
  'Adrienne': '#7e22ce', // Purple-700
};

const CATEGORY_IMAGES: Record<Category, string> = {
  [Category.APPETIZERS]: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
  [Category.SOUPS_SALADS]: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
  [Category.BREADS_MUFFINS]: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  [Category.MAIN_DISHES]: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  [Category.SIDE_DISHES]: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?auto=format&fit=crop&q=80&w=800",
  [Category.DESSERTS]: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
  [Category.SAUCES]: "https://images.unsplash.com/photo-1472476443507-c7a392dd6182?auto=format&fit=crop&q=80&w=800",
};

const AVATAR_COLORS = [
  '#b91c1c', // Red (Heritage)
  '#15803d', // Green (Heritage)
  '#b45309', // Amber (Heritage)
  '#0369a1', // Sky 700 (Theme)
  '#334155', // Slate (Neutral)
  '#4338ca', // Indigo
  '#be185d', // Pink
  '#854d0e', // Bronze
  '#0f766e', // Teal
  '#7e22ce', // Purple
];

// Deterministic color generator based on name
const getAvatarColor = (name: string, explicitColor?: string) => {
  if (explicitColor) return explicitColor;
  if (OWNER_COLORS[name]) return OWNER_COLORS[name];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

// --- Components ---

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl animate-slide-up ${type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-600 text-white'}`}>
       {type === 'success' ? <CheckCircle size={20} className="text-green-400" /> : <AlertCircle size={20} className="text-white" />}
       <span className="font-medium">{message}</span>
       <button onClick={onClose}><X size={16} className="opacity-50 hover:opacity-100" /></button>
    </div>
  );
};

const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={tartanStyles} className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-y-auto pb-20">
      <div className="absolute inset-0 bg-black/30 fixed"></div>
      
      <div className="relative z-10 bg-stone-50/95 p-8 md:p-16 rounded-sm shadow-2xl max-w-4xl mx-4 text-center border-double border-8 border-stone-800 mt-10 md:mt-20 animate-fade-in">
        {/* Family Crest */}
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 relative group perspective-1000">
            {!imgError ? (
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Macintosh_Crest.svg/1200px-Macintosh_Crest.svg.png" 
                alt="MacIntosh Family Crest" 
                className="w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-12"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-serif text-xs p-4 text-center border-4 border-amber-500">
                MacIntosh Family Crest
              </div>
            )}
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-2 tracking-tight drop-shadow-sm">Shirley’s Kitchen</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-red-900 italic mb-6">Cooking with Nan</h2>
        <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 uppercase tracking-widest border-y border-stone-300 py-2 inline-block">
          A Cherished Collection of Recipes Passed Down Through Generations
        </p>
        
        <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed text-justify mb-12 mx-auto max-w-2xl bg-stone-100/50 p-6 rounded-lg border border-stone-200 shadow-inner">
          <p className="mb-4 indent-8">
            My earliest memories of the kitchen are forged links to my Nan, Shirley MacIntosh. It was her domain, a
            sanctuary where she moved with quiet, purposeful grace, her hands perpetually busy, creating magic from
            simple ingredients. This book is a labor of love, a deeply personal compilation of her cherished recipes,
            each one carrying a piece of her spirit, a story waiting to be retold. It’s dedicated with particular affection
            to her daughters, who, like myself, were privileged to learn the art of cooking beside her, absorbing not just
            her techniques but also her quiet wisdom.
          </p>
          <p className="indent-8">
            These recipes are more than mere instructions; they are a tangible connection to her, a way to recreate
            the flavors and the moments that defined our family gatherings, moments that now feel precious and fleeting
            in the passage of time. May each dish you prepare from these pages bring a warmth to your home that matches
            the warmth she so generously shared with all of us.
          </p>
        </div>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-serif text-lg font-bold text-white transition-all duration-200 bg-red-900 font-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 rounded-sm shadow-lg overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative flex items-center gap-3">
             Enter the Kitchen <BookOpen size={24} />
          </span>
        </button>
      </div>
      
      <footer className="relative z-10 mt-16 text-white/80 font-serif text-sm">
        Est. 2024 • The MacIntosh Family
      </footer>
    </div>
  );
};

const RecipeModal: React.FC<{ 
  onClose: () => void; 
  onSave: (recipe: Recipe) => void;
  initialRecipe?: Recipe | null;
  notify: (msg: string, type: 'success' | 'error') => void;
}> = ({ onClose, onSave, initialRecipe, notify }) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [category, setCategory] = useState<Category>(initialRecipe?.category || Category.MAIN_DISHES);
  const [ingredients, setIngredients] = useState(initialRecipe?.ingredients.join('\n') || '');
  const [instructions, setInstructions] = useState(initialRecipe?.instructions.join('\n') || '');
  const [yields, setYields] = useState(initialRecipe?.yields || '');
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime || '');
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime || '');
  const [temp, setTemp] = useState(initialRecipe?.temp || '');
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [addedBy, setAddedBy] = useState(initialRecipe?.addedBy || 'Nan');
  const [generating, setGenerating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    let finalImageUrl = initialRecipe?.imageUrl;

    // Check for uploaded image
    if (selectedFile) {
        setUploadingImage(true);
        try {
            // Resize image first
            const resizedBase64 = await resizeImage(selectedFile);
            const tempId = initialRecipe?.id || id();
            // Use DataService to upload
            finalImageUrl = await DataService.uploadImage(resizedBase64, tempId);
            notify("Image processed and attached.", "success");
        } catch (err) {
            console.error("Image processing failed:", err);
            notify("Failed to process image. Try a smaller file.", "error");
        } finally {
            setUploadingImage(false);
        }
    }

    const newRecipe: Recipe = {
      id: initialRecipe?.id || id(),
      title,
      category,
      ingredients: ingredients.split('\n').filter(i => i.trim()),
      instructions: instructions.split('\n').filter(i => i.trim()),
      yields,
      prepTime,
      cookTime,
      temp,
      description,
      addedBy,
      userColor: OWNER_COLORS[addedBy], // Auto-assign color
      timestamp: initialRecipe?.timestamp || Date.now(),
      imageUrl: finalImageUrl
    };
    onSave(newRecipe);
    onClose();
  };

  const generateWithAI = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      notify("Please configure your API Key in .env", "error");
      return;
    }
    setGenerating(true);
    try {
       const ai = new GoogleGenAI({ apiKey });
       
       const prompt = `Create a traditional family recipe for ${title || "a random comfort food"} in the style of a grandmother's cookbook. 
       Return JSON ONLY with fields: title, category (one of: ${Object.values(Category).join(', ')}), description, ingredients (array), instructions (array), yields, prepTime, cookTime, temp.`;
       
       const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt
       });
       
       const text = response.text;
       
       // Simple JSON parsing attempt (stripping code blocks if present)
       if (text) {
         const jsonStr = text.replace(/```json|```/g, '').trim();
         const data = JSON.parse(jsonStr);
         
         setTitle(data.title);
         if (Object.values(Category).includes(data.category)) setCategory(data.category);
         setDescription(data.description);
         setIngredients(data.ingredients.join('\n'));
         setInstructions(data.instructions.join('\n'));
         setYields(data.yields || '');
         setPrepTime(data.prepTime || '');
         setCookTime(data.cookTime || '');
         setTemp(data.temp || '');
         notify("Recipe drafted by AI.", "success");
         
         if (analytics) {
             logEvent(analytics, 'use_ai_draft', { title: data.title });
         }
       }
       
    } catch (e) {
      console.error("AI Generation failed", e);
      notify("AI Drafting failed. Try again.", "error");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-serif font-bold text-stone-800">
            {initialRecipe ? 'Edit Recipe' : 'Add New Recipe'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2 flex gap-4">
               <div className="flex-1">
                 <label className="block text-sm font-medium text-stone-600 mb-1">Recipe Title</label>
                 <input 
                   required
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none font-serif text-lg"
                   placeholder="e.g., Nan's Apple Pie"
                 />
               </div>
               {!initialRecipe && (
                 <button 
                  type="button"
                  onClick={generateWithAI}
                  disabled={generating}
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50 shadow-md"
                 >
                   {generating ? <RefreshCw className="animate-spin" size={20}/> : <ChefHat size={20}/>}
                   AI Draft
                 </button>
               )}
            </div>

            <div className="col-span-1">
               <label className="block text-sm font-medium text-stone-600 mb-1">Category</label>
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value as Category)}
                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none bg-white"
               >
                 {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
            
            <div className="col-span-1">
               <label className="block text-sm font-medium text-stone-600 mb-1">Recipe Owner</label>
               <div className="relative">
                 <select
                    value={addedBy}
                    onChange={(e) => setAddedBy(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none bg-white appearance-none"
                 >
                    {FAMILY_MEMBERS.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                 </select>
                 <ChevronDown className="absolute right-3 top-3 text-stone-400 pointer-events-none" size={16} />
               </div>
            </div>

            <div className="col-span-1 md:col-span-2">
               <label className="block text-sm font-medium text-stone-600 mb-1">Description / Subtitle</label>
               <input 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                 placeholder="A short story or description..."
               />
            </div>

             <div className="col-span-1 md:col-span-2">
               <label className="block text-sm font-medium text-stone-600 mb-1">Photo Upload</label>
               <div className="border-2 border-dashed border-stone-300 rounded-md p-4 text-center hover:bg-stone-50 transition-colors relative">
                  <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        // Simple validation
                        if(file.size > 10 * 1024 * 1024) {
                            notify("File too large. Max 10MB.", "error");
                            e.target.value = "";
                        } else {
                            setSelectedFile(file);
                            notify("Photo selected: " + file.name, "success");
                        }
                      }
                  }}/>
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2 text-stone-500">
                      <ImageIcon size={32} className={selectedFile ? "text-green-500" : "text-stone-400"} />
                      <span className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : "Click to upload a photo of this dish"}
                      </span>
                  </label>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
              <input placeholder="Prep Time" value={prepTime} onChange={e => setPrepTime(e.target.value)} className="px-3 py-2 border rounded-md" />
              <input placeholder="Cook Time" value={cookTime} onChange={e => setCookTime(e.target.value)} className="px-3 py-2 border rounded-md" />
              <input placeholder="Oven Temp" value={temp} onChange={e => setTemp(e.target.value)} className="px-3 py-2 border rounded-md" />
              <input placeholder="Yields" value={yields} onChange={e => setYields(e.target.value)} className="px-3 py-2 border rounded-md" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-stone-600 mb-1">Ingredients (one per line)</label>
              <textarea 
                required
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm"
                placeholder={"1 cup Flour\n2 Eggs\n..."}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-stone-600 mb-1">Instructions (one step per line)</label>
              <textarea 
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder={"Mix dry ingredients.\nAdd wet ingredients.\nBake at 350..."}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 text-stone-600 hover:bg-stone-100 rounded-md">
              Cancel
            </button>
            <button type="submit" disabled={uploadingImage} className="px-6 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 shadow-lg disabled:opacity-50 flex items-center gap-2">
              {uploadingImage && <RefreshCw className="animate-spin" size={16} />}
              {initialRecipe ? 'Save Changes' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RecipeDetail: React.FC<{ 
  recipe: Recipe; 
  onBack: () => void;
  onEdit: (r: Recipe) => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  notify: (msg: string, type: 'success' | 'error') => void;
}> = ({ recipe, onBack, onEdit, isFavorite, toggleFavorite, notify }) => {
  const [tips, setTips] = useState<string>("");
  const [loadingTips, setLoadingTips] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(recipe.imageUrl || null);
  const [generatingImage, setGeneratingImage] = useState(false);

  useEffect(() => {
    if (analytics) {
        logEvent(analytics, 'view_item', { 
            currency: 'USD', 
            value: 1, 
            items: [{ item_id: recipe.id, item_name: recipe.title, item_category: recipe.category }] 
        });
    }
  }, [recipe]);

  const getGeminiTips = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setTips("Please set API_KEY in .env");
      notify("API Key missing", "error");
      return;
    }
    setLoadingTips(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Give me 3 short, secret chef tips for making the best ${recipe.title}.`
      });
      if (response.text) {
        setTips(response.text);
        if (analytics) logEvent(analytics, 'get_chef_tips', { recipe: recipe.title });
      }
    } catch (e) {
      console.error(e);
      setTips("Could not load tips at this time.");
      notify("Failed to get tips", "error");
    } finally {
      setLoadingTips(false);
    }
  };

  const handleGenerateImage = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        notify("API Key missing", "error");
        return;
    }
    setGeneratingImage(true);
    try {
        // Using Imagen 3 via fetch since SDK might be limited in preview
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [{ prompt: `A professional, appetizing food photography shot of ${recipe.title}, ${recipe.description || "delicious home cooked meal"}, warm lighting, 4k, high detail.` }],
                parameters: { sampleCount: 1, aspectRatio: "4:3" }
            })
        });
        const data = await response.json();
        const b64 = data.predictions?.[0]?.bytesBase64Encoded;
        if (b64) {
            // Upload to Firebase Storage or save locally
            // Ideally we upload to avoid data url size limits in Firestore
            const url = await DataService.uploadImage(b64, recipe.id);
            setImageUrl(url);
            
            // Save to recipe object persistence
            const updated = { ...recipe, imageUrl: url };
            await DataService.saveRecipe(updated);
            notify("Image generated and saved!", "success");
            
            if (analytics) logEvent(analytics, 'generate_image', { recipe: recipe.title });
        } else {
             throw new Error("No image data returned");
        }
    } catch(e) {
        console.error("Image gen failed", e);
        notify("Could not generate image. Check limits.", "error");
    } finally {
        setGeneratingImage(false);
    }
  };

  return (
    <div className="bg-white min-h-screen animate-fade-in pb-20 print:pb-0">
      {/* Print Styles */}
      <style>{`
        @media print {
          @page { margin: 2cm; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-break-inside-avoid { break-inside: avoid; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Print Header */}
      <div className="print-only fixed top-0 left-0 w-full border-b-2 border-black pb-4 mb-8">
         <div className="flex justify-between items-end">
            <h1 className="text-3xl font-serif font-bold">Shirley's Kitchen</h1>
            <span className="text-sm text-stone-600">Family Recipe Collection</span>
         </div>
      </div>

      {/* Print Footer */}
      <div className="print-only fixed bottom-0 left-0 w-full border-t border-stone-300 pt-2">
         <div className="flex justify-between text-xs text-stone-500">
            <span>Printed from Shirley's Kitchen App</span>
            <span className="after:content-[counter(page)]">Page </span>
         </div>
      </div>

      <div className="max-w-4xl mx-auto md:p-8 md:pt-12 print:p-0 print:pt-20">
        <button onClick={onBack} className="no-print mb-6 flex items-center text-stone-500 hover:text-amber-700 transition-colors px-4 md:px-0">
          <ArrowLeft size={20} className="mr-2" /> Back to Recipes
        </button>

        <div className="bg-stone-50 md:shadow-2xl md:rounded-lg overflow-hidden border border-stone-200 print:shadow-none print:border-none print:bg-white">
          {/* Header Image Area */}
          <div className="relative h-64 md:h-80 bg-stone-200 group no-print">
            {imageUrl ? (
                <img src={imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                    <UtensilsCrossed size={64} opacity={0.2} />
                </div>
            )}
            
            {/* Image Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={toggleFavorite}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-red-500"
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={() => onEdit(recipe)}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-stone-700"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                   onClick={() => window.print()}
                   className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-stone-700"
                >
                   <Printer size={20} />
                </button>
            </div>
            
            {/* Generate Image Button */}
            {!imageUrl && (
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 text-white backdrop-blur-md rounded-full text-sm hover:bg-black/70 flex items-center gap-2"
                >
                  {generatingImage ? <RefreshCw className="animate-spin" size={14}/> : <ImageIcon size={14}/>}
                  Generate Photo
                </button>
            )}
          </div>

          <div className="p-6 md:p-10 print:p-0">
            {/* Title Section */}
            <div className="text-center mb-8 border-b-2 border-stone-200 pb-6">
               <span className="text-amber-600 font-bold tracking-wider text-xs uppercase mb-2 block">{recipe.category}</span>
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{recipe.title}</h1>
               {recipe.description && <p className="text-stone-600 italic text-lg font-serif">{recipe.description}</p>}
               
               <div className="flex flex-wrap justify-center gap-6 mt-6 text-stone-500 text-sm uppercase tracking-wide font-bold">
                  {recipe.prepTime && <span className="flex items-center gap-2"><Clock size={16}/> Prep: {recipe.prepTime}</span>}
                  {recipe.cookTime && <span className="flex items-center gap-2"><UtensilsCrossed size={16}/> Cook: {recipe.cookTime}</span>}
                  {recipe.yields && <span className="flex items-center gap-2"><ChefHat size={16}/> Yields: {recipe.yields}</span>}
                  {recipe.temp && <span className="flex items-center gap-2"><Thermometer size={16}/> {recipe.temp}</span>}
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Ingredients Column */}
              <div className="md:col-span-1 print:col-span-1">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-4 flex items-center gap-2 pb-2 border-b border-stone-200">
                  Ingredients
                </h3>
                <ul className="space-y-3 font-serif text-stone-700">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 leading-relaxed group">
                       <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-amber-600 transition-colors shrink-0"></span>
                       <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Column */}
              <div className="md:col-span-2 print:col-span-2">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-4 flex items-center gap-2 pb-2 border-b border-stone-200">
                  Instructions
                </h3>
                <div className="space-y-6">
                  {recipe.instructions.map((step, i) => (
                    <div key={i} className="flex gap-4 print-break-inside-avoid">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-500 font-serif font-bold flex items-center justify-center border border-stone-200">
                        {i + 1}
                      </span>
                      <p className="text-stone-700 leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer / Meta */}
            <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm" style={{ backgroundColor: getAvatarColor(recipe.addedBy, recipe.userColor) }}>
                    {recipe.addedBy[0]}
                  </div>
                  <div className="text-sm">
                    <p className="text-stone-900 font-bold">From the Kitchen of {recipe.addedBy}</p>
                    <p className="text-stone-500 text-xs">Added on {new Date(recipe.timestamp).toLocaleDateString()}</p>
                  </div>
               </div>

               <button 
                 onClick={getGeminiTips}
                 disabled={loadingTips}
                 className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors"
               >
                 <ChefHat size={18} />
                 {loadingTips ? "Consulting Chef..." : "Get Chef's Tips"}
               </button>
            </div>

            {tips && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg animate-fade-in no-print">
                <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2"><ChefHat size={16}/> Chef's Secret Tips</h4>
                <p className="text-amber-900/80 text-sm whitespace-pre-line leading-relaxed">{tips}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Main Component ---

export default function App() {
  const [view, setView] = useState<'intro' | 'home' | 'category' | 'detail'>('intro');
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDevData, setShowDevData] = useState(false);
  
  // Notification System State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Initialize Data
  useEffect(() => {
    const init = async () => {
      const data = await DataService.getRecipes();
      if (data.length > 0) {
        setRecipes(data);
      } else {
        // First run, save initial to local storage so user can edit them
        localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(INITIAL_RECIPES));
        setRecipes(INITIAL_RECIPES);
      }
      
      const storedFavs = localStorage.getItem('favorites');
      if (storedFavs) setFavorites(new Set(JSON.parse(storedFavs)));
    };
    init();
  }, []);

  // Filter Logic
  const filteredRecipes = useMemo(() => {
    let result = recipes;
    if (selectedCategory) {
      result = result.filter(r => r.category === selectedCategory);
    } else if (view === 'category' && !selectedCategory) {
      // "All Recipes" view usually
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }
    return result;
  }, [recipes, selectedCategory, searchQuery, view]);

  // Counts
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    recipes.forEach(r => {
      c[r.category] = (c[r.category] || 0) + 1;
    });
    return c;
  }, [recipes]);

  const handleSaveRecipe = async (newRecipe: Recipe) => {
    let updatedList;
    if (editingRecipe) {
      updatedList = recipes.map(r => r.id === newRecipe.id ? newRecipe : r);
    } else {
      updatedList = [...recipes, newRecipe];
    }
    setRecipes(updatedList);
    await DataService.saveRecipe(newRecipe);
    setEditingRecipe(null);
    if (selectedRecipe?.id === newRecipe.id) {
        setSelectedRecipe(newRecipe);
    }
    notify("Recipe saved successfully!", "success");
  };

  const toggleFavorite = (id: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavs)));
    
    if (analytics && newFavs.has(id)) {
        logEvent(analytics, 'add_to_favorites', { recipe_id: id });
    }
  };

  // Views
  if (view === 'intro') return <Intro onStart={() => setView('home')} />;
  if (view === 'detail' && selectedRecipe) return (
    <>
      <RecipeDetail 
        recipe={selectedRecipe} 
        onBack={() => setView(selectedCategory ? 'category' : 'home')} 
        onEdit={(r) => { setEditingRecipe(r); setIsModalOpen(true); }}
        isFavorite={favorites.has(selectedRecipe.id)}
        toggleFavorite={() => toggleFavorite(selectedRecipe.id)}
        notify={notify}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-800">
      
      {/* Sidebar (Desktop) */}
      <aside className={`fixed md:relative z-30 w-64 bg-stone-900 text-stone-300 h-full flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-stone-800 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-white font-bold tracking-tight">Shirley's Kitchen</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><X /></button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <button onClick={() => { setView('home'); setSelectedCategory(null); setIsSidebarOpen(false); }} className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${view === 'home' ? 'bg-stone-800 text-white' : 'hover:bg-stone-800/50'}`}>
            <span className="flex items-center gap-3"><Home size={18} /> Home</span>
          </button>
          
          <button onClick={() => { setView('category'); setSelectedCategory(null); setIsSidebarOpen(false); }} className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${view === 'category' && !selectedCategory ? 'bg-stone-800 text-white' : 'hover:bg-stone-800/50'}`}>
            <span className="flex items-center gap-3"><BookOpen size={18} /> All Recipes</span>
            <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full">{recipes.length}</span>
          </button>

          <div className="pt-6 pb-2 px-3 text-xs font-bold text-stone-500 uppercase tracking-wider">Categories</div>
          
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => { setSelectedCategory(cat); setView('category'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat ? 'bg-amber-900/40 text-amber-50' : 'hover:bg-stone-800/50'}`}
            >
              <span>{cat}</span>
              <span className="text-xs text-stone-500">{counts[cat] || 0}</span>
            </button>
          ))}
          
           <div className="pt-6 pb-2 px-3 text-xs font-bold text-stone-500 uppercase tracking-wider">My Collection</div>
           <button onClick={() => { /* Filter for favorites */ }} className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-stone-800/50">
             <span className="flex items-center gap-3 text-rose-400"><Heart size={18} /> Favorites</span>
             <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full">{favorites.size}</span>
           </button>
        </nav>
        
        <div className="p-4 border-t border-stone-800">
           <button onClick={() => setShowDevData(true)} className="flex items-center gap-2 text-xs text-stone-500 hover:text-stone-300 w-full justify-center py-2">
             <Database size={12} /> Developer Data
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-stone-900 text-white p-4 flex items-center justify-between shrink-0">
          <button onClick={() => setIsSidebarOpen(true)}><Menu /></button>
          <span className="font-serif font-bold">Shirley's Kitchen</span>
          <button onClick={() => { setEditingRecipe(null); setIsModalOpen(true); }}><Plus /></button>
        </div>

        {/* Top Bar (Search & Actions) */}
        <header className="bg-white border-b border-stone-200 p-4 md:px-8 md:py-6 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0 shadow-sm z-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients..." 
              className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full focus:ring-2 focus:ring-amber-500 outline-none text-stone-700"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             {/* View Toggle */}
             {view === 'category' && (
                <div className="flex bg-stone-100 p-1 rounded-lg">
                   <button onClick={() => setDisplayMode('grid')} className={`p-2 rounded-md transition-all ${displayMode === 'grid' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400'}`}><LayoutGrid size={18}/></button>
                   <button onClick={() => setDisplayMode('list')} className={`p-2 rounded-md transition-all ${displayMode === 'list' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400'}`}><List size={18}/></button>
                </div>
             )}
             
             <button 
              onClick={() => { setEditingRecipe(null); setIsModalOpen(true); }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-shadow shadow-md"
            >
              <Plus size={18} /> Add Recipe
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* Dashboard Home View */}
          {view === 'home' && !searchQuery && (
            <div className="space-y-10 animate-fade-in">
              {/* Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[21/9] md:aspect-[3/1] group cursor-pointer" onClick={() => { setView('category'); setSelectedCategory(null); }}>
                 <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Kitchen" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div>
                      <h2 className="text-white text-3xl font-serif font-bold mb-2">Welcome Home</h2>
                      <p className="text-stone-300">Browse the complete collection of {recipes.length} family recipes.</p>
                    </div>
                 </div>
              </div>

              {/* Categories Grid */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                  <BookOpen className="text-amber-600" size={24}/> Browse by Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {Object.values(Category).map(cat => (
                     <div 
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setView('category'); }}
                        className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                     >
                        <img src={CATEGORY_IMAGES[cat]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat} />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center p-2 text-center">
                           <span className="text-white font-serif font-bold text-lg md:text-xl drop-shadow-md">{cat}</span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Recent Recipes */}
              <div>
                 <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                    <Clock className="text-amber-600" size={24}/> Recently Added
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recipes.slice().sort((a,b) => b.timestamp - a.timestamp).slice(0, 3).map(recipe => (
                        <div 
                        key={recipe.id}
                        onClick={() => { setSelectedRecipe(recipe); setView('detail'); }}
                        className="bg-white rounded-lg p-4 border border-stone-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center group"
                      >
                         <div className="w-20 h-20 rounded-md bg-stone-200 overflow-hidden shrink-0">
                            {recipe.imageUrl ? (
                                <img src={recipe.imageUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400"><UtensilsCrossed /></div>
                            )}
                         </div>
                         <div>
                            <h4 className="font-serif font-bold text-lg group-hover:text-amber-700 transition-colors line-clamp-1">{recipe.title}</h4>
                            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{recipe.category}</p>
                            <div className="flex items-center gap-2 text-xs text-stone-400">
                               <User size={12} /> {recipe.addedBy}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* Recipe List View (Category or Search) */}
          {(view === 'category' || searchQuery) && (
             <div className="animate-slide-up">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-3xl font-serif font-bold text-stone-900">
                      {searchQuery ? `Results for "${searchQuery}"` : (selectedCategory || "All Recipes")}
                   </h2>
                   <span className="text-stone-500">{filteredRecipes.length} recipes</span>
                </div>

                {displayMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRecipes.map(recipe => (
                      <div 
                        key={recipe.id}
                        onClick={() => { setSelectedRecipe(recipe); setView('detail'); }}
                        className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
                      >
                        <div className="h-48 bg-stone-100 relative overflow-hidden">
                          {recipe.imageUrl ? (
                             <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-stone-300">
                                <ChefHat size={48} strokeWidth={1} />
                             </div>
                          )}
                          <div className="absolute top-3 right-3">
                             <button onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }} className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-stone-400 hover:text-red-500 transition-colors shadow-sm">
                                <Heart size={16} fill={favorites.has(recipe.id) ? "currentColor" : "none"} className={favorites.has(recipe.id) ? "text-red-500" : ""} />
                             </button>
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                             <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{recipe.category}</span>
                             {recipe.prepTime && <span className="text-xs text-stone-400 flex items-center gap-1"><Clock size={12}/> {recipe.prepTime}</span>}
                          </div>
                          <h3 className="font-serif font-bold text-xl text-stone-800 mb-2 leading-tight group-hover:text-amber-800 transition-colors">{recipe.title}</h3>
                          <p className="text-stone-500 text-sm line-clamp-2 mb-4 flex-1">{recipe.description || recipe.ingredients.slice(0,3).join(', ')}...</p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                             <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: getAvatarColor(recipe.addedBy, recipe.userColor) }}>
                                   {recipe.addedBy[0]}
                                </div>
                                <span className="text-xs text-stone-600 font-medium">{recipe.addedBy}</span>
                             </div>
                             <ChevronRight size={16} className="text-stone-300 group-hover:text-amber-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                     {filteredRecipes.map((recipe, idx) => (
                        <div 
                          key={recipe.id}
                          onClick={() => { setSelectedRecipe(recipe); setView('detail'); }}
                          className={`flex items-center p-4 hover:bg-stone-50 cursor-pointer transition-colors ${idx !== filteredRecipes.length - 1 ? 'border-b border-stone-100' : ''}`}
                        >
                           <div className="w-16 h-16 rounded-md bg-stone-100 overflow-hidden shrink-0 mr-4">
                              {recipe.imageUrl ? (
                                <img src={recipe.imageUrl} className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full text-stone-300"><UtensilsCrossed size={20}/></div>
                              )}
                           </div>
                           <div className="flex-1 min-w-0 mr-4">
                              <h3 className="font-serif font-bold text-lg text-stone-800 truncate">{recipe.title}</h3>
                              <p className="text-xs text-stone-500">{recipe.category} • {recipe.ingredients.length} ingredients</p>
                           </div>
                           <div className="hidden md:flex items-center gap-6 text-sm text-stone-500 mr-4">
                              {recipe.prepTime && <span className="flex items-center gap-1"><Clock size={14}/> {recipe.prepTime}</span>}
                              <span className="flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600">
                                 {recipe.addedBy}
                              </span>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }} className="text-stone-300 hover:text-red-500 transition-colors">
                              <Heart size={20} fill={favorites.has(recipe.id) ? "currentColor" : "none"} className={favorites.has(recipe.id) ? "text-red-500" : ""} />
                           </button>
                        </div>
                     ))}
                  </div>
                )}

                {filteredRecipes.length === 0 && (
                   <div className="text-center py-20 text-stone-400">
                      <Soup size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No recipes found matching your search.</p>
                      <button onClick={() => setSearchQuery('')} className="mt-4 text-amber-600 hover:underline">Clear Search</button>
                   </div>
                )}
             </div>
          )}

        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <RecipeModal 
          initialRecipe={editingRecipe}
          onClose={() => { setIsModalOpen(false); setEditingRecipe(null); }} 
          onSave={handleSaveRecipe}
          notify={notify}
        />
      )}

      {showDevData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
           <div className="bg-stone-900 text-stone-300 rounded-lg w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden border border-stone-700 shadow-2xl">
              <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-950">
                 <h3 className="font-mono font-bold flex items-center gap-2"><FileJson size={18}/> Developer Data Export</h3>
                 <button onClick={() => setShowDevData(false)}><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-xs bg-black">
                 <pre className="whitespace-pre-wrap text-green-400">
                   {JSON.stringify(recipes, null, 2)}
                 </pre>
              </div>
              <div className="p-4 bg-stone-950 border-t border-stone-700 flex justify-end gap-3">
                 <button 
                   onClick={() => { navigator.clipboard.writeText(JSON.stringify(recipes, null, 2)); notify("JSON copied to clipboard", "success"); }}
                   className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded text-white flex items-center gap-2"
                 >
                    <Copy size={16}/> Copy JSON
                 </button>
                 <button 
                   onClick={() => setShowDevData(false)}
                   className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded text-white"
                 >
                    Close
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Global Toast Container */}
      {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

    </div>
  );
}