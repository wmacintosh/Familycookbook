
import { Recipe, Category } from './types';
import { INITIAL_RECIPES as ADDITIONAL_RECIPES } from './additionalRecipes';

// Robust ID generation using crypto.randomUUID if available
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9);
};

export const FAMILY_MEMBERS = ['Nan', 'Wade', 'Donetta', 'Adrienne', 'Cathy', 'Jean', 'Carolyn', 'Dorothy', 'Selma', 'Bernice', 'Gail', 'Laurie', 'Joanie', 'Bernadette', 'Wanda', 'Molly'];

export const OWNER_COLORS: Record<string, string> = {
  'Nan': '#b45309',      // Amber-700
  'Wade': '#0369a1',     // Sky-700
  'Donetta': '#be185d',  // Pink-700
  'Adrienne': '#7e22ce', // Purple-700
  'Cathy': '#15803d',    // Green-700
  'Jean': '#c2410c',     // Orange-700
  'Carolyn': '#0e7490',  // Cyan-700
  'Dorothy': '#334155',  // Slate-700
  'Selma': '#4338ca',    // Indigo-700
  'Bernice': '#4d7c0f',  // Lime-700
  'Gail': '#1d4ed8',     // Blue-700
  'Laurie': '#9d174d',   // Rose-800
  'Molly': '#b91c1c',    // Red-700
  'Wanda': '#0f766e',    // Teal-700
  'Bernadette': '#6b21a8', // Purple-800
  'Joanie': '#854d0e',   // Yellow-800
};

export const AVATAR_COLORS = [
  '#b91c1c', '#15803d', '#b45309', '#0369a1', '#334155',
  '#4338ca', '#be185d', '#854d0e', '#0f766e', '#7e22ce',
];

