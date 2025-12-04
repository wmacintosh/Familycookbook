import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Search, Plus, ChefHat, User, Home, UtensilsCrossed, X, Menu, Printer, Check, Heart, Trash2, PlusCircle, Palette, ChevronRight, Edit2, Share2, Clock, Thermometer, ArrowLeft, LayoutGrid, List, Soup, Croissant, Cake, Pizza, Leaf, Droplet, Coffee, Image as ImageIcon, AlertTriangle, ChevronDown } from 'lucide-react';
import { Recipe, Category, UserColorMap } from './types';

// Helper to safely get API Key without crashing if process is undefined (Vercel/Vite issue)
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // process is not defined
  }
  return "";
};

// Helper to create IDs
const id = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_RECIPES: Recipe[] = [
  // --- APPETIZERS & DIPS ---
  {
    id: id(),
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
    id: id(),
    title: "Carrot Salad (Marinated)",
    category: Category.APPETIZERS,
    ingredients: [
      "2 lbs Carrots, peeled, sliced thin, cooked, and drained",
      "1 red onion, sliced thin",
      "1 green pepper, sliced thin",
      "1 can (8 oz) tomato Sauce",
      "1/2 cup white sugar",
      "1/2 cup wine vinegar (or white vinegar)",
      "1/2 cup oil",
      "1 tsp salt",
      "1 tsp Dry mustard",
      "1/2 tsp pepper"
    ],
    instructions: [
      "Cook peeled and sliced carrots until just tender-crisp. Drain well and cool.",
      "In a large bowl, combine tomato sauce, sugar, vinegar, oil, salt, dry mustard, and pepper. Whisk until sugar dissolves.",
      "Add carrots, sliced onion, and green pepper. Stir gently to coat.",
      "Chill overnight to allow flavors to meld."
    ],
    yields: "12 servings",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic Deviled Eggs",
    category: Category.APPETIZERS,
    ingredients: [
      "6 large Eggs",
      "1/4 cup Mayonnaise",
      "1 tsp Dijon Mustard",
      "1 tsp White Vinegar",
      "1/8 tsp Salt",
      "Pinch of Black Pepper",
      "Paprika (for garnish)",
      "Optional: Chives or fresh dill"
    ],
    instructions: [
      "Hard-boil eggs: Cover with cold water, boil, let sit covered 12-15 mins. Cool in ice bath.",
      "Peel and slice in half lengthwise. Mash yolks with mayo, mustard, vinegar, salt, and pepper until smooth.",
      "Pipe or spoon yolk mixture into whites.",
      "Sprinkle with paprika and serve."
    ],
    yields: "12 halves",
    prepTime: "15 mins",
    cookTime: "15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Crab Dip Appetizer",
    category: Category.APPETIZERS,
    ingredients: [
      "1 cup Mayo",
      "1/2 cup shredded Cheddar Cheese",
      "1/2 cup chopped onion",
      "1/2 tsp curry Powder",
      "4 Dashes Tabasco Sauce",
      "1 can Crab meat (6-7 oz), drained",
      "French bread, sliced"
    ],
    instructions: [
      "Preheat Broiler.",
      "Mix mayo, cheese, onion, curry powder, Tabasco, and crab meat.",
      "Spread on French bread slices.",
      "Broil for approx 1 minute until bubbly and browned. Watch carefully!"
    ],
    cookTime: "1 min",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hot Crabmeat Appetizer",
    category: Category.APPETIZERS,
    ingredients: [
      "8 oz cream cheese, softened",
      "7.5 oz can crabmeat, drained & flaked",
      "2 tsp finely chopped onions",
      "2 Tbsp milk",
      "1/2 tsp horseradish",
      "1/4 tsp salt",
      "1/2 cup sliced almonds, toasted"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Mix all ingredients except almonds.",
      "Spoon into pie plate. Top with almonds.",
      "Bake 15 minutes until bubbly."
    ],
    temp: "375°F",
    cookTime: "15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lobster Dip (Donnetta's)",
    category: Category.APPETIZERS,
    ingredients: [
      "1 can Lobster (6 oz), drained and chopped",
      "8 oz Cream Cheese, softened",
      "1 cup Mayonnaise",
      "1 cup grated Cheddar cheese",
      "1/2 cup diced onion",
      "2 tsp Dill weed (Optional)"
    ],
    instructions: [
      "Preheat oven to 325°F.",
      "Beat cream cheese and mayo. Stir in cheese, onion, dill.",
      "Fold in lobster. Spread in baking dish.",
      "Bake 20 minutes until bubbly."
    ],
    temp: "325°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Party Cheese Ball",
    category: Category.APPETIZERS,
    ingredients: [
      "2 pkg (8 oz each) Cream Cheese, softened",
      "1 cup Shredded Cheddar Cheese",
      "1 Tbsp Worcestershire Sauce",
      "1 tsp Garlic Powder",
      "1 tsp Onion Powder",
      "Chopped Pecans or Parsley"
    ],
    instructions: [
      "Combine cheeses and seasonings. Mix well.",
      "Shape into a ball.",
      "Roll in chopped pecans or parsley.",
      "Wrap and chill for at least 1 hour."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spicy Guacamole",
    category: Category.APPETIZERS,
    ingredients: [
      "3 ripe Hass avocados",
      "1/4 cup finely diced onion",
      "1/4 cup chopped cilantro",
      "1-2 Serrano peppers, minced",
      "Juice of 1-2 limes",
      "1/2 tsp salt"
    ],
    instructions: [
      "Mash avocados with lime juice.",
      "Stir in onion, cilantro, peppers, and salt.",
      "Serve immediately."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spicy Queso Dip",
    category: Category.APPETIZERS,
    ingredients: [
      "1 Tbsp Butter",
      "1/4 cup Onion, chopped",
      "1-2 cloves Garlic, minced",
      "1 can (12 oz) Evaporated Milk",
      "8 oz Velveeta/White American Cheese, cubed",
      "8 oz Pepper Jack cheese, shredded",
      "1 can (10 oz) Rotel (Tomatoes & Chilies)",
      "1 fresh Jalapeño, minced"
    ],
    instructions: [
      "Sauté onion, garlic, and jalapeño in butter.",
      "Add evaporated milk and heat (do not boil).",
      "Melt in cheeses slowly.",
      "Stir in Rotel. Heat through and serve."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Homemade Spicy Ranch Dip",
    category: Category.APPETIZERS,
    ingredients: [
      "1/2 cup Mayonnaise",
      "1/2 cup Sour Cream",
      "1/4-1/2 cup Buttermilk",
      "1 tsp Dried Dill",
      "1 tsp Dried Parsley",
      "1/2 tsp Dried Chives",
      "1/2 tsp Garlic Powder",
      "1/2 tsp Onion Powder",
      "Spicy Elements: Jalapeno, Cayenne, Hot Sauce, or Chipotle Powder"
    ],
    instructions: [
      "Whisk together mayo, sour cream, and buttermilk.",
      "Add herbs, spices, and chosen spicy elements.",
      "Chill for at least 30 minutes before serving."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },


  // --- SOUPS & SALADS ---
  {
    id: id(),
    title: "Carrot Salad (Classic)",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1 can (8 oz) tomato sauce",
      "1/2 cup white sugar",
      "1/2 cup white vinegar",
      "1/3 cup oil",
      "1 tsp salt",
      "1 tsp dry mustard",
      "1/2 tsp pepper",
      "2 lbs carrots, cooked and sliced",
      "1 red onion, sliced thin",
      "1/2 green pepper, sliced thin"
    ],
    instructions: [
      "Mix sauce ingredients (sugar, tomato sauce, vinegar, oil, seasonings).",
      "Pour over cooked carrots, onion, and green pepper.",
      "Chill overnight."
    ],
    yields: "12 servings",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Three Bean Salad",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1 can Red Kidney beans, drained",
      "1 can Green beans, drained",
      "1 can Yellow Wax beans, drained",
      "1 cup chopped Celery",
      "1/2 cup chopped Green Peppers",
      "1/2 cup chopped Onion",
      "Dressing: 3/4 cup sugar, 1/2 cup vinegar, 1/4 cup oil, 1 tsp salt"
    ],
    instructions: [
      "Combine beans and vegetables in a large bowl.",
      "Whisk dressing ingredients until sugar dissolves.",
      "Pour over bean mixture. Chill overnight."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Macaroni Salad",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "3 cups Cooked macaroni",
      "3 Hard-boiled eggs, chopped",
      "1 can Salmon (6-7 oz), drained and flaked",
      "1 Onion, chopped",
      "Chopped Celery",
      "Miracle Whip",
      "Salt, Pepper, Garlic Powder"
    ],
    instructions: [
      "Season cooked macaroni with salt, pepper, garlic powder.",
      "Add eggs, salmon, onion, and celery.",
      "Moisten with Miracle Whip. Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Marcella's Diet Soup",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "2 cans (28 oz) Tomatoes",
      "1 packet Onion soup mix",
      "5-6 carrots, chopped",
      "8 stalks Celery, chopped",
      "2 Green Peppers, chopped",
      "5 onions, chopped",
      "1-2 lbs Chicken Breast (optional)",
      "24 cups water",
      "Macaroni (optional)"
    ],
    instructions: [
      "Combine all vegetables, soup mix, tomatoes, and water in a huge pot.",
      "Simmer 1-2 hours until tender.",
      "Add macaroni in the last 10 minutes if desired."
    ],
    yields: "6 quarts",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Minestrone Soup",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1.5 lb Ground Beef",
      "1 cup Zucchini, diced",
      "1 cup Potatoes, cubed",
      "1/2 cup Celery, chopped",
      "1 can Tomatoes (14 oz)",
      "1/4 cup Rice OR 1/2 cup Macaroni",
      "6 cups Water",
      "1 cup Onion, diced",
      "1/2 cup Okra",
      "1 cup Carrots",
      "1 cup Cabbage",
      "Spices: Thyme, Bay leaf, Salt, Worcestershire"
    ],
    instructions: [
      "Brown beef. Drain.",
      "Add water, tomatoes, vegetables, and seasonings. Boil.",
      "Add rice or pasta.",
      "Simmer 1 hour."
    ],
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Minted Fruit Rice Salad",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "2/3 cup Pineapple juice",
      "1/3 cup water",
      "1 cup instant Rice",
      "1 can Mandarin oranges, drained",
      "1 can Crushed pineapple, undrained",
      "1/2 cup chopped cucumber",
      "1/3 cup chopped red onion",
      "3 Tbsp chopped fresh mint"
    ],
    instructions: [
      "Boil juice and water. Stir in rice. Cover, remove from heat, stand 10 mins.",
      "Fluff rice. Add remaining ingredients.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pineapple Spinach Salad",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1 can (20 oz) Pineapple chunks, drained",
      "4 cups Spinach",
      "1/2 cup red onion, sliced",
      "1/2 cup toasted almonds",
      "1/2 cup Italian Dressing"
    ],
    instructions: [
      "Toss all ingredients with dressing just before serving."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spicy Vegetable Soup",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1 Tbsp Olive Oil",
      "1 Onion, chopped",
      "2 Carrots, chopped",
      "2 Celery stalks, chopped",
      "1 tsp Chili Powder, Cumin",
      "6-8 cups Veg Broth",
      "1 can Diced Tomatoes",
      "Corn, Green Beans"
    ],
    instructions: [
      "Sauté onion, carrots, celery. Add spices.",
      "Add broth and tomatoes. Simmer 20 mins.",
      "Add corn and beans. Simmer until tender."
    ],
    prepTime: "20 mins",
    cookTime: "30-40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
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
  },

  // --- MAIN DISHES ---
  {
    id: id(),
    title: "Antosh Rice",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 cup uncooked rice",
      "1 envelope Onion Soup Mix",
      "1 can Cream of Mushroom Soup",
      "1/2 soup can water",
      "1/4 cup melted butter"
    ],
    instructions: [
      "Combine ingredients in casserole dish.",
      "Drizzle with butter. Cover.",
      "Bake 45 mins at 325°F. Uncover, bake 30 mins more."
    ],
    temp: "325°F",
    cookTime: "1 hr 15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Authentic Chicken Vindaloo",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Paste: Dry chilies, vinegar, garlic, ginger, cumin, mustard seeds, cinnamon, turmeric",
      "1.5 lbs Chicken",
      "1 large Onion",
      "Water/Broth"
    ],
    instructions: [
      "Blend spices into paste. Marinate chicken 30 mins.",
      "Brown onion. Add chicken and cook.",
      "Add water/broth. Simmer 30 mins until tender."
    ],
    description: "Spicy Indian Curry",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Authentic Dal Makhani",
    category: Category.MAIN_DISHES,
    ingredients: [
      "3/4 cup Whole Black Lentils (soaked overnight)",
      "1/4 cup Kidney Beans (soaked)",
      "Masala: Butter, Ginger-Garlic paste, Tomato puree, Chili powder, Garam masala",
      "Finish: Butter, Cream, Kasuri Methi"
    ],
    instructions: [
      "Cook soaked lentils/beans until very soft (mash slightly).",
      "Sauté masala ingredients until oil separates.",
      "Add lentils to masala. Simmer low for 1-2 hours.",
      "Finish with butter and cream."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Baked Macaroni and Cheese",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 pkg macaroni, cooked",
      "1 tbsp butter",
      "1 tbsp flour",
      "1 cup milk",
      "1 cup shredded cheese",
      "Bread crumbs (optional)"
    ],
    instructions: [
      "Make white sauce with butter, flour, milk.",
      "Melt in cheese.",
      "Combine with macaroni. Pour into dish.",
      "Top with crumbs. Bake 30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Baked Salmon (Antosh)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Crust: 2.5 cups flour, 3.5 tsp baking powder, 1/4 lb lard, egg, milk",
      "Filling: Spinach, 1 lb Salmon fillet, Havarti cheese"
    ],
    instructions: [
      "Make dough. Roll out.",
      "Layer spinach, salmon, and cheese on half. Fold over.",
      "Bake 25 mins at 400°F."
    ],
    temp: "400°F",
    cookTime: "25 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Calico Beans (Laurie's)",
    category: Category.SIDE_DISHES,
    ingredients: [
      "1 lb Bacon, cooked & crumbled",
      "1 Onion",
      "Beans (1 can each): Kidney, Lima, Chickpeas, Pork & Beans",
      "Sauce: 3/4 cup brown sugar, 1/3 cup vinegar, 1.5 tsp dry mustard"
    ],
    instructions: [
      "Sauté onion. Add sauce ingredients.",
      "Mix with beans and bacon.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "French Fried Onion Rings",
    category: Category.SIDE_DISHES,
    ingredients: [
      "2 large Sweet Onions, sliced 1/4 inch thick",
      "1.5 cups Flour",
      "1 tsp Baking Powder",
      "1 tsp Salt",
      "1 Egg",
      "1 cup Milk",
      "Oil for frying"
    ],
    instructions: [
      "Separate onion slices into rings.",
      "Whisk flour, baking powder, salt, egg, and milk to make a batter.",
      "Dip rings in batter.",
      "Fry in hot oil (375°F) until golden brown. Drain on paper towels."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "French Fried Onion Rings (Version 2)",
    category: Category.SIDE_DISHES,
    ingredients: [
      "4-5 Onions (medium to large)",
      "2 cups Milk",
      "3 Eggs",
      "Seasonings (paprika, garlic, onion powder)",
      "Salt & Pepper",
      "1 cup Flour"
    ],
    instructions: [
      "Slice onions. Whisk milk, eggs, and seasonings in a bowl.",
      "Place flour in a bag.",
      "Dip rings in wet mixture, then shake in flour bag to coat.",
      "Fry in hot oil (385°F) until golden brown (2-4 mins)."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chinese Peppered Steak (Gail's)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1.5 lbs Steak strips",
      "1 Tbsp paprika",
      "2 cloves garlic",
      "Green pepper, Green onions, Tomatoes",
      "1 cup Beef broth",
      "Thickener: Cornstarch + Water + Soy Sauce"
    ],
    instructions: [
      "Brown steak with paprika and garlic.",
      "Add vegetables and broth. Simmer 15 mins.",
      "Thicken with cornstarch slurry."
    ],
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Morning Wife Saver",
    category: Category.MAIN_DISHES,
    ingredients: [
      "16 slices bread (crusts off)",
      "Ham or Bacon slices",
      "Cheddar cheese slices",
      "4 Eggs, 3 cups Milk, Seasonings",
      "Topping: Melted butter, Cornflakes"
    ],
    instructions: [
      "Layer bread, meat, cheese, bread in 9x13 pan.",
      "Pour egg/milk mixture over. Chill overnight.",
      "Top with butter/cornflakes. Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Curried Chicken",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 Chicken (3 lb), cut up",
      "2 Onions",
      "2 Tbsp Curry powder",
      "2 Tbsp Tomato paste",
      "1 cup Chicken stock",
      "Raisins, Chopped apple"
    ],
    instructions: [
      "Brown chicken. Remove.",
      "Sauté onions, curry, tomato paste.",
      "Add stock, fruit. Return chicken.",
      "Simmer 1.5 hours."
    ],
    cookTime: "1.5 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Garlic Spareribs",
    category: Category.MAIN_DISHES,
    ingredients: [
      "4-5 lbs Spareribs",
      "Sauce: 1 cup Brown sugar, 2 Tbsp cornstarch, 1/2 cup vinegar, 2 cups water, dry mustard, soy sauce, garlic"
    ],
    instructions: [
      "Brown ribs.",
      "Mix sauce ingredients.",
      "Pour sauce over ribs in casserole.",
      "Bake 1 hour at 325°F."
    ],
    temp: "325°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Goat Cheese Stuffed Chicken",
    category: Category.MAIN_DISHES,
    ingredients: [
      "4 Chicken Breasts",
      "4 oz Goat Cheese",
      "Garlic, Herbs",
      "Balsamic Vinegar (for reduction)"
    ],
    instructions: [
      "Stuff chicken with cheese/herb mix.",
      "Sear in pan.",
      "Bake at 375°F for 15-25 mins.",
      "Serve with reduced balsamic vinegar."
    ],
    temp: "375°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Ham & Potatoes Au Gratin",
    category: Category.MAIN_DISHES,
    ingredients: [
      "3 cups cooked potatoes",
      "2 cups cooked ham",
      "White Sauce: Butter, flour, milk, 1 cup cheddar, 1/4 cup mayo"
    ],
    instructions: [
      "Make cheese sauce.",
      "Combine with potatoes and ham.",
      "Bake 30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hash Brown Casserole",
    category: Category.SIDE_DISHES,
    ingredients: [
      "1 bag Frozen Hash Browns",
      "1 can Mushroom soup",
      "1 cup Sour cream",
      "1 Onion",
      "1/2 cup Melted margarine",
      "1 cup Cheddar"
    ],
    instructions: [
      "Mix all ingredients.",
      "Spread in 9x13 pan. Top with parmesan.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hodge Podge",
    category: Category.SIDE_DISHES,
    ingredients: [
      "New potatoes, Carrots, Green/Yellow Beans, Peas",
      "1 cup Cream",
      "Butter",
      "Salt & Pepper"
    ],
    instructions: [
      "Boil vegetables until tender.",
      "Drain most water.",
      "Add cream and butter. Heat through."
    ],
    description: "Maritime Classic",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hodge Podge (Joanie's)",
    category: Category.SIDE_DISHES,
    ingredients: [
      "Baby carrots, New potatoes, Beans, Peas",
      "1/2 cup Whipping cream",
      "1/4 cup Butter"
    ],
    instructions: [
      "Steam vegetables in a little water (7-10 mins).",
      "Add cream and butter directly to pot.",
      "Season well."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Homemade Perogies",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Dough: 4.5 cups Flour, 2 cups Sour cream, 2 Eggs, Butter, Oil",
      "Filling: 8 Potatoes (mashed), 1 cup Cheddar, 2 Tbsp Cheese Whiz"
    ],
    instructions: [
      "Make dough, rest 20 mins.",
      "Make filling (mashed potato + cheese).",
      "Roll dough, cut circles, fill and seal.",
      "Boil until they float (5-8 mins)."
    ],
    yields: "60 perogies",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lasagna",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Lasagna noodles",
      "Meat Sauce: Beef, onion, tomato paste/soup, canned tomatoes, spices",
      "Cheese Layer: Cottage cheese, egg, parmesan",
      "Mozzarella"
    ],
    instructions: [
      "Layer: Sauce, Noodles, Cheese Mix, Mozzarella.",
      "Repeat.",
      "Bake covered 30 mins, uncovered 15 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "45 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lazy Cabbage Roll Casserole",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1.5 lb Ground Beef",
      "1 Cabbage, chopped",
      "1 cup Rice (uncooked)",
      "1 can Tomato Sauce",
      "2 cans Beef Broth"
    ],
    instructions: [
      "Brown beef/onion.",
      "Mix cabbage, rice, tomato sauce.",
      "Layer in pan. Pour broth over.",
      "Bake covered 1 hour, then 20 mins more."
    ],
    temp: "350°F",
    cookTime: "1.5 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Meat Pie (Traditional)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 lb Pork, 1/2 lb Beef (cubed)",
      "Onion, Savory/Mace",
      "Pastry for double crust"
    ],
    instructions: [
      "Simmer meats with spices until tender. Cool.",
      "Fill pastry crust.",
      "Bake 450°F for 15 mins, then 350°F for 45 mins."
    ],
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Meatballs (with Pineapple)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Meatballs (2-3 lbs)",
      "Onion, Green Pepper",
      "Pineapple chunks",
      "Sauce: Brown sugar, vinegar, pineapple juice, ketchup"
    ],
    instructions: [
      "Fry meatballs and veg.",
      "Thicken sauce ingredients in pot.",
      "Combine everything and heat through."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pâté Acadien (Acadian Meat Pie)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Meats: Beef, Pork, Chicken (3 lbs each)",
      "Onions",
      "Pastry: 8 cups flour, 1 lb lard"
    ],
    instructions: [
      "Stew meats until falling apart. Remove bones/shred.",
      "Make large pastry.",
      "Fill with meat and broth.",
      "Bake 45-60 mins at 375°F."
    ],
    temp: "375°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Peppered Steak",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1.5 lb Steak strips",
      "2 cans Beef Consommé",
      "Soy sauce, Garlic powder",
      "Green peppers, Tomatoes"
    ],
    instructions: [
      "Brown steak.",
      "Add liquid/spices. Simmer 10 mins.",
      "Add peppers (10 mins). Thicken. Add tomatoes (10 mins)."
    ],
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pork Hock & Sauerkraut",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 Pork Hock",
      "1 jar Sauerkraut",
      "Onion",
      "Water/Broth"
    ],
    instructions: [
      "Layer onion, hock, kraut in slow cooker.",
      "Add liquid.",
      "Cook Low 6-8 hours.",
      "Shred meat and return to pot."
    ],
    cookTime: "6-8 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Saucy Chicken & Asparagus",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 lb Asparagus",
      "4 Chicken Breasts",
      "Sauce: Cream of Chicken soup, mayo, lemon, curry powder",
      "Cheddar cheese"
    ],
    instructions: [
      "Layer asparagus and browned chicken.",
      "Pour sauce over. Bake 40 mins at 375°F.",
      "Top with cheese."
    ],
    temp: "375°F",
    cookTime: "40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Saucy Pepper Steak (Crock Pot)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Round steak strips",
      "Onion, Garlic, Peppers",
      "Tomatoes, Beef bouillon, Soy sauce"
    ],
    instructions: [
      "Place steak and veg in slow cooker.",
      "Pour tomato mix over.",
      "Cook Low 6-8 hours."
    ],
    cookTime: "6-8 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Scallop Casserole",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 lb Scallops",
      "Mushrooms, Onion, Celery, Green Pepper",
      "White sauce (butter/flour/milk)",
      "Bread crumbs"
    ],
    instructions: [
      "Sauté veg. Make white sauce.",
      "Combine with scallops.",
      "Bake 20 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Scalloped Potatoes",
    category: Category.SIDE_DISHES,
    ingredients: [
      "4 Potatoes, sliced",
      "Onion",
      "Milk",
      "Flour/Butter",
      "Cheddar Cheese"
    ],
    instructions: [
      "Layer potatoes/onions with flour/butter.",
      "Pour milk over.",
      "Top with cheese. Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spanish Rice",
    category: Category.SIDE_DISHES,
    ingredients: [
      "Bacon",
      "Onion, Green Pepper",
      "1 cup Rice",
      "2 cups Canned Tomatoes",
      "2 cups Water"
    ],
    instructions: [
      "Fry bacon. Sauté veg.",
      "Add rice, tomatoes, water.",
      "Simmer 30 minutes."
    ],
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spareribs or Chicken with Sauce",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Spareribs",
      "Sauce: Ketchup, vinegar, lemon juice, Worcestershire, brown sugar"
    ],
    instructions: [
      "Bake ribs 30 mins at 400°F.",
      "Add sauce. Bake 1 hour at 350°F."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Speedy Tex Mex Bowl",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Cooked Rice",
      "Cooked Beef",
      "Kidney Beans",
      "Corn",
      "Salsa",
      "Cheddar"
    ],
    instructions: [
      "Combine all ingredients in pan.",
      "Heat through.",
      "Top with cheese."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Steak with Peppers and Onions",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Steak strips",
      "Peppers, Onions, Tomatoes",
      "Beef broth",
      "Soy sauce"
    ],
    instructions: [
      "Brown steak.",
      "Add veg/broth. Simmer 15 mins.",
      "Thicken sauce."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Sweet & Sour Meatballs",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Meatballs",
      "Sauce: Brown sugar, Cornstarch, Ketchup, Vinegar, Pineapple juice",
      "Pineapple chunks, Green pepper"
    ],
    instructions: [
      "Make sauce.",
      "Pour over meatballs and veg.",
      "Heat through."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Sweet & Sour Meatballs (Version 2)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Meatballs",
      "Sauce: 11 oz Ketchup, 9 oz Apple Jelly, Brown sugar, Lemon juice"
    ],
    instructions: [
      "Simmer sauce.",
      "Bake with meatballs 30 mins at 325°F."
    ],
    temp: "325°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Sweet & Sour Meatballs (Version 3)",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Meatballs",
      "Sauce: Ketchup, Pineapple juice, Brown sugar, Vinegar",
      "Pineapple chunks, Green pepper"
    ],
    instructions: [
      "Simmer sauce with veg.",
      "Pour over meatballs."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Tuna Casserole",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Canned Tomatoes",
      "Mushroom Soup",
      "2 tins Tuna",
      "Cheese slices",
      "Potato chips"
    ],
    instructions: [
      "Mix tomato/soup.",
      "Layer chips, tuna, sauce, tuna, sauce, cheese.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },

  // --- BREADS & MUFFINS ---
  {
    id: id(),
    title: "Banana Bread",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1/4 cup shortening",
      "1 cup brown sugar",
      "1 egg",
      "4 bananas, mashed",
      "1.5 cups flour",
      "Soda, Powder, Salt"
    ],
    instructions: [
      "Cream fat/sugar. Add egg, banana.",
      "Mix in dry ingredients.",
      "Bake 45 mins at 300°F."
    ],
    temp: "300°F",
    cookTime: "45 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Banana Chip Muffins",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1/2 cup margarine",
      "3/4 cup sugar",
      "2 eggs",
      "2 bananas",
      "2 cups flour",
      "Choc chips"
    ],
    instructions: [
      "Cream wet. Add dry.",
      "Fold in chips.",
      "Bake 15-20 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Blueberry Muffins",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1/4 cup butter",
      "1/2 cup sugar",
      "1 egg",
      "2 cups flour",
      "1/2 cup milk",
      "1 cup blueberries"
    ],
    instructions: [
      "Cream butter/sugar. Add egg.",
      "Add dry/milk alternately.",
      "Fold in berries. Bake 15-20 mins at 425°F."
    ],
    temp: "425°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Blueberry Muffins (Version 2)",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1.5 cups Flour",
      "1/2 cup Butter",
      "1/2 cup Sugar",
      "1 Egg",
      "1/2 cup Milk",
      "2 cups Blueberries"
    ],
    instructions: [
      "Mix batter.",
      "Fold in floured berries.",
      "Bake 20 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Blueberry Strawberry Muffins",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "3 cups Flour",
      "1.5 cups Sugar",
      "2/3 cup Oil",
      "2 Eggs",
      "Blueberries & Strawberries"
    ],
    instructions: [
      "Mix oil/sugar/eggs.",
      "Add dry.",
      "Fold in fruit. Bake 20-25 mins at 400°F."
    ],
    temp: "400°F",
    cookTime: "25 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Cinnamon Loaf",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "Batter: Margarine, sugar, eggs, flour, sour milk",
      "Filling: Brown sugar, Cinnamon"
    ],
    instructions: [
      "Make batter.",
      "Layer batter, filling, batter.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic Buttermilk Biscuits",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "2.5 cups flour",
      "1/2 cup cold butter",
      "1 cup buttermilk"
    ],
    instructions: [
      "Cut butter into flour.",
      "Stir in buttermilk.",
      "Cut and bake 15 mins at 425°F."
    ],
    temp: "425°F",
    cookTime: "15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lemon Bread",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "Batter: Butter, sugar, eggs, flour, milk, lemon rind/juice",
      "Glaze: Lemon juice, sugar"
    ],
    instructions: [
      "Make batter. Bake 45-55 mins at 350°F.",
      "Pour glaze over hot bread."
    ],
    temp: "350°F",
    cookTime: "55 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pumpkin Applesauce Bread",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "3.5 cups Flour",
      "1 cup Pumpkin",
      "1 cup Applesauce",
      "2/3 cup Oil",
      "2 2/3 cups Sugar"
    ],
    instructions: [
      "Mix wet and dry.",
      "Bake 1.25 hours at 350°F."
    ],
    temp: "350°F",
    cookTime: "1.25 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Quaker Oats Orange Muffins",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1 cup Oats",
      "1/2 cup Orange Juice",
      "1/2 cup Boiling water",
      "Raisins"
    ],
    instructions: [
      "Soak oats.",
      "Add remaining ingredients.",
      "Bake 20 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Simple Homemade Roti / Chapati",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "2 cups Atta (Whole wheat flour)",
      "1 cup Warm water"
    ],
    instructions: [
      "Make dough. Rest 20 mins.",
      "Roll circles.",
      "Cook on hot skillet."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Selma's Tea Biscuits",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "2 cups flour",
      "Cream of tartar",
      "1/2 cup Oil",
      "2/3 cup Milk",
      "1 Egg"
    ],
    instructions: [
      "Mix wet into dry.",
      "Roll and cut.",
      "Bake 10-15 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Waffles",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "2.25 cups Flour",
      "3 Eggs",
      "2.25 cup Milk",
      "2 Tbsp Oil"
    ],
    instructions: [
      "Whisk all.",
      "Cook in waffle iron."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Whole Wheat Bread (Large Batch)",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "18-20 cups Flour (Half WW/Half White)",
      "Yeast",
      "Water",
      "Shortening/Sugar"
    ],
    instructions: [
      "Standard bread method.",
      "Bake 30-35 mins at 400°F."
    ],
    temp: "400°F",
    cookTime: "35 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Whole Wheat Bread with Honey",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "Honey",
      "White & Whole Wheat Flour",
      "Yeast",
      "Water"
    ],
    instructions: [
      "Proof yeast with honey.",
      "Make sponge.",
      "Knead dough. Rise.",
      "Bake 30-40 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Zucchini Coconut Cranberry Loaf",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1 cup Grated Zucchini",
      "Cranberries, Coconut, Pecans",
      "Spice cake batter base"
    ],
    instructions: [
      "Mix batter.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Zucchini Raisin Bread",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "3 Eggs",
      "2 cups Sugar",
      "1 cup Oil",
      "1.25 cup Zucchini",
      "Raisins"
    ],
    instructions: [
      "Mix batter.",
      "Bake 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Quick French Omelette",
    category: Category.MAIN_DISHES,
    ingredients: [
      "2-3 large Eggs",
      "1 tsp Water (or Tomato Juice)",
      "Salt & Pepper",
      "1-2 tsp Butter",
      "Optional: Herbs, Cheese"
    ],
    instructions: [
      "Whisk eggs with liquid and seasonings.",
      "Heat butter in non-stick skillet.",
      "Pour eggs in. Cook quickly, pushing edges to center.",
      "Fold and serve immediately."
    ],
    prepTime: "2 mins",
    cookTime: "2 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },

  // --- DESSERTS & BAKED GOODS ---
  {
    id: id(),
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
    id: id(),
    title: "Apple Fritters",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Flour",
      "2 Tbsp Baking Powder",
      "2 Eggs",
      "1/3 cup Milk",
      "5-6 Apples, chopped",
      "Oil for frying"
    ],
    instructions: [
      "Mix batter ingredients.",
      "Fold in chopped apples.",
      "Drop by spoonfuls into hot oil. Fry until golden.",
      "Coat with sugar if desired."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Apple Pie Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Pastry: 8 oz cream cheese, 1 cup butter, 3 cups flour",
      "Filling: 10 Granny Smith apples, sliced, sugar, cinnamon",
      "Glaze: Icing sugar, water"
    ],
    instructions: [
      "Make dough. Roll half for bottom of 10x15 pan.",
      "Top with apples mixed with sugar/cinnamon.",
      "Top with remaining crust.",
      "Bake 35-45 mins at 375°F. Glaze."
    ],
    temp: "375°F",
    cookTime: "45 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Aunt Jennie's Pudding",
    category: Category.DESSERTS,
    ingredients: [
      "2.5 cups flour",
      "3/4 cup shortening",
      "1 cup molasses",
      "1 cup milk",
      "Raisins, Currants, Spices"
    ],
    instructions: [
      "Mix batter.",
      "Pour into greased mold (juice can).",
      "Steam for 3 hours."
    ],
    cookTime: "3 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Baked Toblerone Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "Crust: Chocolate crumbs, butter",
      "Filling: 3 pkgs cream cheese, sugar, eggs, sour cream, melted Toblerone"
    ],
    instructions: [
      "Bake crust 10 mins.",
      "Beat filling ingredients. Pour over crust.",
      "Bake in water bath 1 hour at 325°F."
    ],
    temp: "325°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Berry Good Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Base: 3 Tbsp Butter, 1/3 cup Sugar, 2 Yolks, 2/3 cup Flour",
      "Topping: 2 Egg Whites, 4-6 Tbsp Sugar, Berries"
    ],
    instructions: [
      "Bake base 18-20 mins at 350°F.",
      "Beat whites with sugar for meringue. Fold in berries.",
      "Spread on base. Bake 20-30 mins at 300°F."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Black & White Brownies",
    category: Category.DESSERTS,
    ingredients: [
      "1/3 cup Butter",
      "1 cup Sugar",
      "2 Eggs",
      "1 cup Flour",
      "2 oz Chocolate (melted)"
    ],
    instructions: [
      "Make basic batter.",
      "Divide in half. Add chocolate to one part.",
      "Marble in pan.",
      "Bake at 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Blueberry Kuchen",
    category: Category.DESSERTS,
    ingredients: [
      "Base: 1.5 cups Flour, Sugar, Butter, 2 Yolks",
      "Topping: 2 Egg Whites, Sugar, 2 cups Blueberries"
    ],
    instructions: [
      "Pat base into pan. Bake 15 mins at 350°F.",
      "Top with meringue/berry mix.",
      "Bake 30 mins at 325°F."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Butterscotch Cheesecake Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Base: Butterscotch chips, margarine, graham crumbs",
      "Filling: Cream cheese, condensed milk, egg"
    ],
    instructions: [
      "Press crumb mix in pan.",
      "Pour cheese filling over.",
      "Bake 30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Butterscotch Pie (Filling)",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Brown Sugar",
      "2 Tbsp Cornstarch",
      "1 cup Milk",
      "2 Egg Yolks",
      "1 Tbsp Butter",
      "1 tsp Vanilla"
    ],
    instructions: [
      "Combine sugar and cornstarch.",
      "Stir in milk and egg yolks.",
      "Cook over medium heat until thickened.",
      "Remove from heat; add butter and vanilla. Pour into baked pie shell."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Carrot Cake",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Sugar",
      "1.5 cups Oil",
      "4 Eggs",
      "2 cups Flour",
      "2 cups Grated Carrots",
      "Pineapple, Walnuts, Spices"
    ],
    instructions: [
      "Mix wet ingredients.",
      "Stir in dry and add-ins.",
      "Bake 35-40 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chipit Bars",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Graham crumbs",
      "1 cup Coconut",
      "1 cup Choc chips",
      "1 can Condensed milk"
    ],
    instructions: [
      "Mix all ingredients.",
      "Press in pan.",
      "Bake 25 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "25 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chocolate Chip Cookies (Donnetta's)",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "3/4 cup Brown Sugar",
      "3/4 cup White Sugar",
      "2 Eggs",
      "2.25 cups Flour",
      "Choc chips"
    ],
    instructions: [
      "Cream butter/sugars. Add eggs.",
      "Mix in flour/soda. Stir in chips.",
      "Bake 8-10 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chocolate Chip Cookies (Version 2)",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Margarine",
      "3/4 cup Brown Sugar",
      "2/3 cup White Sugar",
      "2 Eggs",
      "2.25 cups Flour",
      "Choc chips"
    ],
    instructions: [
      "Cream margarine/sugars. Add eggs.",
      "Mix in flour/soda. Stir in chips.",
      "Bake 10-12 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "12 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chocolate Chip Cookies (Version 3)",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "3/4 cup Brown Sugar",
      "3/4 cup White Sugar",
      "2 Eggs",
      "2.25 cups Flour",
      "Choc chips"
    ],
    instructions: [
      "Cream butter/sugars. Add eggs.",
      "Mix in flour/soda. Stir in chips.",
      "Bake 10-15 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "15 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Chocolate Swirl Cheesecake Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Crust: 1 cup Flour, 1/3 cup Sugar, 1/2 cup Butter",
      "Filling: 1 lb Cream Cheese, 3/4 cup Sugar, 2 Eggs",
      "2 oz Semi-sweet Chocolate, melted"
    ],
    instructions: [
      "Bake crust 15 mins at 350°F.",
      "Beat cheese, sugar, and eggs. Pour over crust.",
      "Drizzle melted chocolate over filling and swirl with a knife.",
      "Bake 25-30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Fruit Balls",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Dates, chopped",
      "1 cup Cherries, chopped",
      "1/2 cup Sugar",
      "1 Egg, beaten",
      "2 cups Rice Krispies",
      "Coconut for rolling"
    ],
    instructions: [
      "Cook dates, cherries, sugar, and egg in a saucepan until thick (approx 10 mins).",
      "Remove from heat and stir in Rice Krispies.",
      "Form into small balls and roll in coconut."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Fruit Cake",
    category: Category.DESSERTS,
    ingredients: [
      "6 cups raisins, 6 cups currants, 4 cups dates, 4 cups cherries, 1 cup pineapple, 1 cup peel, 2 cups walnuts, 1.5 cups almonds",
      "3 cups shortening",
      "5 cups brown sugar",
      "10 eggs (separated)",
      "7 cups flour, spices, 1 cup sour milk"
    ],
    instructions: [
      "Cream fat/sugar/yolks. Add dry ingredients alternating with milk. Fold in stiff whites.",
      "Stir in fruit/nuts.",
      "Bake at 275°F for 2.5 - 3 hours."
    ],
    temp: "275°F",
    cookTime: "3 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Fruit Cake (Version 2)",
    category: Category.DESSERTS,
    ingredients: [
      "6 cups raisins, 6 cups currants, dates, cherries, pineapple, peel, nuts.",
      "3 cups shortening, 5 cups brown sugar, 10 eggs (separated), 7 cups flour, spices, 1 cup sour milk.",
      "10 egg yolks, 1 cup crushed pineapple, 1 lemon rind"
    ],
    instructions: [
      "Cream fat/sugar/yolks. Add dry ingredients alternating with milk. Fold in stiff whites.",
      "Stir in fruit/nuts.",
      "Bake at 325°F for 2.5 - 3 hours."
    ],
    temp: "325°F",
    cookTime: "3 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Pudding (Bernadine's)",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Suet",
      "1 cup Molasses",
      "1 cup Milk",
      "3 cups Flour",
      "1.5 cups Raisins",
      "Spices: Cinnamon, Cloves, Nutmeg"
    ],
    instructions: [
      "Mix suet, molasses, and milk.",
      "Stir in flour and spices, then add raisins.",
      "Pour into a greased mold.",
      "Steam for 3 hours."
    ],
    cookTime: "3 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Christmas Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Base: 1/2 cup Butter, 2 cups Graham crumbs",
      "Filling: 2 pkg Cream Cheese, Icing sugar, Cherries"
    ],
    instructions: [
      "Press crumbs in pan.",
      "Top with cheese filling and more crumbs.",
      "Bake 25 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "25 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Cinnabon Cinnamon Roll Cake",
    category: Category.DESSERTS,
    ingredients: [
      "Cake: 3 cups Flour, Sugar, Milk, Eggs",
      "Swirl: Butter, Brown Sugar, Cinnamon"
    ],
    instructions: [
      "Make batter. Pour into pan.",
      "Swirl cinnamon mix on top.",
      "Bake 30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic American Buttercream Icing",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Butter, softened",
      "3 cups Icing Sugar",
      "1 tsp Vanilla",
      "2-3 Tbsp Milk or Cream"
    ],
    instructions: [
      "Cream butter.",
      "Add sugar alternately with milk.",
      "Beat until fluffy."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic Cream Cheese Icing",
    category: Category.DESSERTS,
    ingredients: [
      "8 oz Cream Cheese, softened",
      "1/4 cup Butter, softened",
      "2 cups Icing Sugar",
      "1 tsp Vanilla"
    ],
    instructions: [
      "Beat cream cheese and butter until smooth.",
      "Gradually add icing sugar.",
      "Stir in vanilla."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic New York Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "Crust: Graham crumbs/butter",
      "Filling: 4 blocks Cream Cheese, Sugar, 4 Eggs, Sour Cream"
    ],
    instructions: [
      "Bake crust.",
      "Beat filling (don't overmix).",
      "Bake in water bath 70-90 mins at 325°F. Cool in oven."
    ],
    temp: "325°F",
    cookTime: "90 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic Pound Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "1.5 cups Sugar",
      "4 Eggs",
      "1.75 cups Flour",
      "Vanilla"
    ],
    instructions: [
      "Cream butter/sugar well. Add eggs one by one.",
      "Fold in flour.",
      "Bake 1 hour at 325°F."
    ],
    temp: "325°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic White Layer Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Butter",
      "1.5 cups Sugar",
      "2 1/4 cups Cake Flour",
      "1 cup Milk",
      "4 Egg Whites, beaten stiff",
      "Vanilla"
    ],
    instructions: [
      "Cream butter and sugar.",
      "Add flour and milk alternately.",
      "Fold in beaten egg whites.",
      "Bake in layer pans at 350°F for 25-30 mins."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Crispy Chews (Jean's)",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Brown Sugar",
      "2/3 cup Corn Syrup",
      "2/3 cup Peanut Butter",
      "Rice Krispies, Coconut"
    ],
    instructions: [
      "Heat sugar/syrup. Stir in PB.",
      "Mix in cereal. Drop onto wax paper."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Date Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Filling: Dates, water, sugar (cooked)",
      "Base: Oats, Flour, Brown Sugar, Butter"
    ],
    instructions: [
      "Press half crumb mix in pan.",
      "Spread date filling.",
      "Top with crumbs. Bake at 375°F."
    ],
    temp: "375°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Drumstick Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Base: Graham crumbs, nuts, butter, PB",
      "Filling: Cream cheese, icing sugar, PB, Cool Whip"
    ],
    instructions: [
      "Bake base 5 mins.",
      "Beat filling, fold in Cool Whip.",
      "Spread on base. Freeze."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Easter Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "2 cups Sugar",
      "4 Eggs",
      "3 cups Flour",
      "1 cup Milk",
      "Lemon Zest"
    ],
    instructions: [
      "Cream butter and sugar. Add eggs.",
      "Mix in flour and milk.",
      "Bake in a tube pan at 350°F for 1 hour."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fresh Berry Pie",
    category: Category.DESSERTS,
    ingredients: [
      "Pie Pastry",
      "4 cups Berries",
      "Sugar, Flour, Butter"
    ],
    instructions: [
      "Fill crust with berries.",
      "Bake 450°F for 15 mins, then 350°F for 50 mins."
    ],
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fruit Pie",
    category: Category.DESSERTS,
    ingredients: [
      "Pie Pastry",
      "4 cups Mixed Fruit",
      "1 cup Sugar",
      "3 Tbsp Tapioca or Flour"
    ],
    instructions: [
      "Combine fruit with sugar and thickener.",
      "Pour into pie shell. Top with crust.",
      "Bake at 425°F for 15 mins, then 350°F for 35 mins."
    ],
    cookTime: "50 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fruit Pizza",
    category: Category.DESSERTS,
    ingredients: [
      "Sugar Cookie Dough Crust",
      "Cream Cheese Filling",
      "Fresh Fruit",
      "Glaze: Juice, sugar, cornstarch"
    ],
    instructions: [
      "Bake cookie crust.",
      "Spread cheese. Arrange fruit.",
      "Glaze and chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fruit Pizza (Version 2)",
    category: Category.DESSERTS,
    ingredients: [
      "Crust: Margarine, Brown Sugar, Flour, Coconut, Oats, Egg",
      "Cream Cheese Filling",
      "Fresh Fruit",
      "Glaze"
    ],
    instructions: [
      "Bake crust at 350°F.",
      "Spread cheese. Arrange fruit.",
      "Glaze and chill."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fudge",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Sugar",
      "2/3 cup Milk",
      "2 squares Chocolate or 1/4 cup Cocoa",
      "2 Tbsp Butter",
      "1 tsp Vanilla"
    ],
    instructions: [
      "Boil sugar, milk, and chocolate to soft ball stage.",
      "Add butter and vanilla. Cool slightly.",
      "Beat until thick and creamy. Pour into pan."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fudgy Brownies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter (melted)",
      "1 cup Cocoa",
      "2 cups Sugar",
      "4 Eggs",
      "1.3 cups Flour"
    ],
    instructions: [
      "Mix melted butter/cocoa. Add sugar/eggs.",
      "Stir in flour.",
      "Bake 30 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "30 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Genoise Sponge Cake",
    category: Category.DESSERTS,
    ingredients: [
      "4 Eggs",
      "2/3 cup Sugar",
      "3/4 cup Flour",
      "1/4 cup Butter, melted"
    ],
    instructions: [
      "Whisk eggs and sugar over warm water until triple in volume.",
      "Fold in flour gently.",
      "Fold in butter.",
      "Bake 25 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "25 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Graham Wafer Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Graham Wafers",
      "Filling: Milk, Brown Sugar, Butter, Coconut, Walnuts, Cherries"
    ],
    instructions: [
      "Line pan with wafers.",
      "Boil filling. Pour over. Top with wafers.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Gumdrop Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Shortening",
      "2 cups Sugar",
      "4 Eggs",
      "4 cups Flour",
      "1 lb Gumdrops, 1 lb Raisins"
    ],
    instructions: [
      "Cream fat/sugar. Add eggs.",
      "Fold in flour-dusted candy.",
      "Bake 1.5-2 hours at 300°F."
    ],
    temp: "300°F",
    cookTime: "2 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hello Dolly Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Base: Margarine, Graham crumbs",
      "Layers: Coconut, Choc chips, Walnuts, Condensed Milk"
    ],
    instructions: [
      "Layer ingredients in pan.",
      "Pour milk over.",
      "Bake at 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Highland Cake",
    category: Category.DESSERTS,
    ingredients: [
      "Oatmeal Cake Batter",
      "Topping: Butter, Brown Sugar, Coconut"
    ],
    instructions: [
      "Bake cake 40 mins at 350°F.",
      "Add topping while warm."
    ],
    temp: "350°F",
    cookTime: "40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Homemade Ice Cream (Noreen's)",
    category: Category.DESSERTS,
    ingredients: [
      "5 Eggs",
      "1.5 cups Sugar",
      "Evap Milk",
      "Whipping Cream",
      "Vanilla"
    ],
    instructions: [
      "Cook custard base.",
      "Cool and churn."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Homemade Mars Bars Squares",
    category: Category.DESSERTS,
    ingredients: [
      "4 Mars Bars",
      "1/2 cup Butter",
      "2 cups Rice Krispies",
      "Chocolate topping"
    ],
    instructions: [
      "Melt bars/butter. Add cereal.",
      "Press in pan. Top with chocolate."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hot Molasses Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Shortening",
      "1 cup Molasses",
      "1 cup Boiling Water",
      "3 cups Flour",
      "Spices"
    ],
    instructions: [
      "Mix batter. Add boiling water last.",
      "Bake 40 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "40 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Jelly Roll (Mom's)",
    category: Category.DESSERTS,
    ingredients: [
      "4 Eggs",
      "1 cup Sugar",
      "1 cup Flour",
      "Baking powder",
      "Jam for filling"
    ],
    instructions: [
      "Beat eggs/sugar. Add flour.",
      "Bake in sheet pan 12 mins at 375°F.",
      "Roll in towel while hot. Fill."
    ],
    temp: "375°F",
    cookTime: "12 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Layered Brownie Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Baked Brownie Base",
      "Marshmallow Fluff",
      "Topping: PB, Choc Chips, Rice Krispies"
    ],
    instructions: [
      "Spread fluff on brownies.",
      "Top with crispy chocolate mix.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lemon Delight Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Crust: Flour, Butter, Pecans",
      "Filling: Cream cheese, Lemon Pie Filling"
    ],
    instructions: [
      "Bake crust 15 mins.",
      "Layer cheese mix and lemon filling.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lemon Meringue Pie",
    category: Category.DESSERTS,
    ingredients: [
      "Lemon Filling: Sugar, Cornstarch, Lemon Juice, Yolks",
      "Meringue: Whites, Sugar"
    ],
    instructions: [
      "Cook filling. Pour in shell.",
      "Top with meringue.",
      "Bake until golden."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lemonade Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Shortening",
      "1 cup Sugar",
      "2 Eggs",
      "3 cups Flour",
      "Frozen Lemonade Concentrate"
    ],
    instructions: [
      "Cream fat/sugar. Add eggs/flour/lemonade.",
      "Bake 8 mins at 400°F.",
      "Brush with lemonade/sugar."
    ],
    temp: "400°F",
    cookTime: "8 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Microwave Rice Pudding",
    category: Category.DESSERTS,
    ingredients: [
      "Cooked Rice",
      "Milk, Egg, Sugar, Raisins"
    ],
    instructions: [
      "Combine ingredients.",
      "Microwave until thick."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Microwave Super Chocolate Brownies",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Butter",
      "1 cup Sugar",
      "2 Eggs",
      "1/2 cup Flour",
      "1/3 cup Cocoa"
    ],
    instructions: [
      "Melt butter in microwave.",
      "Stir in sugar, cocoa, eggs, and flour.",
      "Pour into glass dish. Microwave on High for 5-6 minutes."
    ],
    cookTime: "6 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Molasses Cookies (Shirley MacIntosh's)",
    category: Category.DESSERTS,
    ingredients: [
      "3/4 cup Butter",
      "1 cup Brown Sugar",
      "1/4 cup Molasses",
      "2 cups Flour, Spices"
    ],
    instructions: [
      "Mix dough. Chill.",
      "Roll in sugar.",
      "Bake at 375°F."
    ],
    temp: "375°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Molasses Spice Cake",
    category: Category.DESSERTS,
    ingredients: [
      "Lard, Molasses, Eggs",
      "Flour, Spices, Raisins"
    ],
    instructions: [
      "Mix batter.",
      "Bake at 325°F."
    ],
    temp: "325°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Molasses Taffy",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Molasses",
      "1 cup Sugar",
      "1 Tbsp Vinegar",
      "1 Tbsp Butter"
    ],
    instructions: [
      "Boil ingredients to hard crack stage.",
      "Pour onto buttered pan.",
      "When cool enough to handle, pull until light in color."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Monster Peanut Butter Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "3 cups Peanut Butter",
      "6 Eggs",
      "Oats, Rice Krispies, Choc Chips"
    ],
    instructions: [
      "Mix huge batch.",
      "Bake 10 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "No-Bake Blueberry Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "Graham Crust",
      "Filling: Cream Cheese, Sugar, Cool Whip, Blueberries"
    ],
    instructions: [
      "Mix filling.",
      "Chill in crust."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "No-Bake Dream Whip Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "1 envelope Dream Whip",
      "1 pkg (8 oz) Cream Cheese",
      "1/2 cup Sugar",
      "Graham Wafer Crust"
    ],
    instructions: [
      "Whip Dream Whip according to package.",
      "Beat cream cheese and sugar; fold in whipped topping.",
      "Spoon into crust and chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "No-Bake Toblerone Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "Graham Crumb Crust",
      "2 bars Toblerone (melted)",
      "2 pkg Cream Cheese",
      "1/2 cup Sugar",
      "1 cup Whipping Cream (whipped)"
    ],
    instructions: [
      "Beat cream cheese and sugar.",
      "Add melted chocolate.",
      "Fold in whipped cream.",
      "Chill in crust."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Orange Mandarin Cake",
    category: Category.DESSERTS,
    ingredients: [
      "White Cake (crumbled)",
      "Orange Jello",
      "Mandarins",
      "Dream Whip"
    ],
    instructions: [
      "Mix Jello/Whip/Oranges.",
      "Fold in cake crumbs.",
      "Press in pan. Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Orange Pineapple Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Base: Graham crumbs and butter",
      "Filling: 1 pkg Orange Jello, 1 cup Boiling water, 1 can Crushed Pineapple, 1 cup Whipped Topping"
    ],
    instructions: [
      "Dissolve Jello in water. Add pineapple with juice. Chill until partially set.",
      "Fold in whipped topping.",
      "Pour over base and chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Peanut Butter Balls",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Peanut Butter",
      "1/2 cup Butter",
      "2 cups Icing Sugar",
      "Rice Krispies",
      "Chocolate Coating"
    ],
    instructions: [
      "Mix filling. Roll balls.",
      "Chill.",
      "Dip in chocolate."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Peanut Butter Cake",
    category: Category.DESSERTS,
    ingredients: [
      "PB Cake Batter",
      "PB Frosting"
    ],
    instructions: [
      "Bake cake at 375°F.",
      "Frost."
    ],
    temp: "375°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Peanut Butter Fudge",
    category: Category.DESSERTS,
    ingredients: [
      "Sugars, Milk, Butter",
      "Peanut Butter, Marshmallows"
    ],
    instructions: [
      "Boil sugar mix to soft ball.",
      "Beat in PB/marshmallows.",
      "Pour in pan."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Peanut Butter Rice Krispie Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Corn Syrup, Sugar, PB",
      "Rice Krispies"
    ],
    instructions: [
      "Melt syrup/PB.",
      "Mix with cereal.",
      "Press in pan."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pecan/Date Tarts",
    category: Category.DESSERTS,
    ingredients: [
      "Tart Shells",
      "Date Filling",
      "Brown Sugar Icing"
    ],
    instructions: [
      "Bake shells.",
      "Fill with dates.",
      "Top with icing."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Praline Topped Pumpkin Pie",
    category: Category.DESSERTS,
    ingredients: [
      "Pumpkin Pie",
      "Topping: Butter, Brown Sugar, Pecans"
    ],
    instructions: [
      "Bake pie.",
      "Add topping near end. Broil."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pulled Taffy",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Sugar",
      "1/2 cup Water",
      "1/4 cup Vinegar",
      "1 Tbsp Butter"
    ],
    instructions: [
      "Boil without stirring until brittle (hard crack).",
      "Pour onto buttered plate.",
      "When cool enough, pull until white."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Raisin Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "Boiled Raisins",
      "Cookie Dough"
    ],
    instructions: [
      "Mix raisins into dough.",
      "Bake at 325°F."
    ],
    temp: "325°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Raspberry Pinwheels",
    category: Category.DESSERTS,
    ingredients: [
      "Dough: Flour, Sugar, Butter",
      "Filling: Jam, Coconut"
    ],
    instructions: [
      "Roll dough. Spread filling.",
      "Roll up, slice.",
      "Bake at 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Raspberry Pinwheels (Version 2)",
    category: Category.DESSERTS,
    ingredients: [
      "Dough: 2 cups Flour, 1/2 cup Butter, Sugar, Egg",
      "Filling: 1/2 cup Jam, 1/2 cup Coconut"
    ],
    instructions: [
      "Make dough.",
      "Spread filling, roll, chill.",
      "Slice and bake 8-10 mins at 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Rhubarb Crumble",
    category: Category.DESSERTS,
    ingredients: [
      "Rhubarb",
      "Crumble: Oats, Flour, Brown Sugar, Butter"
    ],
    instructions: [
      "Layer fruit.",
      "Top with crumble.",
      "Bake 35 mins at 325°F."
    ],
    temp: "325°F",
    cookTime: "35 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Rice Krispies Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Butter",
      "Marshmallows",
      "Rice Krispies"
    ],
    instructions: [
      "Melt butter/marshmallows.",
      "Stir in cereal.",
      "Press in pan."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Seven Minute Frosting",
    category: Category.DESSERTS,
    ingredients: [
      "2 Egg Whites",
      "1.5 cups Sugar",
      "1.5 tsp Corn Syrup",
      "5 Tbsp Water"
    ],
    instructions: [
      "Combine all in top of double boiler.",
      "Beat constantly over boiling water for 7 minutes or until stiff peaks form.",
      "Remove from heat and add vanilla."
    ],
    cookTime: "7 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Shortbread Cookies (Dee's)",
    category: Category.DESSERTS,
    ingredients: [
      "Butter",
      "Cornstarch, Icing Sugar, Flour"
    ],
    instructions: [
      "Whip butter. Add dry.",
      "Bake 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Skor Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Ritz Crackers",
      "Condensed Milk",
      "Skor Bits"
    ],
    instructions: [
      "Mix and bake 20 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Skor Toffee Chocolate Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Graham Crackers",
      "1 cup Butter",
      "1 cup Brown Sugar",
      "1 cup Chocolate Chips"
    ],
    instructions: [
      "Line pan with crackers.",
      "Boil butter and sugar; pour over crackers.",
      "Bake 5 mins at 350°F. Sprinkle with chips."
    ],
    temp: "350°F",
    cookTime: "5 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Strawberry Squares",
    category: Category.DESSERTS,
    ingredients: [
      "Crust",
      "Strawberry Jello",
      "Frozen Strawberries",
      "Dream Whip"
    ],
    instructions: [
      "Bake crust.",
      "Mix filling. Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Ultimate Chocolate Cake",
    category: Category.DESSERTS,
    ingredients: [
      "Cocoa, Sugar, Flour",
      "Boiling Water"
    ],
    instructions: [
      "Mix batter (thin).",
      "Bake at 350°F."
    ],
    temp: "350°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "War Cake",
    category: Category.DESSERTS,
    ingredients: [
      "Boiled Raisins, Spices",
      "Flour, Soda"
    ],
    instructions: [
      "Boil raisin mix. Cool.",
      "Add flour. Bake."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Werther's Caramel Bars",
    category: Category.DESSERTS,
    ingredients: [
      "Shortbread Crust",
      "Melted Werther's Caramels"
    ],
    instructions: [
      "Bake crust.",
      "Pour caramel over."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Whipped Shortbread (Bernice's)",
    category: Category.DESSERTS,
    ingredients: [
      "Soft Margarine",
      "Cornstarch, Flour, Icing Sugar"
    ],
    instructions: [
      "Whip margarine well.",
      "Add dry.",
      "Bake 325°F."
    ],
    temp: "325°F",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Buttery Shortbread Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "3/4 cup butter, softened",
      "1/2 cup cornstarch",
      "1/2 cup icing sugar",
      "1 cup flour"
    ],
    instructions: [
      "Whip butter.",
      "Add dry ingredients.",
      "Bake at 350°F for 10 mins."
    ],
    temp: "350°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Chewy Oatmeal Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Butter",
      "Sugars, Egg",
      "1 cup Oats",
      "Raisins, Choc Chips"
    ],
    instructions: [
      "Cream butter/sugars.",
      "Add dry/oats.",
      "Bake 8-10 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Classic Chocolate Chip Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "1 cup Brown Sugar",
      "1/2 cup White Sugar",
      "2 Eggs",
      "2 cups Flour",
      "1.5 cups Chocolate Chips"
    ],
    instructions: [
      "Cream butter and sugars. Beat in eggs.",
      "Mix in flour and soda.",
      "Stir in chips.",
      "Bake 10-12 mins at 350°F."
    ],
    temp: "350°F",
    cookTime: "12 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Classic Sugar Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter",
      "1.5 cups Sugar",
      "Egg, Vanilla",
      "2.75 cups Flour"
    ],
    instructions: [
      "Cream butter/sugar.",
      "Roll in sugar.",
      "Bake 8-10 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Peanut Butter Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Shortening",
      "1/2 cup PB",
      "Sugars, Egg",
      "Flour"
    ],
    instructions: [
      "Cream fats/sugars.",
      "Press with fork.",
      "Bake 10-12 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "12 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Perfect Peanut Butter Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Peanut Butter",
      "1 cup Sugar",
      "1 Egg"
    ],
    instructions: [
      "Mix ingredients until smooth.",
      "Roll into balls and press with a fork.",
      "Bake at 350°F for 8-10 minutes."
    ],
    temp: "350°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wade's Spicy Molasses Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "3/4 cup Butter",
      "Molasses",
      "Flour, Spices"
    ],
    instructions: [
      "Mix dough.",
      "Roll in sugar.",
      "Bake 8-10 mins at 375°F."
    ],
    temp: "375°F",
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },

  // --- SAUCES & CONDIMENTS ---
  {
    id: id(),
    title: "Authentic Greek Tzatziki Sauce",
    category: Category.SAUCES,
    ingredients: [
      "Greek Yogurt",
      "Cucumber",
      "Garlic",
      "Olive Oil"
    ],
    instructions: [
      "Grate cucumber and squeeze dry.",
      "Mix all ingredients.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Big Mac Sauce",
    category: Category.SAUCES,
    ingredients: [
      "Mayo",
      "Relish",
      "Mustard",
      "Vinegar",
      "Spices"
    ],
    instructions: [
      "Whisk together.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Bread & Butter Pickles",
    category: Category.SAUCES,
    ingredients: [
      "Cucumbers",
      "Onions",
      "Syrup: Vinegar, Sugar, Spices"
    ],
    instructions: [
      "Salt veg and drain.",
      "Boil syrup.",
      "Combine and jar."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Brown Sugar Sauce",
    category: Category.SAUCES,
    ingredients: [
      "Butter",
      "Flour",
      "Brown Sugar",
      "Water",
      "Vanilla/Vinegar"
    ],
    instructions: [
      "Cook to thicken."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Classic Strawberry Jam",
    category: Category.SAUCES,
    ingredients: [
      "Strawberries",
      "Sugar",
      "Pectin",
      "Lemon Juice"
    ],
    instructions: [
      "Boil fruit/pectin.",
      "Add sugar, boil hard 1 min.",
      "Jar."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Cucumber Relish",
    category: Category.SAUCES,
    ingredients: [
      "6 Cucumbers",
      "3 Onions",
      "2 Red Peppers",
      "2 cups Vinegar",
      "2 cups Sugar",
      "Mustard Seed"
    ],
    instructions: [
      "Grind vegetables and drain liquid.",
      "Add vinegar, sugar, and spices.",
      "Simmer 20 minutes and seal in jars."
    ],
    cookTime: "20 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Donair Sauce (East Coast)",
    category: Category.SAUCES,
    ingredients: [
      "Condensed Milk",
      "Sugar",
      "Garlic Powder",
      "Vinegar"
    ],
    instructions: [
      "Mix milk/sugar/garlic.",
      "Add vinegar slowly to thicken.",
      "Chill."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fish Batter",
    category: Category.SAUCES,
    ingredients: [
      "Flour",
      "Baking Powder",
      "Egg, Milk"
    ],
    instructions: [
      "Whisk to batter.",
      "Dip fish and fry."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Fudgy Cocoa Frosting",
    category: Category.SAUCES,
    ingredients: [
      "1/2 cup Butter",
      "3/4 cup Cocoa",
      "3 cups Icing Sugar",
      "1/3 cup Milk"
    ],
    instructions: [
      "Melt butter. Stir in cocoa.",
      "Alternately add sugar and milk, beating to spreading consistency."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Garam Masala",
    category: Category.SAUCES,
    ingredients: [
      "2 Tbsp Coriander Seeds",
      "1 Tbsp Cumin Seeds",
      "1 Tbsp Cardamom",
      "1 tsp Cloves",
      "1 tsp Black Peppercorns",
      "1 Stick Cinnamon"
    ],
    instructions: [
      "Toast spices in a dry pan until fragrant.",
      "Cool and grind to a fine powder."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Green Tomato Chow",
    category: Category.SAUCES,
    ingredients: [
      "Green Tomatoes",
      "Onions",
      "Pickling Spices",
      "Vinegar/Sugar"
    ],
    instructions: [
      "Soak veg overnight.",
      "Boil syrup.",
      "Cook veg in syrup until tender."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Green Tomato Chow Chow",
    category: Category.SAUCES,
    ingredients: [
      "16 cups Green Tomatoes, chopped",
      "8 cups Onions, chopped",
      "1/2 cup Pickling Salt",
      "Syrup: 4 cups Vinegar, 5 cups White Sugar, 1/2 cup Brown Sugar, Pickling Spices"
    ],
    instructions: [
      "Salt veg and stand overnight. Drain.",
      "Boil syrup ingredients.",
      "Add veg and simmer 1-2 hours.",
      "Jar and seal."
    ],
    cookTime: "2 hours",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Hot Fudge Sauce",
    category: Category.SAUCES,
    ingredients: [
      "Corn Syrup",
      "Cocoa",
      "Butter"
    ],
    instructions: [
      "Boil syrup/cocoa.",
      "Stir in butter."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Jam Tart Pastry",
    category: Category.SAUCES,
    ingredients: [
      "2 cups Flour",
      "1/2 cup Butter",
      "1/2 cup Lard",
      "1 Egg Yolk",
      "Cold Water"
    ],
    instructions: [
      "Cut fat into flour.",
      "Mix egg yolk with water and add to flour mixture.",
      "Roll out and fill with jam."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Lebanese Garlic Sauce (Toum)",
    category: Category.SAUCES,
    ingredients: [
      "Garlic",
      "Oil",
      "Lemon",
      "Salt"
    ],
    instructions: [
      "Emulsify garlic and oil slowly in processor."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Mussel Steaming Liquid",
    category: Category.SAUCES,
    ingredients: [
      "Wine/Water",
      "Salsa",
      "Italian Dressing"
    ],
    instructions: [
      "Boil.",
      "Steam mussels in liquid."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Mussel Steaming Liquid (Version 2)",
    category: Category.SAUCES,
    ingredients: [
      "1 cup White Wine",
      "1 cup Water",
      "1/2 cup Salsa",
      "1/2 cup French Italian dressing",
      "1/2 cup Vinegar"
    ],
    instructions: [
      "Combine all liquids in a large pot.",
      "Bring to a boil.",
      "Add mussels and steam until open (5-8 mins)."
    ],
    cookTime: "10 mins",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Pumpkin Preserve",
    category: Category.SAUCES,
    ingredients: [
      "Pumpkin",
      "Sugar",
      "Lemon/Orange"
    ],
    instructions: [
      "Macerate pumpkin.",
      "Boil syrup.",
      "Cook fruit until clear."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Ripe Cucumber Pickles",
    category: Category.SAUCES,
    ingredients: [
      "Large Ripe Cucumbers",
      "Vinegar",
      "Sugar",
      "Pickling Spices"
    ],
    instructions: [
      "Peel and seed cucumbers; cut into strips.",
      "Soak in salt water overnight.",
      "Simmer in vinegar syrup until clear."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Roasted Root Veg Seasoning",
    category: Category.SAUCES,
    ingredients: [
      "Butter",
      "Seasoning Salt",
      "Onion/Garlic Salt"
    ],
    instructions: [
      "Toss veg in butter and salts.",
      "Roast."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Spaghetti Sauce",
    category: Category.SAUCES,
    ingredients: [
      "1 lb Ground Beef",
      "1 Onion, chopped",
      "1 can Tomatoes",
      "1 can Tomato Paste",
      "Basil, Oregano, Garlic"
    ],
    instructions: [
      "Brown beef and onion.",
      "Add remaining ingredients.",
      "Simmer for 1 hour."
    ],
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Steak Marinade",
    category: Category.SAUCES,
    ingredients: [
      "BBQ Sauce",
      "Soy Sauce",
      "Oil",
      "Worcestershire"
    ],
    instructions: [
      "Mix.",
      "Marinate steak 12-24 hours."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: id(),
    title: "Wanda's Sweet & Sour Sauce",
    category: Category.SAUCES,
    ingredients: [
      "Ketchup",
      "Vinegar",
      "HP Sauce",
      "Brown Sugar"
    ],
    instructions: [
      "Simmer until thickened.",
      "Use on ribs/chicken."
    ],
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
        <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 uppercase tracking-widest border-t-b border-stone-300 py-2 inline-block border-t border-b">
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
            in the passage of time. May each dish you prepare from these pages bring back the warmth of her presence,
            the comfort of her touch, and the joy of the memories we shared, preserving her legacy for generations to
            come. This book is a way to hold on to her, to keep her alive in our kitchens and in our hearts.
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-teal-800 text-white font-serif text-xl rounded-sm shadow-xl hover:bg-teal-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-teal-700/50"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center gap-3">
              <BookOpen size={24} />
              Enter Kitchen
            </span>
          </button>
        </div>

        <p className="italic text-stone-900 font-bold font-serif text-xl mt-16">
          "The secret ingredient is always love."
        </p>
      </div>
    </div>
  );
};

const PrintLayout: React.FC<{ recipes: Recipe[]; onExit: () => void }> = ({ recipes, onExit }) => (
  <div className="bg-white min-h-screen">
    <div className="fixed top-0 left-0 right-0 bg-stone-900 text-white p-4 flex justify-between items-center print:hidden z-50 shadow-lg">
      <span className="font-bold flex items-center gap-2"><Printer /> Print Mode</span>
      <div className="flex gap-4">
        <button onClick={() => window.print()} className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded font-bold">Print Now</button>
        <button onClick={onExit} className="bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded">Exit</button>
      </div>
    </div>
    
    <div className="max-w-4xl mx-auto p-8 pt-24 print:pt-0">
      <div className="text-center mb-12 border-b-4 border-double border-stone-800 pb-8">
        <h1 className="font-serif text-5xl text-stone-900 mb-2">Shirley’s Kitchen</h1>
        <p className="italic text-stone-600">The MacIntosh Family Cookbook</p>
      </div>

      {recipes.map((recipe, idx) => (
        <div key={recipe.id} className="mb-12 break-inside-avoid page-break-after-always border-b border-stone-200 pb-8 last:border-0">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="font-serif text-3xl font-bold text-stone-900">{recipe.title}</h2>
            <span className="text-sm font-bold uppercase tracking-wide text-stone-500">{recipe.category}</span>
          </div>
          
          {recipe.description && <p className="italic text-stone-600 mb-6">{recipe.description}</p>}
          
          <div className="grid grid-cols-3 gap-4 text-sm text-stone-500 mb-6 font-mono border-y border-stone-100 py-2">
             {recipe.prepTime && <div>Prep: {recipe.prepTime}</div>}
             {recipe.cookTime && <div>Cook: {recipe.cookTime}</div>}
             {recipe.temp && <div>Temp: {recipe.temp}</div>}
             {recipe.yields && <div>Yields: {recipe.yields}</div>}
             <div className="col-span-3 mt-1 text-xs">Source: {recipe.addedBy}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <h3 className="font-bold uppercase text-xs text-stone-900 mb-3">Ingredients</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
            <div className="col-span-2">
              <h3 className="font-bold uppercase text-xs text-stone-900 mb-3">Method</h3>
              <ol className="list-decimal list-inside text-sm space-y-2 text-stone-700">
                {recipe.instructions.map((inst, i) => <li key={i} className="pl-2">{inst}</li>)}
              </ol>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecipeCard: React.FC<{ recipe: Recipe; onClick: () => void; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void }> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 border border-stone-100 hover:border-sky-200 recipe-card-shadow hover:shadow-xl group h-full flex flex-col relative"
    >
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-600 to-sky-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      {recipe.imageUrl && (
        <div className="h-48 overflow-hidden relative">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        </div>
      )}

      <div className="p-7 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-sky-100/50">{recipe.category}</span>
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 z-10 ${isFavorite ? 'text-rose-600 bg-rose-50 shadow-inner scale-110' : 'text-stone-300 hover:text-rose-500 hover:bg-rose-50 hover:scale-110'}`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-stone-800 mb-3 group-hover:text-sky-700 transition-colors leading-tight">{recipe.title}</h3>
        {recipe.description && <p className="text-stone-500 text-sm italic mb-6 line-clamp-2 font-serif leading-relaxed">{recipe.description}</p>}
        
        <div className="mt-auto pt-5 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
             <span className="flex items-center gap-1.5">
               <UtensilsCrossed size={14} className="text-sky-600/60" /> {recipe.ingredients.length} ingredients
             </span>
             {recipe.cookTime && <span className="bg-stone-50 px-2 py-1 rounded text-stone-500 flex items-center gap-1"><Clock size={12}/> {recipe.cookTime}</span>}
          </div>
          
          <div className="flex items-center gap-2.5 mt-1">
             <div 
               className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-offset-2 ring-stone-50 transition-transform group-hover:scale-105"
               style={{ backgroundColor: badgeColor }}
             >
               {recipe.addedBy.charAt(0).toUpperCase()}
             </div>
             <span className="text-xs text-stone-500 font-medium">
               {recipe.addedBy === 'Nan' ? 'Original Recipe' : `Added by ${recipe.addedBy}`}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Recipe List Item Component ---
const RecipeListItem: React.FC<{ recipe: Recipe; onClick: () => void; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void }> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 flex items-center gap-4 sm:gap-6 cursor-pointer hover:bg-sky-50 transition-all border border-stone-100 hover:border-sky-200 shadow-sm hover:shadow-md group animate-fade-in relative overflow-hidden"
    >
       {/* Avatar / User Indicator */}
       <div className="flex-shrink-0 z-10" title={`Added by ${recipe.addedBy}`}>
          <div 
             className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-offset-1 ring-stone-100"
             style={{ backgroundColor: badgeColor }}
           >
             {recipe.addedBy.charAt(0).toUpperCase()}
           </div>
       </div>

       {/* Content */}
       <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
          <div className="flex items-baseline gap-3 mb-1">
             <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 truncate group-hover:text-sky-700 transition-colors">{recipe.title}</h3>
             <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100 flex-shrink-0 hidden sm:inline-block">{recipe.category}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="truncate max-w-[200px]">{recipe.description || `${recipe.ingredients.length} ingredients`}</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="hidden sm:inline text-stone-400 italic">by {recipe.addedBy}</span>
          </div>
       </div>

       {/* Meta (Time/Ingredients) - Hidden on small screens */}
       <div className="flex items-center gap-4 xl:gap-6 text-stone-400 text-xs font-medium flex-shrink-0 hidden md:flex z-10">
          {recipe.prepTime && <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Clock size={14}/> {recipe.prepTime}</span>}
          {recipe.cookTime && <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Clock size={14}/> {recipe.cookTime}</span>}
          <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><UtensilsCrossed size={14}/> {recipe.ingredients.length}</span>
       </div>

       {/* Favorite Button */}
       <button 
        onClick={onToggleFavorite}
        className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 z-20 border ${
          isFavorite 
            ? 'text-rose-600 bg-rose-50 border-rose-200 scale-110 shadow-sm' 
            : 'text-stone-300 border-transparent hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:scale-110 hover:shadow-sm'
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

// --- Category Card Component ---
const CategoryCard: React.FC<{ category: Category; count: number; onClick: () => void }> = ({ category, count, onClick }) => {
  const getIcon = (cat: Category) => {
    switch(cat) {
      case Category.APPETIZERS: return <Pizza size={32} />;
      case Category.SOUPS_SALADS: return <Soup size={32} />;
      case Category.BREADS_MUFFINS: return <Croissant size={32} />;
      case Category.MAIN_DISHES: return <UtensilsCrossed size={32} />;
      case Category.SIDE_DISHES: return <Leaf size={32} />;
      case Category.DESSERTS: return <Cake size={32} />;
      case Category.SAUCES: return <Droplet size={32} />;
      default: return <UtensilsCrossed size={32} />;
    }
  };

  const getGradient = (cat: Category) => {
    switch(cat) {
      case Category.APPETIZERS: return "from-amber-50 to-amber-100/50 hover:to-amber-100 text-amber-700";
      case Category.SOUPS_SALADS: return "from-emerald-50 to-emerald-100/50 hover:to-emerald-100 text-emerald-700";
      case Category.BREADS_MUFFINS: return "from-orange-50 to-orange-100/50 hover:to-orange-100 text-orange-700";
      case Category.MAIN_DISHES: return "from-rose-50 to-rose-100/50 hover:to-rose-100 text-rose-700";
      case Category.SIDE_DISHES: return "from-lime-50 to-lime-100/50 hover:to-lime-100 text-lime-700";
      case Category.DESSERTS: return "from-pink-50 to-pink-100/50 hover:to-pink-100 text-pink-700";
      case Category.SAUCES: return "from-sky-50 to-sky-100/50 hover:to-sky-100 text-sky-700";
      default: return "from-stone-50 to-stone-100/50 hover:to-stone-100 text-stone-700";
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`group relative p-8 h-64 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${getGradient(category)} flex flex-col items-center justify-center text-center gap-6 hover:-translate-y-2 overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
        <div className="scale-150">{getIcon(category)}</div>
      </div>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/50 relative z-10 text-current">
        {getIcon(category)}
      </div>
      
      <div className="relative z-10 text-stone-800">
        <h3 className="font-serif text-2xl font-bold mb-2 leading-tight">{category}</h3>
        <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:bg-white group-hover:text-stone-800 transition-colors">
          {count} Recipes
        </span>
      </div>
      
      <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-stone-400">
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">Browse Category <ChevronRight size={14}/></span>
      </div>
    </button>
  );
};

const DeleteConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; recipeTitle: string }> = ({ isOpen, onClose, onConfirm, recipeTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-scale-in border border-red-100">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">Delete Recipe?</h3>
          <p className="text-stone-500 mb-8">
            Are you sure you want to permanently delete <span className="font-bold text-stone-800">"{recipeTitle}"</span>? This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl text-stone-600 font-bold hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeDetail: React.FC<{ 
  recipe: Recipe; 
  onBack: () => void; 
  isFavorite: boolean; 
  onToggleFavorite: () => void; 
  onEdit: () => void;
  onDelete: () => void;
  onUpdateRecipe: (recipe: Recipe) => void;
}> = ({ recipe, onBack, isFavorite, onToggleFavorite, onEdit, onDelete, onUpdateRecipe }) => {
  const [tips, setTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [errorTips, setErrorTips] = useState<string | null>(null);
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [imageError, setImageError] = useState<string | null>(null);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  // Reset states when recipe changes
  useEffect(() => {
    setTips(null);
    setErrorTips(null);
    setLoadingTips(false);
    setImageError(null);
    setIsGeneratingImage(false);
  }, [recipe.id]);

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Check out this recipe for ${recipe.title} from Shirley's Kitchen!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      const text = `${recipe.title}\n\n${recipe.description || ''}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
      navigator.clipboard.writeText(text);
      alert('Recipe copied to clipboard!');
    }
  };

  const getGeminiTips = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setErrorTips("API Key is missing or not configured correctly.");
      return;
    }

    setLoadingTips(true);
    setErrorTips(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        You are an expert chef assisting a home cook with a treasured family recipe. 
        Recipe: ${recipe.title}
        Description: ${recipe.description || 'None'}
        Ingredients: ${recipe.ingredients.join(', ')}
        Instructions: ${recipe.instructions.join(', ')}

        Please provide 3 specific, actionable, and helpful "Chef's Tips" for making this recipe perfect. 
        Focus on technique, ingredient selection, or common pitfalls. 
        Keep the tone encouraging and warm, like a grandmother teaching her grandchild.
        Format as a simple list.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setTips(response.text || "No tips generated.");
    } catch (e) {
      console.error(e);
      setErrorTips("Sorry, the chef is busy right now. Please try again later.");
    } finally {
      setLoadingTips(false);
    }
  };

  const generateImage = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setImageError("API Key is missing or not configured correctly.");
      return;
    }

    setIsGeneratingImage(true);
    setImageError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Professional food photography of ${recipe.title}. ${recipe.description || ''}. The image should be appetizing, high resolution, with soft natural lighting and elegant plating suitable for a family cookbook.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: imageSize
          }
        },
      });

      // Find the image part in the response
      let base64Image: string | undefined;
      
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Image) {
        const imageUrl = `data:image/png;base64,${base64Image}`;
        // Update recipe with new image
        const updatedRecipe = { ...recipe, imageUrl };
        onUpdateRecipe(updatedRecipe);
      } else {
        setImageError("No image generated. Please try again.");
      }
      
    } catch (e) {
      console.error(e);
      setImageError("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[85vh] shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col relative animate-fade-in print:shadow-none print:h-auto border border-white/50 ring-1 ring-stone-200/50">
      
      {/* Print Specific Styles */}
      <style>
        {`
          @media print {
            @page { margin: 1.5cm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print-page-number::after { content: counter(page); }
          }
        `}
      </style>

      {/* Print Header */}
      <div className="hidden print:flex fixed top-0 left-0 w-full justify-between items-center p-8 bg-white z-50 border-b-2 border-stone-800">
         <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-stone-900">Shirley's Kitchen</h1>
         </div>
         <span className="text-stone-500 font-serif italic">{recipe.title}</span>
      </div>

      {/* Print Footer */}
      <div className="hidden print:flex fixed bottom-0 left-0 w-full justify-between items-center p-8 bg-white z-50 border-t border-stone-200 text-xs text-stone-500">
         <span>The MacIntosh Family Cookbook</span>
         <span className="print-page-number">Page </span>
      </div>

      <DeleteConfirmationModal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete();
        }}
        recipeTitle={recipe.title}
      />

      {/* Header Controls */}
      <div className="absolute top-4 left-4 z-20 print:hidden">
        <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all group">
          <ArrowLeft size={24} className="text-stone-600 group-hover:text-stone-900" />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-20 flex gap-2 print:hidden">
        <button onClick={onEdit} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Edit Recipe">
          <Edit2 size={24} />
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-red-50 hover:text-red-500 hover:scale-105 transition-all text-stone-600" title="Delete Recipe">
          <Trash2 size={24} />
        </button>
        <button onClick={handleShare} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Share Recipe">
          <Share2 size={24} />
        </button>
        <button onClick={() => window.print()} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Print Recipe">
          <Printer size={24} />
        </button>
        <button 
          onClick={onToggleFavorite}
          className={`p-2.5 rounded-full shadow-lg border border-white/50 backdrop-blur-md transition-all hover:scale-105 bg-white/80 hover:bg-white ${isFavorite ? 'text-rose-500' : 'text-stone-400 hover:text-rose-400'}`}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Hero Section */}
      <div className={`bg-sky-50 text-center relative overflow-hidden print:bg-white print:p-0 print:border-b-2 print:border-black print:mb-8 transition-all duration-500 print:mt-16 ${recipe.imageUrl ? 'h-[400px] md:h-[500px]' : 'p-8 md:p-16'}`}>
        {recipe.imageUrl ? (
           <div className="absolute inset-0 z-0">
             <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
           </div>
        ) : (
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        )}
        
        <div className={`relative z-10 flex flex-col items-center justify-center h-full ${recipe.imageUrl ? 'text-white justify-end pb-12' : 'text-stone-800'}`}>
          <span className={`inline-block px-4 py-1.5 rounded-full border font-serif italic text-sm md:text-base mb-4 backdrop-blur-sm shadow-sm print:hidden ${recipe.imageUrl ? 'bg-black/30 border-white/20 text-white' : 'border-sky-200/60 text-sky-700 bg-white/60'}`}>
            {recipe.category}
          </span>
          <h2 className={`font-serif text-4xl md:text-6xl font-bold mb-4 print:text-black drop-shadow-sm max-w-4xl leading-tight ${recipe.imageUrl ? 'text-white text-shadow-lg' : 'text-stone-800'}`}>{recipe.title}</h2>
          {recipe.description && <p className={`text-lg md:text-xl italic font-serif max-w-2xl mx-auto leading-relaxed print:text-stone-600 ${recipe.imageUrl ? 'text-stone-200' : 'text-stone-500'}`}>"{recipe.description}"</p>}
          
          {/* Metadata Badges */}
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm font-light print:text-stone-800 ${recipe.imageUrl ? 'text-white' : 'text-stone-600'}`}>
             {recipe.prepTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Prep</span>
                 <span className="font-medium">{recipe.prepTime}</span>
               </div>
             )}
             {recipe.cookTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Cook</span>
                 <span className="font-medium">{recipe.cookTime}</span>
               </div>
             )}
             {recipe.temp && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Temp</span>
                 <span className="font-medium">{recipe.temp}</span>
               </div>
             )}
             {recipe.yields && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Yields</span>
                 <span className="font-medium">{recipe.yields}</span>
               </div>
             )}
          </div>

          {/* Added By Badge */}
          <div className={`mt-8 pt-6 border-t flex justify-center items-center gap-3 print:border-stone-200 ${recipe.imageUrl ? 'border-white/20' : 'border-stone-200/60'}`}>
            <span className={`text-xs uppercase tracking-widest font-bold ${recipe.imageUrl ? 'text-stone-300' : 'text-stone-400'}`}>Recipe Source</span>
            <span className={`pl-2 pr-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm border print:bg-transparent print:text-black print:border print:border-black ${recipe.imageUrl ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-stone-100 text-stone-600'}`}>
               <div 
                 className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                 style={{ backgroundColor: badgeColor }}
               >
                 {recipe.addedBy.charAt(0).toUpperCase()}
               </div>
               {recipe.addedBy}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 print:block print:p-0 bg-white print:mb-16">
        {/* Ingredients Column */}
        <div className="md:col-span-4 border-r-0 md:border-r border-stone-100 pr-0 md:pr-8 print:border-0 print:mb-8">
          <h3 className="font-serif text-2xl text-stone-800 border-b-2 border-sky-100 pb-3 mb-6 flex items-center gap-3 print:border-black">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div> Ingredients
          </h3>
          <ul className="space-y-4 text-stone-600 print:space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-4 items-start group p-2 rounded-lg hover:bg-sky-50 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-200 mt-2.5 group-hover:bg-sky-500 transition-colors flex-shrink-0 print:bg-black"></div>
                <span className="leading-relaxed font-medium text-stone-700">{ing}</span>
              </li>
            ))}
          </ul>

          {/* Image Generation Controls (Desktop) - Hidden in Print */}
          <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100 print:hidden">
            <h4 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-sky-600" />
              {recipe.imageUrl ? "Update Photo" : "Generate Photo"}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-200">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${imageSize === size ? 'bg-sky-100 text-sky-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={generateImage}
                disabled={isGeneratingImage}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isGeneratingImage ? 'bg-stone-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 hover:shadow-sky-200'}`}
              >
                {isGeneratingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <ChefHat size={16} />
                    {recipe.imageUrl ? "Regenerate Photo" : "Create Photo"}
                  </>
                )}
              </button>
              {imageError && <p className="text-xs text-rose-500 mt-2 text-center">{imageError}</p>}
              <p className="text-[10px] text-stone-400 text-center mt-1">Powered by Gemini 3 Pro</p>
            </div>
          </div>

        </div>

        {/* Instructions Column */}
        <div className="md:col-span-8">
          <div className="flex justify-between items-center border-b-2 border-sky-100 pb-3 mb-8 print:border-black">
             <h3 className="font-serif text-2xl text-stone-800 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-sky-500"></div> Method
             </h3>
          </div>
          
          <ol className="space-y-8 text-stone-600 print:space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-6 group">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-50 border border-stone-100 text-sky-700 font-serif font-bold text-xl flex items-center justify-center shadow-sm group-hover:bg-sky-50 group-hover:text-sky-800 group-hover:scale-110 transition-all print:bg-transparent print:border print:border-black print:text-black print:w-8 print:h-8 print:text-sm">
                  {i + 1}
                </span>
                <p className="mt-1 leading-relaxed text-lg text-stone-700 print:text-base">{step}</p>
              </li>
            ))}
          </ol>

          {/* Gemini AI Tips Section - Hidden on Print */}
          <div className="mt-16 bg-gradient-to-br from-sky-50/80 to-white rounded-3xl p-8 border border-sky-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] print:hidden relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-sky-900 pointer-events-none">
                <ChefHat size={150} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-sky-100/50 p-3 rounded-2xl text-sky-800 shadow-sm backdrop-blur-sm">
                    <ChefHat size={28} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-stone-800 font-bold">Nan's Digital Kitchen Assistant</h4>
                    <p className="text-xs text-sky-600 uppercase tracking-wide font-bold">Powered by Gemini AI</p>
                  </div>
                </div>
                
                {!tips && !loadingTips && (
                  <div className="text-left">
                      <p className="text-stone-600 mb-8 text-base leading-relaxed max-w-2xl">
                        Want to make this recipe even better? I can suggest substitutions, serving ideas, or technique tips specifically for this dish.
                      </p>
                      <button 
                        onClick={getGeminiTips}
                        className="bg-white border border-sky-200 text-sky-800 px-8 py-4 rounded-xl hover:bg-sky-600 hover:text-white transition-all shadow-sm hover:shadow-lg font-medium flex items-center gap-3 group"
                      >
                        <span className="font-bold tracking-wide">Reveal Chef's Tips</span>
                        <ChefHat size={18} className="group-hover:rotate-12 transition-transform" />
                      </button>
                      {errorTips && <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded border border-red-100">{errorTips}</p>}
                  </div>
                )}

                {loadingTips && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-100 border-t-sky-600 mb-6"></div>
                    <p className="text-stone-500 font-serif italic text-lg animate-pulse">Consulting the cookbook...</p>
                  </div>
                )}

                {tips && (
                  <div className="prose prose-stone text-stone-700 bg-white/80 p-8 rounded-2xl border border-sky-100/50 backdrop-blur-sm shadow-sm">
                      <div className="whitespace-pre-line leading-relaxed italic font-serif text-lg">{tips}</div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicListInput: React.FC<{ items: string[]; onChange: (items: string[]) => void; placeholder: string; label: string }> = ({ items, onChange, placeholder, label }) => {
  const [current, setCurrent] = useState('');

  const add = () => {
    if (!current.trim()) return;
    onChange([...items, current.trim()]);
    setCurrent('');
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider">{label}</label>
      <div className="flex gap-2">
        <input 
          value={current} 
          onChange={e => setCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-stone-50 focus:bg-white transition-all"
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-3 rounded-xl transition-colors shadow-sm">
          <PlusCircle size={20} />
        </button>
      </div>
      <ul className="space-y-2 mt-3 max-h-48 overflow-y-auto custom-scrollbar p-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-stone-100 shadow-sm group animate-fade-in">
            <span className="flex-1 text-sm text-stone-700 font-medium">{item}</span>
            <button type="button" onClick={() => remove(idx)} className="text-stone-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {items.length === 0 && <li className="text-xs text-stone-400 italic pl-2">No items added yet.</li>}
      </ul>
    </div>
  );
};

const RecipeModal: React.FC<{ onClose: () => void; onSave: (recipe: Recipe) => void; initialData?: Recipe }> = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<Category>(initialData?.category || Category.MAIN_DISHES);
  const [description, setDescription] = useState(initialData?.description || '');
  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions || []);
  const [addedBy, setAddedBy] = useState(initialData?.addedBy || '');
  const [temp, setTemp] = useState(initialData?.temp || '');
  const [cookTime, setCookTime] = useState(initialData?.cookTime || '');
  const [userColor, setUserColor] = useState(initialData?.userColor || '');
  const [yields, setYields] = useState(initialData?.yields || '');
  const [prepTime, setPrepTime] = useState(initialData?.prepTime || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  // Pre-select color based on name if editing or if user typed name
  useEffect(() => {
      if(initialData?.addedBy && !userColor) {
          setUserColor(getAvatarColor(initialData.addedBy, initialData.userColor));
      }
  }, []);

  const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newName = e.target.value;
      setAddedBy(newName);
      // Automatically update color for preset owners
      if (OWNER_COLORS[newName]) {
        setUserColor(OWNER_COLORS[newName]);
      } else {
        // Fallback or keep existing
        setUserColor(getAvatarColor(newName));
      }
  };

  const handleColorSelect = (color: string) => {
      setUserColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !addedBy || ingredients.length === 0 || instructions.length === 0) {
      alert("Please fill in all required fields and add at least one ingredient and instruction.");
      return;
    }

    const newRecipe: Recipe = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title,
      category,
      description,
      ingredients,
      instructions,
      addedBy,
      temp: temp || undefined,
      cookTime: cookTime || undefined,
      prepTime: prepTime || undefined,
      yields: yields || undefined,
      userColor: userColor || getAvatarColor(addedBy),
      timestamp: initialData?.timestamp || Date.now(),
      imageUrl: imageUrl || undefined
    };
    onSave(newRecipe);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in ring-1 ring-white/50">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="font-serif text-3xl text-stone-800">{initialData ? 'Edit Recipe' : 'Contribute a Recipe'}</h2>
            <p className="text-sm text-stone-500 mt-1">{initialData ? 'Update details or correct information.' : 'Share your family favorite with everyone.'}</p>
          </div>
          <button onClick={onClose} className="bg-stone-50 p-3 rounded-full hover:bg-stone-100 transition-colors shadow-sm"><X className="text-stone-600" size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-stone-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Title <span className="text-rose-500">*</span></label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm" placeholder="e.g. Aunt Jean's Brownies" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Category</label>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full border border-stone-200 rounded-xl p-3.5 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer shadow-sm appearance-none">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-4 top-4 pointer-events-none text-stone-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Description / Memories</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm" rows={3} placeholder="A short description or memory about this dish..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Prep Time</label>
              <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 15 mins" />
            </div>
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Cook Time</label>
              <input value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 45 mins" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Oven Temp</label>
              <input value={temp} onChange={e => setTemp(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 350°F" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Yields</label>
              <input value={yields} onChange={e => setYields(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 12 servings" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Owner <span className="text-rose-500">*</span></label>
              <div className="relative">
                <select 
                  required 
                  value={addedBy} 
                  onChange={handleOwnerChange} 
                  className="w-full border border-stone-200 rounded-xl p-3.5 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer shadow-sm appearance-none"
                >
                  <option value="" disabled>Select Family Member</option>
                  {FAMILY_MEMBERS.map(member => <option key={member} value={member}>{member}</option>)}
                </select>
                <div className="absolute right-4 top-4 pointer-events-none text-stone-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-4 flex items-center gap-2 tracking-wider"><Palette size={14}/> Owner Avatar Color</label>
              <div className="flex gap-4 flex-wrap">
                {AVATAR_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-full shadow-sm transition-all hover:scale-110 hover:shadow-md ${userColor === color ? 'ring-4 ring-offset-2 ring-stone-200 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-stone-400 mt-2 italic">Preset colors are applied automatically for family members.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicListInput 
              label="Ingredients" 
              placeholder="Add an ingredient (e.g. 1 cup flour) and press Enter" 
              items={ingredients} 
              onChange={setIngredients} 
            />
            <DynamicListInput 
              label="Instructions" 
              placeholder="Add a step and press Enter" 
              items={instructions} 
              onChange={setInstructions} 
            />
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-end gap-4 sticky bottom-0 bg-stone-50/95 backdrop-blur p-4 -mx-8 -mb-8 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-stone-600 font-medium hover:bg-stone-200 transition-colors">Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-xl bg-sky-700 text-white font-medium hover:bg-sky-800 shadow-lg hover:shadow-sky-900/20 transition-all flex items-center gap-2">
              <Check size={18} /> {initialData ? 'Save Changes' : 'Save to Cookbook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'categories' | 'list' | 'detail'>('intro');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isPrinting, setIsPrinting] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | 'Favorites'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  
  const [mobileView, setMobileView] = useState<'categories' | 'recipes'>('categories');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize data on mount
  useEffect(() => {
    // Load recipes
    const storedRecipes = localStorage.getItem('shirleys_kitchen_recipes');
    if (storedRecipes) {
      const parsedStored: Recipe[] = JSON.parse(storedRecipes);
      const storedMap = new Map(parsedStored.map(r => [r.id, r]));
      
      const mergedRecipes = INITIAL_RECIPES.map(r => {
          if (storedMap.has(r.id)) {
              const stored = storedMap.get(r.id);
              storedMap.delete(r.id); 
              return stored!;
          }
          return r;
      });
      
      setRecipes([...mergedRecipes, ...Array.from(storedMap.values())]);
    } else {
      setRecipes(INITIAL_RECIPES);
    }

    // Load favorites
    const storedFavs = localStorage.getItem('shirleys_kitchen_favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);
  
  // Check if mobile on initial load to set correct view
  useEffect(() => {
      if (window.innerWidth < 768) {
          setMobileView('categories');
      } else {
          setMobileView('recipes'); // Desktop default
      }
  }, [view]); // Reset when changing main view

  // Persist recipes whenever they change
  useEffect(() => {
     if (recipes.length > 0) {
         localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(recipes));
     }
  }, [recipes]);

  const toggleFavorite = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(recipeId)) {
      newFavs = favorites.filter(id => id !== recipeId);
    } else {
      newFavs = [...favorites, recipeId];
    }
    setFavorites(newFavs);
    localStorage.setItem('shirleys_kitchen_favorites', JSON.stringify(newFavs));
  };

  const handleStart = () => {
    setView('categories');
    window.scrollTo(0,0);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo(0,0);
    setIsSearchFocused(false);
    setSearchTerm('');
    setActiveSuggestion(-1);
  };
  
  const handleCategorySelect = (cat: Category | 'All' | 'Favorites') => {
      setSelectedCategory(cat);
      setMobileMenuOpen(false);
      setView('list'); // Ensure we switch to list view
  }

  const handleAddRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setShowAddModal(false);
    setSelectedCategory(newRecipe.category);
    setView('list');
    setSearchTerm('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    const updatedList = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    setRecipes(updatedList);
    setSelectedRecipe(updatedRecipe);
    setEditingRecipe(null);
    setShowAddModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  }
  
  const handleDeleteRecipe = () => {
    if (selectedRecipe) {
      const updatedList = recipes.filter(r => r.id !== selectedRecipe.id);
      setRecipes(updatedList);
      setSelectedRecipe(null);
      setView('list');
      setShowSuccessToast(true); // Reusing success toast for deletion confirmation visually
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  }

  const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      setActiveSuggestion(-1);
      // Automatically switch to list view if searching from categories view
      if (view === 'categories' && value.trim().length > 0) {
          setView('list');
          setSelectedCategory('All');
      }
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            r.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
      
      let matchesCategory = true;
      if (selectedCategory === 'Favorites') {
        matchesCategory = favorites.includes(r.id);
      } else if (selectedCategory !== 'All') {
        matchesCategory = r.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory, favorites]);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return recipes
      .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [recipes, searchTerm]);

  // Handle keyboard navigation for search
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
      if (!isSearchFocused || searchSuggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestion(prev => (prev + 1) % searchSuggestions.length);
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestion(prev => (prev - 1 + searchSuggestions.length) % searchSuggestions.length);
      } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeSuggestion >= 0 && activeSuggestion < searchSuggestions.length) {
              handleRecipeClick(searchSuggestions[activeSuggestion]);
              searchInputRef.current?.blur();
          }
      } else if (e.key === 'Escape') {
          setIsSearchFocused(false);
          setActiveSuggestion(-1);
          searchInputRef.current?.blur();
      }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-sky-100 selection:text-sky-900">
      {/* Print View */}
      {isPrinting && <PrintLayout recipes={filteredRecipes} onExit={() => setIsPrinting(false)} />}

      {/* Intro View */}
      {view === 'intro' && !isPrinting && <Intro onStart={handleStart} />}

      {/* Main App View */}
      {view !== 'intro' && !isPrinting && (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:flex w-64 flex-col bg-stone-900 text-stone-300 border-r border-stone-800 z-20 shadow-xl">
             {/* Logo/Header */}
             <div className="p-6 border-b border-stone-800">
                <h1 className="font-serif text-2xl text-stone-100 mb-1">Shirley’s Kitchen</h1>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Family Cookbook</p>
             </div>

             {/* Navigation */}
             <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                <button 
                  onClick={() => { setView('categories'); setSelectedCategory('All'); setSearchTerm(''); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'categories' ? 'bg-sky-900/50 text-white shadow-inner border border-sky-800/50' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <LayoutGrid size={18} />
                  <span className="font-medium">Categories</span>
                </button>
                
                <button 
                  onClick={() => { setView('list'); setSelectedCategory('All'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'list' && selectedCategory === 'All' ? 'bg-stone-800 text-white shadow-inner' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <BookOpen size={18} />
                  <span className="font-medium">All Recipes</span>
                </button>
                
                <button 
                  onClick={() => { setView('list'); setSelectedCategory('Favorites'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === 'Favorites' ? 'bg-rose-900/30 text-rose-100 shadow-inner border border-rose-900/50' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <Heart size={18} className={selectedCategory === 'Favorites' ? 'fill-current' : ''} />
                  <span className="font-medium">Favorites</span>
                </button>

                <div className="pt-6 mt-6 border-t border-stone-800">
                  <h3 className="px-4 text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">Categories</h3>
                  {Object.values(Category).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${selectedCategory === cat && view === 'list' ? 'bg-stone-800 text-sky-400' : 'hover:bg-stone-800/50 hover:text-stone-200'}`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
             </nav>
             
             {/* Footer */}
             <div className="p-4 border-t border-stone-800 bg-stone-950/50 text-xs text-stone-600 text-center">
                <p>&copy; 2024 MacIntosh Family</p>
             </div>
          </aside>

          {/* Mobile Header & Content Wrapper */}
          <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-stone-50">
             {/* Top Bar */}
             <header className="bg-white border-b border-stone-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 z-10 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-4 flex-1">
                   <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg">
                      <Menu size={24} />
                   </button>
                   
                   {/* Search Bar */}
                   <div className="relative w-full max-w-xl group">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${isSearchFocused ? 'text-sky-600' : 'text-stone-400'}`}>
                         <Search size={18} />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search recipes, ingredients..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-transparent rounded-xl focus:bg-white focus:border-sky-300 focus:ring-4 focus:ring-sky-100 outline-none transition-all placeholder:text-stone-400 text-sm md:text-base"
                      />
                      
                      {/* Search Suggestions Dropdown */}
                      {isSearchFocused && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 overflow-hidden animate-scale-in">
                           <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-stone-400">Suggestions</div>
                           {searchSuggestions.map((suggestion, idx) => (
                             <button
                               key={suggestion.id}
                               onMouseDown={() => handleRecipeClick(suggestion)}
                               className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-sky-50 transition-colors ${activeSuggestion === idx ? 'bg-sky-50 text-sky-700' : 'text-stone-600'}`}
                             >
                               <Search size={14} className="opacity-50" />
                               <span className="truncate font-medium">{suggestion.title}</span>
                             </button>
                           ))}
                        </div>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 pl-4">
                   <button 
                     onClick={() => setShowAddModal(true)}
                     className="bg-stone-900 hover:bg-stone-800 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                   >
                     <Plus size={20} />
                     <span className="hidden md:inline font-medium">Add Recipe</span>
                   </button>
                </div>
             </header>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 scroll-smooth relative">
                
                {/* Categories Dashboard View */}
                {view === 'categories' && (
                  <div className="max-w-7xl mx-auto animate-fade-in">
                    <div className="mb-10 text-center md:text-left">
                       <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3">Welcome to the Kitchen</h2>
                       <p className="text-stone-500 text-lg">Select a category to explore Nan's collection.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                       {Object.values(Category).map((cat) => {
                         const count = recipes.filter(r => r.category === cat).length;
                         return (
                           <CategoryCard 
                             key={cat} 
                             category={cat} 
                             count={count} 
                             onClick={() => { setSelectedCategory(cat); setView('list'); }} 
                           />
                         );
                       })}
                       {/* All Recipes Card */}
                       <button 
                          onClick={() => { setSelectedCategory('All'); setView('list'); }}
                          className="group relative p-8 h-64 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white flex flex-col items-center justify-center text-center gap-6 hover:-translate-y-2 overflow-hidden"
                        >
                           <div className="bg-stone-50 p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-stone-100 relative z-10 text-stone-700">
                             <BookOpen size={32} />
                           </div>
                           <div className="relative z-10 text-stone-800">
                             <h3 className="font-serif text-2xl font-bold mb-2">All Recipes</h3>
                             <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600">
                               {recipes.length} Total
                             </span>
                           </div>
                        </button>
                    </div>
                  </div>
                )}

                {/* Recipe List View */}
                {view === 'list' && (
                  <div className="max-w-7xl mx-auto animate-fade-in h-full flex flex-col">
                     <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 flex-shrink-0">
                        <div>
                           <div className="flex items-center gap-2 text-stone-400 text-sm font-medium mb-1">
                             <button onClick={() => setView('categories')} className="hover:text-stone-600 hover:underline">Categories</button>
                             <ChevronRight size={14} />
                             <span className="text-sky-700">{selectedCategory}</span>
                           </div>
                           <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
                              {selectedCategory === 'All' ? 'All Recipes' : selectedCategory}
                           </h2>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-stone-200 shadow-sm">
                           <button 
                             onClick={() => setLayoutMode('grid')}
                             className={`p-2 rounded-md transition-all ${layoutMode === 'grid' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                             title="Grid View"
                           >
                             <LayoutGrid size={20} />
                           </button>
                           <div className="w-px h-6 bg-stone-200"></div>
                           <button 
                             onClick={() => setLayoutMode('list')}
                             className={`p-2 rounded-md transition-all ${layoutMode === 'list' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                             title="List View"
                           >
                             <List size={20} />
                           </button>
                        </div>
                     </div>

                     {filteredRecipes.length === 0 ? (
                       <div className="flex-1 flex flex-col items-center justify-center text-center text-stone-400 min-h-[400px]">
                          <div className="bg-stone-100 p-6 rounded-full mb-4">
                            <Search size={48} className="opacity-50" />
                          </div>
                          <p className="text-lg font-serif italic mb-2">No recipes found</p>
                          <p className="text-sm">Try adjusting your search or category.</p>
                          {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-sky-600 hover:underline font-bold text-sm">
                              Clear Search
                            </button>
                          )}
                       </div>
                     ) : (
                       <div className={`${layoutMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3'} pb-20`}>
                          {filteredRecipes.map(recipe => (
                             layoutMode === 'grid' ? (
                               <RecipeCard 
                                 key={recipe.id}
                                 recipe={recipe}
                                 onClick={() => handleRecipeClick(recipe)}
                                 isFavorite={favorites.includes(recipe.id)}
                                 onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                               />
                             ) : (
                               <RecipeListItem 
                                  key={recipe.id}
                                  recipe={recipe}
                                  onClick={() => handleRecipeClick(recipe)}
                                  isFavorite={favorites.includes(recipe.id)}
                                  onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                               />
                             )
                          ))}
                       </div>
                     )}
                  </div>
                )}

                {/* Recipe Detail View */}
                {view === 'detail' && selectedRecipe && (
                  <div className="animate-slide-up pb-20">
                     <RecipeDetail 
                       recipe={selectedRecipe} 
                       onBack={() => setView('list')}
                       isFavorite={favorites.includes(selectedRecipe.id)}
                       onToggleFavorite={() => {
                          // Manually toggle because RecipeDetail expects void fn
                          const e = { stopPropagation: () => {} } as React.MouseEvent;
                          toggleFavorite(e, selectedRecipe.id);
                       }}
                       onEdit={() => {
                         setEditingRecipe(selectedRecipe);
                         setShowAddModal(true);
                       }}
                       onDelete={handleDeleteRecipe}
                       onUpdateRecipe={handleUpdateRecipe}
                     />
                  </div>
                )}
             </div>
             
             {/* Toast Notification */}
             {showSuccessToast && (
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-stone-900/90 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-slide-up backdrop-blur-md z-50">
                 <div className="bg-green-500 rounded-full p-1"><Check size={12} strokeWidth={4} /></div>
                 <span className="font-medium">Action completed successfully</span>
               </div>
             )}
          </main>
          
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
               <div className="relative w-64 bg-stone-900 text-stone-300 h-full shadow-2xl animate-slide-right flex flex-col">
                  <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                    <span className="font-serif text-xl text-stone-100">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                      <button 
                        onClick={() => { setView('categories'); setSelectedCategory('All'); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-stone-100"
                      >
                        <LayoutGrid size={18} /> Categories
                      </button>
                      <button 
                        onClick={() => { setView('list'); setSelectedCategory('All'); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-stone-100"
                      >
                        <BookOpen size={18} /> All Recipes
                      </button>
                      <div className="border-t border-stone-800 my-2 pt-2">
                        {Object.values(Category).map(cat => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-stone-800 rounded-lg"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <RecipeModal 
          onClose={() => { setShowAddModal(false); setEditingRecipe(null); }} 
          onSave={editingRecipe ? handleUpdateRecipe : handleAddRecipe}
          initialData={editingRecipe || undefined}
        />
      )}
    </div>
  );
};

export default App;