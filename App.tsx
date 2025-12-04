import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Search, Plus, ChefHat, User, Home, UtensilsCrossed, X, Menu, Printer, Heart, ArrowLeft, LayoutGrid, List, Soup, Clock, Thermometer, ChevronRight, Edit2, ChevronDown, FileJson, Copy, Database, RefreshCw, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
// @ts-ignore
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
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
  description?: string;
  addedBy: string;
  userColor?: string;
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

// --- Helpers ---
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key] || import.meta.env[`VITE_${key}`] || "";
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env) {
       return process.env[key] || process.env[`VITE_${key}`] || "";
    }
  } catch (e) {}
  return "";
}

const getApiKey = () => getEnv('API_KEY');
const id = () => Math.random().toString(36).substr(2, 9);

const resizeImage = (file: File, maxWidth: number = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
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

// Initialize Firebase safely
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
    } catch (e) {
        console.warn("Analytics initialization skipped:", e);
    }
    console.log("Firebase initialized");
  } catch (e) {
    console.error("Firebase init failed:", e);
  }
}

// --- Data Service ---
const DataService = {
  async getRecipes(): Promise<Recipe[]> {
    if (db) {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipes: Recipe[] = [];
        querySnapshot.forEach((doc: any) => recipes.push(doc.data() as Recipe));
        if (recipes.length > 0) return recipes;
      } catch (e) {
        console.warn("Falling back to local storage due to Firebase error");
      }
    }
    const stored = localStorage.getItem('shirleys_kitchen_recipes');
    return stored ? JSON.parse(stored) : [];
  },

  async uploadImage(base64Image: string, recipeId: string): Promise<string> {
    if (!storage) {
        return base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`; 
    }
    try {
        const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
        const storageRef = ref(storage, `recipe-images/${recipeId}_${Date.now()}.jpg`);
        await uploadString(storageRef, cleanBase64, 'base64', { contentType: 'image/jpeg' });
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error("Image upload failed:", e);
        throw e;
    }
  },

  async saveRecipe(recipe: Recipe): Promise<void> {
    if (db) {
      try {
        await setDoc(doc(db, "recipes", recipe.id), recipe);
        if (analytics) logEvent(analytics, 'save_recipe', { title: recipe.title });
      } catch(e) { console.error("Firebase save failed", e); }
    }
    const currentStr = localStorage.getItem('shirleys_kitchen_recipes');
    let current: Recipe[] = currentStr ? JSON.parse(currentStr) : [];
    const exists = current.find(r => r.id === recipe.id);
    const updated = exists ? current.map(r => r.id === recipe.id ? recipe : r) : [...current, recipe];
    localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(updated));
  }
};

// --- Initial Data ---
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

const FAMILY_MEMBERS = ['Nan', 'Wade', 'Donetta', 'Adrienne'];

const OWNER_COLORS: Record<string, string> = {
  'Nan': '#b45309',
  'Wade': '#0369a1',
  'Donetta': '#be185d',
  'Adrienne': '#7e22ce',
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

const AVATAR_COLORS = ['#b91c1c', '#15803d', '#b45309', '#0369a1', '#334155', '#4338ca', '#be185d', '#854d0e', '#0f766e', '#7e22ce'];

const getAvatarColor = (name: string, explicitColor?: string) => {
  if (explicitColor) return explicitColor;
  if (OWNER_COLORS[name]) return OWNER_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 4000); return () => clearTimeout(timer); }, [onClose]);
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
    <div style={{ backgroundColor: '#cc0000' }} className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-y-auto pb-20">
      <div className="relative z-10 bg-stone-50/95 p-8 md:p-16 rounded-sm shadow-2xl max-w-4xl mx-4 text-center border-double border-8 border-stone-800 mt-10 md:mt-20 animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 relative group perspective-1000">
            {!imgError ? (
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Macintosh_Crest.svg/1200px-Macintosh_Crest.svg.png" 
                alt="MacIntosh Family Crest" className="w-full h-full object-contain drop-shadow-2xl" onError={() => setImgError(true)} />
            ) : (
              <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-serif text-xs p-4 border-4 border-amber-500">MacIntosh Family Crest</div>
            )}
          </div>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-2">Shirley’s Kitchen</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-red-900 italic mb-6">Cooking with Nan</h2>
        <button onClick={onStart} className="px-10 py-4 font-serif text-lg font-bold text-white bg-red-900 rounded-sm shadow-lg hover:bg-red-800 flex items-center gap-3 mx-auto">
           Enter the Kitchen <BookOpen size={24} />
        </button>
      </div>
    </div>
  );
};

const RecipeModal: React.FC<{ 
  onClose: () => void; onSave: (recipe: Recipe) => void; initialRecipe?: Recipe | null; notify: (msg: string, type: 'success' | 'error') => void;
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
    let finalImageUrl = initialRecipe?.imageUrl;
    if (selectedFile) {
        setUploadingImage(true);
        try {
            const resizedBase64 = await resizeImage(selectedFile);
            finalImageUrl = await DataService.uploadImage(resizedBase64, initialRecipe?.id || id());
            notify("Image attached.", "success");
        } catch (err) { notify("Image failed.", "error"); } 
        finally { setUploadingImage(false); }
    }
    onSave({
      id: initialRecipe?.id || id(),
      title, category,
      ingredients: ingredients.split('\n').filter(i => i.trim()),
      instructions: instructions.split('\n').filter(i => i.trim()),
      yields, prepTime, cookTime, temp, description, addedBy,
      userColor: OWNER_COLORS[addedBy],
      timestamp: initialRecipe?.timestamp || Date.now(),
      imageUrl: finalImageUrl
    });
    onClose();
  };

  const generateWithAI = async () => {
    const apiKey = getApiKey();
    if (!apiKey) { notify("API Key missing", "error"); return; }
    setGenerating(true);
    try {
       const ai = new GoogleGenAI({ apiKey });
       const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: `Recipe for ${title}. Return JSON only: {title, category, description, ingredients[], instructions[], yields, prepTime, cookTime, temp}`
       });
       const text = response.text;
       if (text) {
         const data = JSON.parse(text.replace(/```json|```/g, '').trim());
         setTitle(data.title);
         if (Object.values(Category).includes(data.category)) setCategory(data.category);
         setDescription(data.description || "");
         setIngredients(data.ingredients?.join('\n') || "");
         setInstructions(data.instructions?.join('\n') || "");
         setYields(data.yields || "");
         setPrepTime(data.prepTime || "");
         setCookTime(data.cookTime || "");
         setTemp(data.temp || "");
         notify("AI Drafted!", "success");
       }
    } catch (e) { notify("AI Failed.", "error"); } finally { setGenerating(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center p-6 border-b"><h2 className="text-2xl font-serif font-bold">{initialRecipe ? 'Edit' : 'Add'} Recipe</h2><button onClick={onClose}><X /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
            <div className="flex gap-4">
               <input value={title} onChange={e => setTitle(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Title" required />
               {!initialRecipe && <button type="button" onClick={generateWithAI} disabled={generating} className="p-2 bg-purple-600 text-white rounded">{generating ? "..." : <ChefHat size={18}/>}</button>}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <select value={category} onChange={e => setCategory(e.target.value as Category)} className="p-2 border rounded">{Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}</select>
               <select value={addedBy} onChange={e => setAddedBy(e.target.value)} className="p-2 border rounded">{FAMILY_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}</select>
            </div>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" placeholder="Description" />
            <div className="border border-dashed p-4 text-center rounded"><input type="file" onChange={e => e.target.files && setSelectedFile(e.target.files[0])} /><p>{selectedFile ? selectedFile.name : "Upload Photo"}</p></div>
            <div className="grid grid-cols-2 gap-4">
                <input placeholder="Prep Time" value={prepTime} onChange={e => setPrepTime(e.target.value)} className="p-2 border rounded" />
                <input placeholder="Cook Time" value={cookTime} onChange={e => setCookTime(e.target.value)} className="p-2 border rounded" />
                <input placeholder="Temp" value={temp} onChange={e => setTemp(e.target.value)} className="p-2 border rounded" />
                <input placeholder="Yields" value={yields} onChange={e => setYields(e.target.value)} className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows={5} className="p-2 border rounded" placeholder="Ingredients (one per line)" required />
                <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={5} className="p-2 border rounded" placeholder="Instructions (one per line)" required />
            </div>
            <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-stone-900 text-white rounded" disabled={uploadingImage}>{uploadingImage ? "Uploading..." : "Save"}</button></div>
        </form>
      </div>
    </div>
  );
};

const RecipeDetail: React.FC<{ recipe: Recipe; onBack: () => void; onEdit: (r: Recipe) => void; isFavorite: boolean; toggleFavorite: () => void; notify: (msg: string, type: 'success' | 'error') => void; }> = ({ recipe, onBack, onEdit, isFavorite, toggleFavorite, notify }) => {
  const [tips, setTips] = useState("");
  const [loadingTips, setLoadingTips] = useState(false);

  const getGeminiTips = async () => {
    const apiKey = getApiKey();
    if (!apiKey) { notify("API Key missing", "error"); return; }
    setLoadingTips(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: `3 chef tips for ${recipe.title}` });
      if (response.text) setTips(response.text);
    } catch { notify("Tips failed", "error"); } finally { setLoadingTips(false); }
  };

  return (
    <div className="bg-white min-h-screen pb-20 print:pb-0">
      <style>{`@media print { @page { margin: 2cm; } .no-print { display: none !important; } .print-only { display: block !important; } } .print-only { display: none; }`}</style>
      <div className="print-only fixed top-0 w-full border-b pb-4 mb-8"><h1 className="text-3xl font-serif">Shirley's Kitchen</h1></div>
      <div className="print-only fixed bottom-0 w-full border-t pt-2 text-xs">Page <span className="after:content-[counter(page)]"></span></div>
      <div className="max-w-4xl mx-auto md:p-8">
        <button onClick={onBack} className="no-print mb-6 flex items-center text-stone-500"><ArrowLeft size={20} /> Back</button>
        <div className="bg-stone-50 md:rounded-lg overflow-hidden border border-stone-200 print:border-none">
          <div className="relative h-64 md:h-80 bg-stone-200 no-print">
            {recipe.imageUrl ? <img src={recipe.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-400"><UtensilsCrossed size={64} opacity={0.2} /></div>}
            <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={toggleFavorite} className="p-3 bg-white/90 rounded-full text-red-500"><Heart size={20} fill={isFavorite ? "currentColor" : "none"} /></button>
                <button onClick={() => onEdit(recipe)} className="p-3 bg-white/90 rounded-full"><Edit2 size={20} /></button>
                <button onClick={() => window.print()} className="p-3 bg-white/90 rounded-full"><Printer size={20} /></button>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="text-center mb-8 border-b pb-6">
               <span className="text-amber-600 font-bold text-xs uppercase">{recipe.category}</span>
               <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{recipe.title}</h1>
               <p className="text-stone-600 italic">{recipe.description}</p>
               <div className="flex justify-center gap-6 mt-6 text-stone-500 text-sm font-bold uppercase">
                  {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
                  {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
                  {recipe.yields && <span>Yields: {recipe.yields}</span>}
               </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div><h3 className="text-xl font-bold mb-4 border-b pb-2">Ingredients</h3><ul className="space-y-2">{recipe.ingredients.map((i, k) => <li key={k} className="flex gap-2"><span className="text-amber-500">•</span>{i}</li>)}</ul></div>
              <div className="md:col-span-2"><h3 className="text-xl font-bold mb-4 border-b pb-2">Instructions</h3><div className="space-y-4">{recipe.instructions.map((s, k) => <div key={k} className="flex gap-4"><span className="font-bold text-stone-400">{k+1}</span><p>{s}</p></div>)}</div></div>
            </div>
            <div className="mt-12 pt-6 border-t flex justify-between items-center no-print">
               <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: getAvatarColor(recipe.addedBy, recipe.userColor) }}>{recipe.addedBy[0]}</div><span className="font-bold text-sm">By {recipe.addedBy}</span></div>
               <button onClick={getGeminiTips} disabled={loadingTips} className="text-amber-600 font-bold flex gap-2"><ChefHat size={18}/> {loadingTips ? "Thinking..." : "Chef Tips"}</button>
            </div>
            {tips && <div className="mt-6 p-4 bg-amber-50 rounded no-print"><h4 className="font-bold text-amber-800 flex gap-2 mb-2"><ChefHat size={16}/> Tips</h4><p className="text-sm whitespace-pre-line">{tips}</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type });

  useEffect(() => {
    const init = async () => {
      const data = await DataService.getRecipes();
      setRecipes(data.length > 0 ? data : INITIAL_RECIPES);
      const favs = localStorage.getItem('favorites');
      if (favs) setFavorites(new Set(JSON.parse(favs)));
    };
    init();
  }, []);

  const filtered = useMemo(() => {
    let res = selectedCategory ? recipes.filter(r => r.category === selectedCategory) : recipes;
    if (searchQuery) res = res.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return res;
  }, [recipes, selectedCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    const next = new Set(favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavorites(next);
    localStorage.setItem('favorites', JSON.stringify(Array.from(next)));
  };

  const handleSave = async (r: Recipe) => {
    const next = editingRecipe ? recipes.map(x => x.id === r.id ? r : x) : [...recipes, r];
    setRecipes(next);
    await DataService.saveRecipe(r);
    setEditingRecipe(null);
    if (selectedRecipe?.id === r.id) setSelectedRecipe(r);
    notify("Saved!", "success");
  };

  if (view === 'intro') return <Intro onStart={() => setView('home')} />;
  if (view === 'detail' && selectedRecipe) return <><RecipeDetail recipe={selectedRecipe} onBack={() => setView('home')} onEdit={r => { setEditingRecipe(r); setIsModalOpen(true); }} isFavorite={favorites.has(selectedRecipe.id)} toggleFavorite={() => toggleFavorite(selectedRecipe.id)} notify={notify} />{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</>;

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-stone-800 overflow-hidden">
      <aside className={`fixed z-30 w-64 bg-stone-900 text-stone-300 h-full flex flex-col transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex justify-between"><h2 className="font-bold text-white">Shirley's Kitchen</h2><button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><X /></button></div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          <button onClick={() => { setView('home'); setSelectedCategory(null); }} className="w-full flex gap-3 px-3 py-2 hover:bg-stone-800 rounded"><Home size={18}/> Home</button>
          <div className="pt-4 pb-2 px-3 text-xs font-bold uppercase">Categories</div>
          {Object.values(Category).map(c => <button key={c} onClick={() => { setSelectedCategory(c); setView('category'); setIsSidebarOpen(false); }} className={`w-full flex justify-between px-3 py-2 text-sm rounded hover:bg-stone-800 ${selectedCategory === c ? 'bg-stone-800 text-white' : ''}`}><span>{c}</span><span className="text-xs text-stone-500">{recipes.filter(r => r.category === c).length}</span></button>)}
        </nav>
        <div className="p-4"><button onClick={() => setShowDevData(true)} className="flex gap-2 text-xs justify-center w-full"><Database size={12}/> Data</button></div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative w-full">
         <div className="md:hidden bg-stone-900 text-white p-4 flex justify-between"><button onClick={() => setIsSidebarOpen(true)}><Menu/></button><span>Shirley's Kitchen</span><button onClick={() => setIsModalOpen(true)}><Plus/></button></div>
         <header className="bg-white border-b p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96"><Search className="absolute left-3 top-2.5 text-stone-400" size={18} /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-stone-100 rounded-full" /></div>
            <div className="flex gap-2">
               {view === 'category' && <div className="flex bg-stone-100 p-1 rounded"><button onClick={() => setDisplayMode('grid')} className={`p-2 rounded ${displayMode === 'grid' ? 'bg-white shadow' : ''}`}><LayoutGrid size={18}/></button><button onClick={() => setDisplayMode('list')} className={`p-2 rounded ${displayMode === 'list' ? 'bg-white shadow' : ''}`}><List size={18}/></button></div>}
               <button onClick={() => { setEditingRecipe(null); setIsModalOpen(true); }} className="hidden md:flex gap-2 px-4 py-2 bg-stone-900 text-white rounded-full"><Plus size={18}/> Add</button>
            </div>
         </header>
         <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            {view === 'home' && !searchQuery ? (
              <div className="space-y-10">
                <div onClick={() => { setView('category'); setSelectedCategory(null); }} className="relative rounded-2xl overflow-hidden shadow-xl aspect-[21/9] md:aspect-[3/1] cursor-pointer group">
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-8"><h2 className="text-white text-3xl font-serif font-bold">Welcome Home</h2></div>
                </div>
                <div><h3 className="text-2xl font-serif font-bold mb-6">Browse by Category</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Object.values(Category).map(c => (
                      <div key={c} onClick={() => { setSelectedCategory(c); setView('category'); }} className="h-40 relative rounded-xl overflow-hidden cursor-pointer group shadow"><img src={CATEGORY_IMAGES[c]} className="w-full h-full object-cover group-hover:scale-110 transition-transform"/><div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center text-white font-serif font-bold">{c}</div></div>
                   ))}</div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8">{searchQuery ? `Results: "${searchQuery}"` : (selectedCategory || "All Recipes")}</h2>
                <div className={displayMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-2"}>
                  {filtered.map(r => (
                     <div key={r.id} onClick={() => { setSelectedRecipe(r); setView('detail'); }} className={`bg-white rounded-xl border overflow-hidden cursor-pointer hover:shadow-lg transition-all ${displayMode === 'list' ? 'flex items-center p-2' : ''}`}>
                        <div className={displayMode === 'list' ? "w-16 h-16 shrink-0 mr-4 bg-stone-100" : "h-48 bg-stone-100 relative"}>
                          {r.imageUrl ? <img src={r.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><ChefHat /></div>}
                        </div>
                        <div className="p-4 flex-1">
                           <h3 className="font-serif font-bold text-lg mb-1">{r.title}</h3>
                           <p className="text-xs text-stone-500">{r.category}</p>
                        </div>
                     </div>
                  ))}
                </div>
              </div>
            )}
         </div>
      </main>
      {isModalOpen && <RecipeModal initialRecipe={editingRecipe} onClose={() => setIsModalOpen(false)} onSave={handleSave} notify={notify} />}
      {showDevData && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"><div className="bg-stone-900 text-stone-300 p-4 rounded w-full max-w-2xl"><pre className="h-96 overflow-auto text-xs">{JSON.stringify(recipes, null, 2)}</pre><button onClick={() => setShowDevData(false)} className="mt-4 px-4 py-2 bg-amber-700 text-white rounded">Close</button></div></div>}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
