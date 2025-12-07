
import { Recipe, Category } from './types';

// Robust ID generation using crypto.randomUUID if available
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9);
};

export const FAMILY_MEMBERS = ['Nan', 'Wade', 'Donetta', 'Adrienne'];

export const OWNER_COLORS: Record<string, string> = {
  'Nan': '#b45309',      // Amber-700
  'Wade': '#0369a1',     // Sky-700
  'Donetta': '#be185d',  // Pink-700
  'Adrienne': '#7e22ce', // Purple-700
};

export const AVATAR_COLORS = [
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
export const getAvatarColor = (name: string, explicitColor?: string) => {
  if (explicitColor) return explicitColor;
  if (OWNER_COLORS[name]) return OWNER_COLORS[name];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const INITIAL_RECIPES: Recipe[] = [
  // --- APPETIZERS & DIPS ---
  {
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
    id: generateId(),
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