export const getAvatarColor = (name: string, explicitColor?: string) => {
  if (explicitColor) return explicitColor;
  if (OWNER_COLORS[name]) return OWNER_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: generateId(),
    title: "Ham & Potatoes Au Gratin",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1/4 cup chopped Onion",
      "1/4 cup chopped Green Pepper",
      "2 Tbsp Butter",
      "3 Tbsp Flour",
      "Dash Salt and Pepper",
      "1 cup Milk",
      "1 cup shredded Cheddar Cheese",
      "1/4 cup Mayonnaise",
      "3 cups cooked Potatoes",
      "2 cups cooked Ham"
    ],
    instructions: [
      "Sauté onion and green pepper in butter until tender.",
      "Stir in flour, salt, and pepper.",
      "Add milk all at once and bring to a boil, stirring constantly.",
      "Reduce heat. Add grated cheese and mayonnaise.",
      "Continue stirring until cheese melts.",
      "Add potatoes and ham and mix thoroughly into sauce.",
      "Bake in casserole dish at 350°F for 30 minutes."
    ],
    addedBy: "Nan",
    temp: "350°F",
    cookTime: "30 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "To Cook Cranberries",
    category: Category.SAUCES,
    ingredients: [
      "1 1/2 cups Sugar",
      "1 1/2 cups Water",
      "12 oz Cranberries",
      "Dash of Salt"
    ],
    instructions: [
      "Combine sugar and water in a saucepan.",
      "Stir to dissolve sugar. Bring to a boil.",
      "Add cranberries and salt.",
      "Cook cranberries in boiling syrup without stirring until skins pop (about 10 mins)."
    ],
    addedBy: "Nan",
    cookTime: "10 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Chocolate Balls",
    category: Category.DESSERTS,
    ingredients: [
      "1/2 cup Margarine",
      "3 cups Coconut",
      "2 cups Icing Sugar",
      "1/4 cup Evaporated Milk",
      "6 oz Choc Chips (melted)",
      "2 Tbsp Paraffin Wax (melted)"
    ],
    instructions: [
      "Mix margarine, coconut, icing sugar, and milk together.",
      "Put in fridge for about 2 hours to set.",
      "Form into small balls.",
      "Dip in melted chocolate chips and wax mixture.",
      "Place on waxed paper and chill until set."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Macaroni & Crab",
    category: Category.MAIN_DISHES,
    ingredients: [
      "Macaroni",
      "Butter",
      "Green & Red Peppers, chopped",
      "1 can Crab meat (drained)",
      "1 Tbsp Cheese Whiz",
      "1/4 cup Milk",
      "Miracle Whip"
    ],
    instructions: [
      "Cook macaroni and drain.",
      "Fry peppers in butter; add to macaroni.",
      "Add the crab meat.",
      "Melt cheese whiz with milk and add to crab mixture.",
      "Mix with a little Miracle Whip to reach desired creaminess."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Whole Wheat Bread with Honey",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "3 cups Warm Water",
      "2 pkgs Active Yeast",
      "1/3 cup Honey (for yeast)",
      "5 cups White Flour",
      "3 Tbsp Butter",
      "1/3 cup Honey (for dough)",
      "1 Tbsp Salt",
      "3 1/2 cups Whole Wheat Flour",
      "2 Tbsp melted Butter (for top)"
    ],
    instructions: [
      "In a large bowl, mix warm water, yeast, and 1/3 cup honey.",
      "Add 5 cups white flour and combine. Let stand 30 minutes until bubbly.",
      "Mix in 3 Tbsp melted butter, remaining 1/3 cup honey, and salt.",
      "Stir in 2 cups whole wheat flour.",
      "Knead on floured board, adding remaining flour until not sticky.",
      "Place in greased bowl, cover with towel. Let rise until doubled in bulk.",
      "Punch down and place in loaves. Bake until golden."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Bacardi Rum Cake",
    category: Category.DESSERTS,
    ingredients: [
      "1 pkg (18 1/2 oz) Yellow Cake Mix",
      "1 pkg (3 3/4 oz) Vanilla Instant Pudding",
      "4 Eggs",
      "1/2 cup Cold Water",
      "1/2 cup Vegetable Oil",
      "1/2 cup Bacardi Dark Rum (80 proof)",
      "Glaze: 1/4 lb Butter",
      "Glaze: 1/4 cup Water",
      "Glaze: 1 cup Sugar",
      "Glaze: 1/2 cup Bacardi Dark Rum"
    ],
    instructions: [
      "Preheat oven to 325°F. Grease and flour a 10-inch tube or Bundt pan.",
      "Mix cake mix, pudding, eggs, water, oil, and rum until smooth.",
      "Pour into pan and bake for 1 hour. Cool in pan for 25 minutes.",
      "Invert onto serving plate. Prick top with a fork.",
      "Prepare glaze: Melt butter in saucepan. Stir in water and sugar. Boil 5 minutes, stirring constantly. Remove from heat and stir in rum.",
      "Spoon and brush glaze over cake, allowing it to absorb into the holes.",
      "Optional: Drizzle with chocolate glaze and sprinkle with chopped walnuts."
    ],
    addedBy: "Nan",
    temp: "325°F",
    cookTime: "1 hour",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Singapore Beef & Tomatoes",
    category: Category.MAIN_DISHES,
    ingredients: [
      "1 lb Lean Beef Steak (sirloin or round), cut into thin strips",
      "2 tsp Grated Ginger Root (or 1/2 tsp ground ginger)",
      "1 clove Garlic, minced",
      "2 Tbsp Soya Sauce",
      "1 Tbsp Vegetable Oil",
      "1 Tbsp Cornstarch",
      "1 can Sliced Tomatoes",
      "1 tsp each Curry Powder and Cumin",
      "2 medium Carrots, cut into matchstick pieces",
      "2 Green Onions, sliced"
    ],
    instructions: [
      "Brown beef, ginger, and garlic in hot oil. Remove from pan.",
      "Add remaining ingredients (except onions) to the pan.",
      "Cook and stir until mixture comes to a boil.",
      "Simmer for 5 minutes, stirring occasionally, until carrots are tender.",
      "Return beef to skillet and heat through.",
      "Sprinkle with green onions and serve over hot cooked rice."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Fruit Pizza",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Margarine",
      "1 1/4 cup Brown Sugar",
      "1 cup Flour",
      "1 tsp Baking Powder",
      "1/2 tsp Salt",
      "1 tsp Vanilla",
      "1 cup Fine Coconut",
      "1 1/2 cups Rolled Oats",
      "1 Egg",
      "Topping: 1 (250g) pkg Cream Cheese",
      "Topping: 1/2 cup White Sugar",
      "Fruit: Bananas, Grapes, Kiwi, Strawberries, Raspberries",
      "Glaze: 1/2 cup White Sugar, 2 Tbsp Cornstarch, 1/2 cup Orange Juice, 1 cup Water"
    ],
    instructions: [
      "Grease a pizza pan. Mix dough ingredients in order given.",
      "Spread evenly on pan and bake at 350°F for 10-15 minutes.",
      "Let crust cool completely.",
      "Cream together cream cheese and sugar; spread over cooled crust.",
      "Arrange fruit pieces beautifully on top.",
      "Cook glaze ingredients until thick. Let cool and spread over the fruit.",
      "Chill before serving."
    ],
    addedBy: "Nan",
    temp: "350°F",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Italian Spaghetti Sauce",
    category: Category.MAIN_DISHES,
    ingredients: [
      "2 lbs Ground Beef",
      "2 Onions, chopped",
      "1 Green Pepper, chopped",
      "1 can (16 oz) Mushroom stems",
      "2 tsp Salt",
      "2 Tbsp Sugar",
      "2 cans (20 oz) Tomatoes (mashed)",
      "1 can (13 oz) Tomato Paste",
      "1 can Water (use paste tin)",
      "1 tsp Oregano",
      "1/2 tsp minced Garlic",
      "1 Tbsp Tabasco Sauce",
      "1 Bay Leaf"
    ],
    instructions: [
      "Brown beef and onions in a large pot.",
      "Add Green Pepper and remaining ingredients.",
      "Simmer uncovered for 4 hours, stirring occasionally to prevent sticking.",
      "Remove bay leaf before serving."
    ],
    addedBy: "Nan",
    cookTime: "4 hours",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Frozen Fast Forward Dessert",
    category: Category.DESSERTS,
    ingredients: [
      "6 Tbsp Butter or Hard Margarine",
      "1 1/3 cups Graham Crumbs",
      "1 pkg Vanilla Instant Pudding",
      "2/3 cup Milk",
      "4 cups Butter Pecan Ice Cream",
      "1 cup Whipping Cream",
      "1 Skor Bar, crushed"
    ],
    instructions: [
      "Melt butter and stir in graham crumbs. Press into an ungreased 10-inch springform pan. Chill.",
      "Beat pudding powder with milk in a large bowl until smooth.",
      "Fold in the ice cream.",
      "In a separate bowl, beat whipping cream until stiff; fold into the pudding mixture.",
      "Pour over graham base.",
      "Sprinkle crushed Skor bar over the top.",
      "Put in freezer for at least 15 minutes before using.",
      "Cut into 12 wedges to serve."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Chocolate Turtle Cheesecake",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Graham Crumbs",
      "6 Tbsp melted Butter",
      "14 oz bag Caramels",
      "5 oz can Evaporated Milk",
      "2 pkgs (8 oz) Cream Cheese",
      "1/2 cup Sugar",
      "1 tsp Vanilla",
      "2 Eggs",
      "1/2 cup semi-sweet Chocolate Chips (melted)"
    ],
    instructions: [
      "Combine crumbs and butter; press into bottom of pan. Bake at 350°F for 10 minutes.",
      "In a pot, melt caramels with evaporated milk. Pour over the crust.",
      "Combine cream cheese, sugar, and vanilla. Add eggs one at a time.",
      "Blend in melted chocolate chips.",
      "Pour over the caramel layer.",
      "Bake at 350°F for 40 minutes.",
      "Chill thoroughly before serving."
    ],
    addedBy: "Nan",
    temp: "350°F",
    cookTime: "40 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Mars Bars Squares",
    category: Category.DESSERTS,
    ingredients: [
      "4 Mars Bars",
      "1/2 cup Butter",
      "2 cups Rice Krispies",
      "1/2 cup Coconut",
      "1/4 cup Butter (for topping)",
      "1 small bag Chocolate Chips"
    ],
    instructions: [
      "Melt the 4 Mars Bars and 1/2 cup butter together in a saucepan.",
      "Stir in Rice Krispies and coconut.",
      "Press into a 9x9 inch pan.",
      "Melt chocolate chips and remaining 1/4 cup butter together.",
      "Spread over the top and refrigerate until firm."
    ],
    addedBy: "Nan",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Chipit Bars",
    category: Category.DESSERTS,
    ingredients: [
      "2 cups Graham Wafer crumbs",
      "1 cup Coconut",
      "1 cup Chocolate Chips",
      "2 tsp Baking Powder",
      "1 can Eagle Brand Condensed Milk"
    ],
    instructions: [
      "Mix all ingredients together in a large bowl.",
      "Spread into a greased baking pan.",
      "Bake at 350°F for 25 minutes.",
      "Let cool and top with chocolate icing if desired."
    ],
    addedBy: "Nan",
    temp: "350°F",
    cookTime: "25 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Lemon Bread",
    category: Category.BREADS_MUFFINS,
    ingredients: [
      "1/2 cup Butter or Shortening",
      "1 cup Sugar",
      "2 Eggs, beaten",
      "1 tsp Baking Powder",
      "1 1/2 cups Flour",
      "1/2 tsp Salt",
      "1/2 cup Milk",
      "Grated rind of 1 Lemon",
      "3 tsp Lemon Juice",
      "Glaze: juice of 1 Lemon and 1/4 cup Sugar"
    ],
    instructions: [
      "Cream butter and sugar until light and fluffy.",
      "Add beaten eggs.",
      "Sift dry ingredients and add alternately with milk.",
      "Stir in lemon rind and juice.",
      "Bake in a greased loaf pan at 350°F for 45-50 minutes.",
      "After removing from oven, while still hot in the pan, spread the lemon juice and sugar glaze over the top."
    ],
    addedBy: "Nan",
    temp: "350°F",
    cookTime: "50 mins",
    description: "Orange Bread can be made exactly the same way using oranges instead.",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "The Monster Batch Cookies",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Butter or Margarine (softened)",
      "3 cups Peanut Butter",
      "2 cups Granulated Sugar",
      "2 1/2 cups Brown Sugar",
      "6 Eggs",
      "1 cup Chocolate Chips",
      "1 tsp Vanilla",
      "4 tsp Baking Soda",
      "5 cups Rolled Oats",
      "5 cups Crispy Rice Cereal"
    ],
    instructions: [
      "Preheat oven to 350°F.",
      "In a large bowl, cream butter, peanut butter, and sugars.",
      "Beat in eggs, vanilla, and baking soda.",
      "Stir in oats, rice cereal, and chocolate chips.",
      "Form dough into 1-inch balls and place on ungreased cookie sheets.",
      "Bake for 8 to 10 minutes."
    ],
    addedBy: "Nan",
    temp: "350°F",
    cookTime: "10 mins",
    description: "A huge batch for the whole family!",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Hodge Podge",
    category: Category.SIDE_DISHES,
    ingredients: [
      "Baby Carrots",
      "New Potatoes",
      "Green Beans",
      "Yellow Beans",
      "Shell Peas",
      "Sugar Peas or Snow Peas",
      "1 cup Cream (or blend)",
      "Butter",
      "Salt and Pepper to taste"
    ],
    instructions: [
      "Clean vegetables and cut up.",
      "In a large saucepan, bring 2 cups water to a boil.",
      "Add vegetables (cook carrots and potatoes first as they take longer).",
      "Reduce heat to medium and steam until tender (7-10 minutes).",
      "Vegetables should remain bright and colourful.",
      "Drain, saving about 1 cup of the vegetable juice.",
      "Blend together cream, butter, salt, pepper, and the reserved juice.",
      "Mix into the warm vegetables and serve immediately."
    ],
    addedBy: "Joanie",
    description: "A fresh summer vegetable tradition.",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Lobster Dip",
    category: Category.APPETIZERS,
    ingredients: [
      "1 can Lobster (thawed, drained)",
      "8 oz Cream Cheese",
      "1 cup Mayonnaise",
      "1 cup grated Cheddar Cheese",
      "2 tsp Dill Weed (optional)",
      "1/2 cup diced Onion"
    ],
    instructions: [
      "Cream the cream cheese, then add mayonnaise and mix well.",
      "Add all other ingredients except lobster and stir.",
      "Fold in the lobster pieces.",
      "Bake in a 325°F oven for approximately 20 minutes.",
      "Serve warm with crackers."
    ],
    addedBy: "Donetta",
    temp: "325°F",
    cookTime: "20 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Minestrone Soup",
    category: Category.SOUPS_SALADS,
    ingredients: [
      "1 1/2 lb Ground Round beef",
      "1 cup diced Onions",
      "1 cup diced Zucchini",
      "1/2 cup diced Okra",
      "1 cup cubed Potatoes",
      "1 cup sliced Carrots",
      "1/2 cup diced Celery",
      "1 cup shredded Cabbage",
      "1 14oz tin Tomatoes",
      "1/4 cup Rice or 1/2 cup Macaroni elbow noodles",
      "1 1/2 qts Water",
      "1 Bay leaf",
      "1/2 tsp Thyme",
      "5 tsp Salt",
      "Pepper to taste",
      "1 tsp Worcestershire Sauce",
      "1/2 cup grated Parmesan Cheese"
    ],
    instructions: [
      "Brown ground round in a large kettle.",
      "Add all vegetables, water, and spices; bring to a boil.",
      "Sprinkle in rice or noodles.",
      "Cover and simmer for at least one hour.",
      "Sprinkle with grated parmesan cheese before serving."
    ],
    addedBy: "Nan",
    cookTime: "1 hour+",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Whipped Shortbread",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup soft Margarine",
      "1/4 cup Corn Starch",
      "1/2 cup Icing Sugar",
      "1 1/2 cups sifted Flour"
    ],
    instructions: [
      "Cream margarine and sugars until very light and fluffy.",
      "Gradually add corn starch and flour.",
      "Drop by teaspoonfuls onto a cookie sheet.",
      "Bake in a 325°F oven for 20 minutes."
    ],
    addedBy: "Bernice",
    temp: "325°F",
    cookTime: "20 mins",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Polish Pancakes",
    category: Category.MAIN_DISHES,
    ingredients: [
      "6 Eggs",
      "1 qt Milk",
      "1/2 tsp Salt",
      "Flour (enough to make easy to spread dough)",
      "2 qt Cottage Cheese",
      "6 Egg Yolks",
      "1 sq Margarine",
      "1 pkg Raisins",
      "4 Oranges (peel only)",
      "Icing Sugar for rolling"
    ],
    instructions: [
      "Mix eggs, milk, salt, and flour to make a thin spreadable dough.",
      "In a bowl, mix cottage cheese, yolks, margarine, raisins, and orange peel.",
      "Cook pancakes until light brown.",
      "Spread the cheese mixture on pancakes and roll up.",
      "Roll in icing sugar and serve."
    ],
    addedBy: "Selma",
    timestamp: Date.now()
  },
  {
    id: generateId(),
    title: "Moose Hunters",
    category: Category.DESSERTS,
    ingredients: [
      "1 cup Brown Sugar",
      "1 cup Crisco Oil",
      "1 cup Molasses",
      "1/2 cup Milk",
      "2 tsp Baking Soda (put in milk)",
      "1 Egg, beaten",
      "1 tsp Ginger",
      "1/2 tsp Cinnamon",
      "1 tsp Salt",
      "4 cups Flour"
    ],
    instructions: [
      "Pour oil over brown sugar and add molasses, then milk (with soda).",
      "Add the beaten egg and dry ingredients.",
      "Roll out thick.",
      "Bake in 325°F oven for 12 minutes."
    ],
    addedBy: "Nan",
    temp: "325°F",
    cookTime: "12 mins",
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
      "4 Eggs",
      "3 cups Milk",
      "1/2 tsp Salt",
      "1/4 tsp Pepper",
      "1 tsp Dry Mustard",
      "1/4 cup minced Onion",
      "1/4 cup finely chopped Green Pepper",
      "1-2 tsp Worcestershire Sauce",
      "Dash Tabasco",
      "1/2 cup Butter",
      "Crushed Cornflakes"
    ],
    instructions: [
      "Arrange 8 slices of bread in bottom of buttered 9x13 pan.",
      "Cover bread with a layer of ham then cheese.",
      "Cover with remaining bread slices.",
      "Beat eggs with salt and pepper. Add dry mustard, onion, green pepper, Worcestershire, Tabasco, and milk.",
      "Pour over sandwiches. Cover and refrigerate overnight.",
      "In the morning, melt butter and pour over top. Sprinkle with crushed cornflakes.",
      "Bake uncovered for 1 hour at 350°F."
    ],
    temp: "350°F",
    cookTime: "1 hour",
    addedBy: "Nan",
    timestamp: Date.now()
  },
  // All additional recipes from Nan's collection imported below
  ...ADDITIONAL_RECIPES
];
