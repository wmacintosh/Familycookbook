// Additional recipe data - import this in data.ts
// Generated from Nan's recipe collection

export const additionalRecipes = [
    // Due to size constraints, recipes should be added via the import script
    // or by directly editing this file
    // Format: Standard Recipe objects matching the Recipe type
];
import { Recipe, Category } from "./types";

// Helper to create IDs
export const id = () => crypto.randomUUID();

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
            "Corn Syrup",
            "Sugar",
            "PB",
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
            "When cool enough to handle, pull until white."
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
            "Cook fruit in syrup until clear."
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
    },
    // --- NEW IMPORT BATCH 1 ---
    {
        id: id(),
        title: "Nacho Dip",
        category: Category.APPETIZERS,
        ingredients: [
            "Cream cheese",
            "Chunky chili (or chili con carne)",
            "Salsa",
            "Shredded cheddar cheese"
        ],
        instructions: [
            "Spread cream cheese on the bottom of a dish.",
            "Layer with chunky chili (or chili con carne).",
            "Pour salsa over the chili.",
            "Top with shredded cheddar cheese.",
            "Bake at 325°F for 20 minutes until the cheese is melted."
        ],
        temp: "325°F",
        cookTime: "20 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Chicken Dip",
        category: Category.APPETIZERS,
        ingredients: [
            "2 cups cooked, chopped chicken (boneless, skinless)",
            "1 cup onion, diced",
            "2 tbsp oil",
            "1 cup salsa",
            "1/4 cup Jalapeño peppers, chopped",
            "1 can cream of mushroom soup",
            "1/2 cup cheddar cheese, grated",
            "1 1/2 cup mozzarella cheese, grated",
            "Tortilla wraps"
        ],
        instructions: [
            "Sauté onion in oil, add peppers and soup. Mix well until heated and creamy.",
            "Add most of the cheese (reserve a little for the top) and melt slowly.",
            "Line a casserole dish with tortilla wraps.",
            "Layer salsa, chopped chicken, and the creamy cheese mixture. Repeat layers.",
            "Top with remaining cheese and bake for about 1 hour (or until bubbling and hot)."
        ],
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Russian Chicken",
        category: Category.MAIN_DISHES,
        ingredients: [
            "Chicken breasts",
            "1 jar apricot jam",
            "1 bottle Russian dressing",
            "1 package onion soup mix"
        ],
        instructions: [
            "Place chicken breasts in a pan.",
            "Mix apricot jam and Russian dressing together.",
            "Pour over chicken and bake for 30 minutes.",
            "Add onion soup mix.",
            "Bake for an additional 25 minutes."
        ],
        cookTime: "55 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Ham & Cheese Strata",
        category: Category.MAIN_DISHES,
        ingredients: [
            "12 white bread slices",
            "1 pkg cream cheese",
            "1 1/2 cup (6 oz) shredded mild cheddar cheese",
            "1 pkg (10 oz) frozen broccoli (thawed & well-drained)",
            "1 cup ham, diced",
            "3 eggs",
            "1 cup milk",
            "1/2 tsp dry mustard"
        ],
        instructions: [
            "Place bread slices in the bottom of an 8x12 dish.",
            "Cover with cheddar cheese, broccoli, ham, and the remaining bread slices (cut in half diagonally).",
            "Beat cream cheese until light; add eggs one at a time, mixing well.",
            "Blend in milk and mustard. Pour over the bread.",
            "Top with remaining cheddar cheese.",
            "Bake at 350°F for 45 to 50 minutes. Let stand 10 minutes before serving."
        ],
        temp: "350°F",
        cookTime: "50 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cabbage Rolls",
        category: Category.MAIN_DISHES,
        ingredients: [
            "Medium cabbage",
            "2 lbs hamburger",
            "1 onion, chopped",
            "1 egg, beaten",
            "1/2 cup rice (cooked 7 min)",
            "Spices (to taste)",
            "Large can tomato juice",
            "1 can tomato soup",
            "Salt and pepper"
        ],
        instructions: [
            "Cook cabbage in boiling water until easy to pull apart.",
            "Mix hamburger, onion, egg, and rice. Season with spices.",
            "Roll the meat mixture into cabbage leaves and place in a large roasting pan.",
            "Cover with tomato juice, tomato soup, salt, and pepper.",
            "Bake at 325°F for 1 1/2 to 2 hours."
        ],
        temp: "325°F",
        cookTime: "2 hours",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Meatloaf (Variation 1)",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1 lb hamburger",
            "1/2 cup cracker crumbs",
            "1/4 cup milk",
            "2 eggs",
            "1/4 cup ketchup",
            "1/2 cup chopped onions",
            "Salt and pepper"
        ],
        instructions: [
            "Mix all ingredients.",
            "Bake at 350°F for 1 hour."
        ],
        temp: "350°F",
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Meatloaf (Variation 2)",
        category: Category.MAIN_DISHES,
        ingredients: [
            "2 cups ground beef",
            "2 slices white bread (made into crumbs)",
            "1/3 cup milk",
            "1 small onion, chopped",
            "1 egg, beaten",
            "1/3 cup grated cheddar cheese",
            "2 tbsp ketchup",
            "1 tsp dry mustard",
            "2 tsp salt and pepper"
        ],
        instructions: [
            "Soak bread crumbs in milk. Beat in the egg.",
            "Mix in all other ingredients.",
            "Place in an 8x4x2 loaf pan and bake at 350°F for 45 minutes."
        ],
        temp: "350°F",
        cookTime: "45 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Dumplings for Stew",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "1 1/2 cup flour",
            "2 tsp baking powder",
            "3/4 tsp salt",
            "3 tbsp shortening",
            "3/4 cup milk"
        ],
        instructions: [
            "Mix dry ingredients and shortening.",
            "Stir in milk.",
            "Drop by spoonfuls into simmering stew.",
            "Cook uncovered for 10 minutes, then covered for another 10 minutes."
        ],
        cookTime: "20 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cranberry Loaf",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "2 cups flour",
            "3/4 cup white sugar",
            "1 1/2 tsp baking powder",
            "1/2 tsp baking soda",
            "1 tsp salt",
            "1 tbsp orange rind",
            "1/4 cup orange juice",
            "1/4 cup milk",
            "1/4 cup melted margarine",
            "1 large egg",
            "1 cup cranberries"
        ],
        instructions: [
            "Mix ingredients together.",
            "Bake at 350°F for 50 minutes."
        ],
        temp: "350°F",
        cookTime: "50 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pizza Dough",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "1 cup warm water",
            "1 pkg yeast",
            "1 tsp sugar",
            "1 cup warm milk",
            "1/2 cup oil",
            "1/2 cup sugar",
            "4 cups flour"
        ],
        instructions: [
            "Mix warm water, sugar, and yeast. Let sit for 10 minutes.",
            "In a larger bowl, combine warm milk, oil, and sugar.",
            "Add yeast mixture and flour.",
            "Let rise for 1 hour before using."
        ],
        cookTime: "1 hour rise",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Rocky Roads",
        category: Category.DESSERTS,
        ingredients: [
            "6 oz pkg chocolate chips",
            "1/2 cup butter",
            "1 egg",
            "1 cup icing sugar",
            "2 cups small marshmallows",
            "Coconut (for top)",
            "Whole Graham wafers"
        ],
        instructions: [
            "Melt chips and butter. Add egg and icing sugar.",
            "Line a pan with Graham crackers.",
            "When the chocolate mixture has cooled slightly, stir in marshmallows.",
            "Pour over the crackers. Sprinkle with coconut.",
            "Cool and cut into squares."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Frosted Pineapple Cookies",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup brown sugar",
            "1/2 cup shortening",
            "1 egg",
            "3/4 cup drained, crushed pineapple (reserve juice)",
            "2 cups flour",
            "1/4 tsp soda",
            "1/4 tsp baking powder",
            "1/4 tsp salt",
            "1 tsp vanilla",
            "1/2 cup chopped nuts",
            "Frosting: 2 cups icing sugar, 3 tbsp melted butter, 1 tsp vanilla, pineapple juice"
        ],
        instructions: [
            "Cream shortening and sugar. Add egg and pineapple.",
            "Mix in dry ingredients, vanilla, and nuts.",
            "Drop by teaspoons and bake at 375°F for 10–12 minutes.",
            "Frost with icing."
        ],
        temp: "375°F",
        cookTime: "12 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Peanut Butter Oatmeal Cookies (No Flour)",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup butter",
            "1/2 cup white sugar",
            "1/2 cup brown sugar",
            "1 egg",
            "1/2 cup peanut butter",
            "1/2 tsp soda",
            "2 1/2 cups rolled oats",
            "1/2 cup raisins",
            "1/4 cup milk",
            "Salt and vanilla"
        ],
        instructions: [
            "Cream butter and sugars. Add peanut butter and egg.",
            "Add soda, salt, vanilla, and milk.",
            "Stir in raisins and oats.",
            "Drop on a greased cookie sheet and bake at 350°F for 10–12 minutes."
        ],
        temp: "350°F",
        cookTime: "12 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Chocolate Chip Cookies (Donnetta)",
        category: Category.DESSERTS,
        ingredients: [
            "2 1/2 cups flour",
            "1 tsp salt",
            "1 tsp soda",
            "1 cup butter",
            "1 tsp vanilla",
            "1 pkg chocolate chips",
            "3/4 cup brown sugar",
            "2/3 cup white sugar",
            "2 eggs"
        ],
        instructions: [
            "Cream butter and sugars, add eggs and vanilla.",
            "Mix in dry ingredients and chips.",
            "Bake at 375°F for 8–10 minutes."
        ],
        temp: "375°F",
        cookTime: "10 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Spinach Dip",
        category: Category.APPETIZERS,
        ingredients: [
            "1 cup sour cream",
            "1 cup mayonnaise",
            "1 tsp lemon juice",
            "1 pkg vegetable soup mix (Knorr)",
            "1 pkg frozen chopped spinach (thawed and drained)",
            "1 tsp seasoning salt"
        ],
        instructions: [
            "Mix all ingredients together.",
            "Let set for 2 hours before serving."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "To Cook Cranberries",
        category: Category.SAUCES,
        ingredients: [
            "1 1/2 cups sugar",
            "1 cup water",
            "12 oz cranberries",
            "Dash of salt"
        ],
        instructions: [
            "Combine sugar and water in a saucepan; stir to dissolve.",
            "Bring to a boil.",
            "Add cranberries and salt.",
            "Cook in boiling syrup without stirring until skins pop (about 10 minutes)."
        ],
        cookTime: "10 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Macaroni Crab Salad",
        category: Category.SOUPS_SALADS,
        ingredients: [
            "Cooked macaroni, drained",
            "Butter, flour, and red pepper (for roux)",
            "Crab meat",
            "1 tbsp cheese",
            "1/4 cup milk",
            "Miracle Whip"
        ],
        instructions: [
            "Sauté red pepper in butter, stir in flour.",
            "Add to macaroni along with crab meat.",
            "Melt cheese with milk and add to crab mixture.",
            "Mix with Miracle Whip until creamy."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    // --- END OF BATCH 1 IMPORT ---

    // --- NEW IMPORT BATCH 2 ---
    {
        id: id(),
        title: "Veggie Dressing / Dip",
        category: Category.SAUCES,
        ingredients: [
            "1/2 cup mayonnaise",
            "3/4 cup Italian & French dressing (combined)",
            "2 tbsp parsley",
            "1 tsp salt",
            "1 tsp pepper"
        ],
        instructions: [
            "Combine all ingredients and pour over fresh vegetables (peppers, carrots, celery)."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Meatloaf (Lipton Soup Version)",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1 pouch Lipton Onion Soup mix",
            "2 eggs, beaten",
            "1/2 cup ketchup",
            "1/2 cup fine bread crumbs",
            "2 lbs lean ground beef"
        ],
        instructions: [
            "Preheat oven to 350°F.",
            "Blend soup mix, eggs, ketchup, and bread crumbs.",
            "Add ground beef and combine well.",
            "Press into a loaf pan and bake for 40 minutes."
        ],
        temp: "350°F",
        cookTime: "40 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Date Bread",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "1 3/4 cups flour",
            "1/2 tsp salt",
            "1/4 tsp cream of tartar",
            "3/4 tsp baking soda",
            "1/3 cup softened butter",
            "2/3 cup white sugar",
            "1 egg",
            "1 cup chopped dates"
        ],
        instructions: [
            "Cream butter and sugar. Beat in egg.",
            "Stir in dry ingredients, then dates.",
            "Bake at 350°F for 1 hour in a loaf pan."
        ],
        temp: "350°F",
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cinnamon Rolls (Cinnamon Kills)",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "Dough: 3 1/2 cups flour, 4 tsp baking powder, 1/2 tsp salt, 3/4 cup shortening, 2 eggs (plus enough milk to make 1 cup total liquid).",
            "Filling: 3 tbsp cinnamon, 1 1/2 cups brown sugar, melted margarine."
        ],
        instructions: [
            "Roll pastry, brush with margarine, sprinkle with sugar/cinnamon.",
            "Roll and slice.",
            "Bake at 375°F for 10 minutes."
        ],
        temp: "375°F",
        cookTime: "10 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Thimble Cookies",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup butter or margarine",
            "1/4 cup sugar",
            "1 egg yolk (well beaten)",
            "2 tsp lemon juice",
            "1 cup flour",
            "1 egg white (slightly beaten)",
            "1 cup chopped nuts"
        ],
        instructions: [
            "Cream butter and sugar. Add egg yolk and lemon juice. Beat well.",
            "Add flour and blend.",
            "Shape into balls. Dip balls in egg white, then roll in nuts.",
            "Bake at 350°F."
        ],
        temp: "350°F",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Zucchini Cookies",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup brown sugar",
            "1/2 cup oil",
            "1 egg",
            "1 tsp vanilla",
            "1 cup grated zucchini (unpeeled)",
            "2 1/4 cups flour",
            "1 tsp baking powder",
            "1 tsp baking soda",
            "1/2 tsp salt",
            "1/2 tsp cinnamon",
            "1/2 tsp nutmeg",
            "1/2 tsp ginger",
            "1/2 cup raisins"
        ],
        instructions: [
            "Combine sugar, oil, egg, and vanilla. Add zucchini.",
            "Sift dry ingredients and add to mixture. Stir in raisins.",
            "Drop by teaspoonfuls onto ungreased sheets.",
            "Bake at 350°F for 10–12 minutes."
        ],
        temp: "350°F",
        cookTime: "12 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Butter Tart Slice",
        category: Category.DESSERTS,
        ingredients: [
            "Base: 1 1/2 cups flour, 1/4 cup brown sugar, 1/2 cup margarine.",
            "Topping: 1 cup brown sugar, 1 egg, 1 tbsp cream, 1 tbsp flour, 1/2 cup raisins."
        ],
        instructions: [
            "Mix base and press into pan. Bake at 350°F for 10–15 mins.",
            "Spread topping over base and bake 20–25 mins."
        ],
        temp: "350°F",
        cookTime: "30 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Eggnog/Flip",
        category: Category.MISCELLANEOUS,
        ingredients: [
            "1 egg",
            "1 cup warm milk",
            "2 tsp sugar (to taste)",
            "Nutmeg"
        ],
        instructions: [
            "Beat egg with warm milk.",
            "Add sugar and nutmeg.",
            "Drink immediately."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Blini / Pancakes",
        category: Category.BREAKFAST,
        ingredients: [
            "2 qt cottage cheese",
            "6 egg yolks",
            "1 square margarine",
            "1 pkg raisins",
            "Oranges (peel)",
            "Icing sugar"
        ],
        instructions: [
            "Combine cottage cheese, yolks, margarine, and raisins.",
            "Add orange peel for flavor.",
            "Form into pancakes and cook.",
            "Roll in icing sugar to serve."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Ham & Potato Casserole",
        category: Category.MAIN_DISHES,
        ingredients: [
            "2 cups cooked ham, diced",
            "3 cups cooked potatoes, mashed or cubed",
            "1/4 cup chopped onion",
            "1/4 cup chopped green pepper",
            "2 tbsp butter",
            "3 tbsp flour",
            "1 cup milk",
            "Salt and pepper to taste",
            "1 cup shredded cheddar cheese",
            "Mayonnaise (optional)"
        ],
        instructions: [
            "Sauté onion and green pepper in butter until tender.",
            "Stir in flour, salt, and pepper.",
            "Add milk all at once and bring to a boil, stirring constantly.",
            "Reduce heat and add cheese (and mayonnaise if using). Stir until melted.",
            "Add potatoes and ham; mix thoroughly.",
            "Bake in a casserole dish at 350°F for 30 minutes."
        ],
        temp: "350°F",
        cookTime: "30 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Meat Pie (Variation)",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1 tbsp melted shortening",
            "1 small onion, chopped",
            "1 lb lean pork, 1/2 lb lean beef",
            "1 1/2 cups water",
            "Pastry: 3 cups flour, 2/3 cup shortening, 1 1/2 tsp salt, water"
        ],
        instructions: [
            "Simmer meats with onion, water, and spices for 45 minutes or until tender.",
            "Prepare pastry and line a pie plate.",
            "Add meat mixture, cover with top crust, and bake at 450°F for 15 minutes, then 350°F for 15 minutes."
        ],
        cookTime: "1 hour 15 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Zucchini Loaf",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "2 cups sugar",
            "3 eggs",
            "1 cup oil",
            "1 1/4 cups grated zucchini",
            "3 cups flour",
            "2 tsp soda",
            "1 tsp salt",
            "2 tsp baking powder",
            "2 tsp cinnamon",
            "1 cup raisins"
        ],
        instructions: [
            "Beat sugar and eggs until fluffy; add oil, zucchini, and raisins.",
            "Add sifted dry ingredients.",
            "Bake at 325°F for 1 hour."
        ],
        temp: "325°F",
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Chocolate Balls",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup margarine",
            "3 cups coconut",
            "2 cups icing sugar",
            "1/4 cup evaporated milk",
            "Chocolate chips and paraffin wax for dipping"
        ],
        instructions: [
            "Mix ingredients and refrigerate for 2 hours.",
            "Form into balls and dip in melted chocolate chips (melted with 2 tbsp paraffin wax).",
            "Chill on waxed paper."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Coconut Dream Bars",
        category: Category.DESSERTS,
        ingredients: [
            "Bottom: 1/2 cup margarine, 1 1/4 cups flour, 1/2 tsp salt, 1 tbsp brown sugar.",
            "Top: 1 1/2 cups brown sugar, 1 tsp vanilla, 1 1/2 cups coconut, 1/4 tsp salt, 2 well-beaten eggs, 1 cup Rice Krispies."
        ],
        instructions: [
            "Press bottom mixture into 8x8 pan.",
            "Top with remaining ingredients mixed together.",
            "Bake at 350°F for 35–40 minutes."
        ],
        temp: "350°F",
        cookTime: "40 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "7-Up Pound Cake",
        category: Category.DESSERTS,
        ingredients: [
            "1 1/2 cups margarine",
            "3 cups sugar",
            "5 eggs",
            "3 cups flour",
            "2 tbsp lemon extract",
            "2/3 cup 7-Up soda"
        ],
        instructions: [
            "Cream margarine and sugar for about 20 minutes.",
            "Add eggs one at a time.",
            "Fold in flour and lemon extract.",
            "Fold in 7-Up.",
            "Bake in a tube pan at 325°F for 1 1/2 hours."
        ],
        temp: "325°F",
        cookTime: "1.5 hours",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Rhubarb Pie",
        category: Category.DESSERTS,
        ingredients: [
            "Filling: 3 cups rhubarb (pour boiling water over, stand 5 mins, drain), 1 1/2 cups sugar, 1/4 cup flour, 2 tbsp butter.",
            "Topping: 1/2 cup brown sugar, 1/2 cup flour, 1/4 tsp salt."
        ],
        instructions: [
            "Place filling in crust, sprinkle topping over.",
            "Bake at 325–350°F for 45 minutes."
        ],
        cookTime: "45 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pork Pies (Jean's)",
        category: Category.DESSERTS,
        ingredients: [
            "Shells: 1 block butter, 2 1/2 cups flour, salt, 3 tbsp icing sugar.",
            "Filling: 1 1/2 cups water, 1 cup dates, lemon flavoring, 1/2 cup brown sugar, salt.",
            "Topping: 3 tbsp brown sugar, 2 tbsp butter, 1/4 can milk, icing sugar, vanilla."
        ],
        instructions: [
            "Bake shells in muffin tins.",
            "Cook filling until thick.",
            "Boil topping ingredients for 3 mins, thicken with icing sugar.",
            "Pour over filled shells."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Honey Mustard Sauce",
        category: Category.SAUCES,
        ingredients: [
            "2 tbsp honey",
            "2 tbsp mustard",
            "2 tbsp vegetable oil"
        ],
        instructions: [
            "Mix well."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Butterscotch Sauce",
        category: Category.SAUCES,
        ingredients: [
            "2 cups brown sugar",
            "1/2 cup light cream",
            "2 tbsp corn syrup",
            "1 tsp vanilla",
            "4 tbsp butter"
        ],
        instructions: [
            "Combine ingredients in a saucepan.",
            "Heat to boiling and boil for 3 minutes.",
            "Stir in vanilla."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    // --- END OF BATCH 2 IMPORT ---

    // --- NEW IMPORT BATCH 3 ---
    {
        id: id(),
        title: "Bannock",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "3 cups flour",
            "1 tsp salt",
            "6 tsp baking powder",
            "1/2 cup whipping cream",
            "1 1/2 cups milk"
        ],
        instructions: [
            "Mix ingredients together.",
            "Place in an 8x8 pan.",
            "Bake at 400°F for 25–30 minutes."
        ],
        temp: "400°F",
        cookTime: "30 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pork Ribs with Coke",
        category: Category.MAIN_DISHES,
        ingredients: [
            "3 lbs pork ribs",
            "2 cups Coca-Cola",
            "2 cups ketchup",
            "1 cup brown sugar",
            "2 onions, chopped"
        ],
        instructions: [
            "Parboil ribs for 20 minutes and drain.",
            "Place in a casserole dish.",
            "Combine Coke, ketchup, brown sugar, and onion.",
            "Pour over ribs and bake at 350°F for 1 1/2 hours."
        ],
        temp: "350°F",
        cookTime: "1.5 hours",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Aunt Jennie's Biscuits",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "5 cups flour",
            "10 tsp baking powder",
            "3/4 cup white sugar",
            "1 tsp salt",
            "1/2 cup raisins",
            "3/4 cup shortening",
            "Water or milk to mix"
        ],
        instructions: [
            "Roll out and cut into rounds.",
            "Bake at 375°F for 15 minutes."
        ],
        temp: "375°F",
        cookTime: "15 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Tweed Squares",
        category: Category.DESSERTS,
        ingredients: [
            "Base: 1/2 cup margarine, 2/3 cup white sugar, 1 1/3 cups flour, 1 tsp baking powder, 1/2 tsp salt, 1/2 cup milk, 2 egg whites (stiffly beaten), 2 oz grated semi-sweet chocolate.",
            "Frosting: 2 egg yolks, 1/2 cup margarine, 1 1/2 tsp vanilla, 3 oz melted semi-sweet chocolate, 1 cup icing sugar."
        ],
        instructions: [
            "Bake base at 350°F in 9x12 pan.",
            "Top with frosting while cool."
        ],
        temp: "350°F",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Butterscotch Squares",
        category: Category.DESSERTS,
        ingredients: [
            "1/4 cup butter",
            "1 cup brown sugar",
            "1 tsp baking powder",
            "1/4 tsp salt",
            "1 egg",
            "1 cup flour",
            "Vanilla"
        ],
        instructions: [
            "Combine and bake."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Quick Gingerbread Cake",
        category: Category.DESSERTS,
        ingredients: [
            "3 eggs",
            "1 3/8 cups flour",
            "1 cup sugar",
            "2 tsp soda",
            "1 cup molasses (dissolved in 1/4 cup water)",
            "1 tsp cloves",
            "1 tsp ginger",
            "1/4 cup salad oil"
        ],
        instructions: [
            "Mix well and bake in 9x10 pan for 30 minutes."
        ],
        cookTime: "30 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Boiled Frosting",
        category: Category.SAUCES,
        ingredients: [
            "3 egg whites",
            "1 cup brown sugar",
            "1 1/2 cups corn syrup",
            "3 tbsp cold water",
            "1/4 tsp cream of tartar"
        ],
        instructions: [
            "Boil for 7 minutes."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Quick Butterwater Sundae Sauce",
        category: Category.SAUCES,
        ingredients: [
            "1 1/2 cups brown sugar",
            "1 chunk butter",
            "1/2 tsp vanilla",
            "1/2 cup corn syrup",
            "Small can evaporated milk"
        ],
        instructions: [
            "Boil sugar and syrup for 5 mins.",
            "Add butter and cool for 10 mins.",
            "Stir in milk and vanilla."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Veggies in Cream Sauce",
        category: Category.SIDE_DISHES,
        ingredients: [
            "Baby carrots, green beans, yellow beans, shell peas, potatoes, snow peas",
            "Sauce: 1 cup cream, 1/2 cup butter, salt and pepper"
        ],
        instructions: [
            "Cook all vegetables in salt boiling water until done; drain.",
            "Mix cream, butter, salt, and pepper; toss with hot vegetables."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Dressing for Mixed Veggies",
        category: Category.SAUCES,
        ingredients: [
            "1/2 cup Italian dressing",
            "1/2 cup water OR salsa",
            "2 cloves garlic (minced)"
        ],
        instructions: [
            "Combine and cook for 7 minutes.",
            "Pour over veggies."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cheesecake Squares",
        category: Category.DESSERTS,
        ingredients: [
            "Base: 2 cups graham wafer crumbs, 2 tbsp sugar, 1/2 cup melted butter (press into 9x13 pan).",
            "Filling: 8 oz cream cheese, 1 cup white sugar (mixed with 1 egg), 1 tsp vanilla.",
            "Topping: Fresh berries."
        ],
        instructions: [
            "Prepare base.",
            "Add filling.",
            "Top with berries."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Blueberry Cheese Cake",
        category: Category.DESSERTS,
        ingredients: [
            "Graham crust",
            "1 pkg Philly cream cheese",
            "1 cup sugar (mixed with 1/2 cup butter)",
            "1 large container Cool Whip",
            "1 tsp lemon juice",
            "1/4 tsp salt",
            "3 cups blueberries"
        ],
        instructions: [
            "Cream cheese, sugar, and butter.",
            "Fold in Cool Whip, lemon juice, and salt.",
            "Spread on crust and top with blueberries."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pork Chops Creole",
        category: Category.MAIN_DISHES,
        ingredients: [
            "6 pork chops",
            "1 cup diced celery",
            "1 medium onion, chopped",
            "1 can tomato soup",
            "1 soup can water",
            "1 1/2 tsp salt",
            "2 tsp chili powder",
            "1 tsp dry oregano",
            "1 can red kidney beans",
            "1/4 tsp pepper",
            "1 can kernel corn",
            "3/4 cup regular rice"
        ],
        instructions: [
            "Brown pork chops.",
            "Sauté celery and onion. Stir in chili powder.",
            "Stir in beans, corn, rice, soup, water, and spices.",
            "Pour into casserole, top with chops.",
            "Bake covered at 350°F until rice and chops are tender."
        ],
        temp: "350°F",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Spicy Stir Fry",
        category: Category.MAIN_DISHES,
        ingredients: [
            "3 boneless chicken breasts (bite-size)",
            "1 small onion",
            "1 small green pepper",
            "1 small red pepper",
            "1 can mushrooms",
            "Sauce: 2 1/2 tbsp cornstarch, 1 can chicken broth, 1/2 cup hot ketchup, 3 tbsp soy sauce, 1 tsp cayenne pepper, 3 tbsp brown sugar"
        ],
        instructions: [
            "Mix sauce ingredients.",
            "Cook chicken and vegetables.",
            "Pour sauce over and cook until thickened."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Strawberry Muffins",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "3 cups flour",
            "1 1/2 cups white sugar",
            "2/3 cup vegetable oil",
            "2 eggs",
            "4 tsp baking powder",
            "1/2 tsp salt",
            "2 cups strawberries"
        ],
        instructions: [
            "Cream oil, sugar, and eggs.",
            "Add dry ingredients. Fold in berries.",
            "Bake at 400°F for 20–25 minutes."
        ],
        temp: "400°F",
        cookTime: "25 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Tangy Poppy Seed Fruit Salad",
        category: Category.SOUPS_SALADS,
        ingredients: [
            "1 can Pineapple chunks",
            "1 orange",
            "1 kiwi",
            "1 cup grapes",
            "1 cup strawberries",
            "Dressing: 1/4 tsp lime peel, 2 tbsp lime juice, 1 tbsp honey, 1 tsp poppy seeds"
        ],
        instructions: [
            "Combine fruit.",
            "Mix dressing and toss."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Beef and Macaroni Casserole",
        category: Category.MAIN_DISHES,
        ingredients: [
            "3/4 lb ground beef",
            "1/2 cup chopped onion",
            "1/2 cup chopped celery",
            "1 can Italian style tomato soup",
            "3/4 cup water",
            "1/8 tsp pepper",
            "2 cups cooked elbow macaroni",
            "2 cups shredded cheddar cheese"
        ],
        instructions: [
            "Brown beef and veg.",
            "Stir in soup, water, pepper, macaroni.",
            "Top with cheese.",
            "Heat through."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Key Lime Squares",
        category: Category.DESSERTS,
        ingredients: [
            "Base: 1 1/2 cups flour, 1/2 cup butter, 1/4 cup sugar, 1/2 cup almonds.",
            "Filling: 1 cup sugar, 2 eggs, 1/4 cup lime juice, 2 tbsp flour, 1 tsp lime peel.",
            "Topping: 1 cup icing sugar, 8 oz cream cheese, 1 cup whipped topping."
        ],
        instructions: [
            "Bake base 15 mins at 350°F.",
            "Cook filling until thick, pour over base.",
            "Beat topping, spread over cooled filling.",
            "Chill 3 hours."
        ],
        temp: "350°F",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Curry Honey Chicken",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1/2 cup honey",
            "1/4 cup Dijon mustard",
            "1/4 cup oil",
            "1 tbsp curry powder",
            "Chicken pieces"
        ],
        instructions: [
            "Whisk liquid ingredients.",
            "Coat chicken.",
            "Bake at 350°F for 45 minutes uncovered, turn, bake 15 mins."
        ],
        temp: "350°F",
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Butterscotch Krispies",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup peanut butter",
            "1/2 cup butter",
            "1 egg",
            "1 cup brown sugar",
            "1 pkg (dry) butterscotch pudding mix",
            "4 cups Rice Krispies",
            "1/2 cup coconut",
            "1/2 cup walnuts"
        ],
        instructions: [
            "Cream butter and PB. Blend in sugar, egg, pudding mix.",
            "Add cereal/nuts.",
            "Drop by spoonfuls and bake at 350°F for 10 minutes."
        ],
        temp: "350°F",
        cookTime: "10 mins",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Frozen Fast Forward",
        category: Category.DESSERTS,
        ingredients: [
            "Crust: 6 tbsp butter, 1 1/2 cups graham crumbs.",
            "Filling: 1 pkg Vanilla Instant Pudding, 2/3 cup milk, 4 cups Butter Pecan ice cream, 1 cup whipping cream, Skor bar crumbs."
        ],
        instructions: [
            "Press crust into pan; chill.",
            "Beat pudding/milk. Fold in ice cream/cream.",
            "Pour over crust, top with Skor crumbs, freeze."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Millionaire Squares",
        category: Category.DESSERTS,
        ingredients: [
            "Base: 20-30 Oatmeal cookies (crushed), 1/3 cup melted margarine.",
            "Filling: 1/2 cup margarine, 1 pkg butterscotch chips, 2 cups icing sugar, 1 egg, 1 tsp vanilla."
        ],
        instructions: [
            "Bake 3/4 of base 5-8 mins at 375°F.",
            "Melt margarine/chips, add rest. Spread on base.",
            "Top with remaining crumbs."
        ],
        temp: "375°F",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Bacardi Rum Cake",
        category: Category.DESSERTS,
        ingredients: [
            "1 pkg yellow cake mix, 1 pkg vanilla pudding, 4 eggs, 1/2 cup water, 1/2 cup oil, 1/2 cup Bacardi Dark Rum.",
            "Glaze: 1/4 lb butter, 1/4 cup water, 1 cup sugar, 1/2 cup Rum."
        ],
        instructions: [
            "Bake at 325°F for 1 hour.",
            "Prick cake and pour glaze over while cooling."
        ],
        temp: "325°F",
        cookTime: "1 hour",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cocoa Balls (No Bake)",
        category: Category.DESSERTS,
        ingredients: [
            "3 cups sugar",
            "1/2 cup cocoa",
            "1/2 cup milk",
            "1/2 cup shortening",
            "2 cups oats",
            "1/2 cup coconut",
            "1 tsp vanilla",
            "1/2 tsp salt"
        ],
        instructions: [
            "Boil first 4 ingredients for 2 mins.",
            "Stir in remaining.",
            "Drop on wax paper."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Singapore Beef and Tomatoes",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1 lb beef strips",
            "Ginger",
            "Garlic",
            "Stewed tomatoes",
            "Soy sauce",
            "Cornstarch",
            "Curry powder",
            "Carrots",
            "Green onions"
        ],
        instructions: [
            "Brown beef.",
            "Cook remaining ingredients until thick.",
            "Simmer beef and carrots until tender."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Quick Spaghetti Sauce",
        category: Category.SAUCES,
        ingredients: [
            "2 cans tomato soup",
            "1 can tomato paste",
            "1 lb hamburger",
            "3 tbsp onion flakes",
            "2 tsp chili powder",
            "2 tsp salt",
            "3 cloves garlic"
        ],
        instructions: [
            "Brown hamburger.",
            "Add all ingredients (with water in soup cans).",
            "Simmer 3 hours."
        ],
        cookTime: "3 hours",
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Fiesta Rice Bowl / Salad",
        category: Category.SIDE_DISHES,
        ingredients: [
            "3 cups cooked long grain rice",
            "1/2 cup corn kernels",
            "1 cup salsa",
            "3/4 cup shredded cheddar cheese"
        ],
        instructions: [
            "Stir corn and salsa into the cooked rice.",
            "Heat through.",
            "Serve with shredded cheese on top."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Fruit Blossom",
        category: Category.DESSERTS,
        ingredients: [
            "2 pkgs Crescent roll dough",
            "4 cups frozen whipped topping",
            "1/2 cup icing sugar",
            "1 lemon (zest and juice)",
            "Mixed fruit"
        ],
        instructions: [
            "Bake crescent rolls flat until golden.",
            "Mix lemon, topping, sugar. Spread on rolls.",
            "Top with fruit."
        ],
        addedBy: "Nan",
        timestamp: Date.now()
    },
    // --- END OF BATCH 3 IMPORT ---

    // --- TRANSCRIBED RECIPES IMPORT ---
    {
        id: id(),
        title: "Christmas Morning Wife Saver (Transcribed)",
        category: Category.BREAKFAST,
        ingredients: [
            "16 slices bread (crusts removed)",
            "16 slices Canadian back bacon (or ham)",
            "16 slices sharp cheddar cheese",
            "6 eggs",
            "1/2 tsp pepper",
            "1/2 - 1 tsp dry mustard",
            "1/4 cup minced onion",
            "1/4 cup green pepper (finely chopped)",
            "1-2 tsp Worcestershire sauce",
            "3 cups milk",
            "Dash Tabasco (optional)",
            "1/4 lb butter (1/2 cup)",
            "Special K or Crushed Corn Flakes"
        ],
        instructions: [
            "Butter 9x13 dish.",
            "Fit 8 slices of bread into bottom.",
            "Cover with bacon slices, then cheese slices.",
            "Cover with remaining bread slices.",
            "Beat eggs, pepper, mustard, onion, green pepper, Worcestershire sauce, milk and Tabasco.",
            "Pour over bread mixture.",
            "Cover and refrigerate overnight.",
            "In the morning, melt butter and pour over top.",
            "Sprinkle with Special K or flakes.",
            "Bake uncovered at 350°F for 1 hour. Let set 10 minutes before serving."
        ],
        temp: "350°F",
        cookTime: "1 hour",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Carrot Loaf",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "2 cups flour (assumed)",
            "1 cup white sugar",
            "1 tsp baking powder",
            "1 tsp salt",
            "1 cup grated carrots",
            "1/2 cup chopped walnuts",
            "2 eggs (implied in instructions)",
            "1/2 cup oil (implied in instructions as 'wet ingredients')"
        ],
        instructions: [
            "Mix all wet ingredients (eggs, oil) and beat with dry ingredients.",
            "Bake at 350°F."
        ],
        temp: "350°F",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Hot Crabcake Appetizer",
        category: Category.APPETIZERS,
        ingredients: [
            "1-8oz pkg Cream Cheese (melted)",
            "1-7 1/2 oz can crabmeat (drained)",
            "2 tbsp finely chopped onion",
            "2 tbsp Heinz Chili Sauce",
            "1/2 tsp salt, pepper (to taste)",
            "1/3 cup sliced almonds (toasted)"
        ],
        instructions: [
            "Combine all ingredients except almonds mixing until well blended.",
            "Spoon mixture into 9 inch pie plate.",
            "Sprinkle with almonds.",
            "Bake at 350°F for 20 minutes (implied standard)."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Peanut Butter Balls (Transcribed)",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup peanut butter",
            "1 cup icing sugar",
            "1/2 cup nuts (chopped)",
            "1 cup melted butter",
            "1 tbsp vanilla",
            "2 cups Rice Krispies",
            "1 1/2 cups coconut"
        ],
        instructions: [
            "Add peanut butter & butter to sugar.",
            "Add rest of ingredients, blending well.",
            "Shape in balls."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Swirl of Cream Cheese Squares",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup Graham Cracker Crumbs",
            "1/4 cup sugar",
            "1/3 cup butter or margarine (melted)",
            "1 pkg (8oz) Cream Cheese",
            "1/4 cup sugar",
            "1 egg",
            "1 tbsp milk",
            "1 tbsp lemon juice",
            "3/4 cup crushed Pineapple (drained)"
        ],
        instructions: [
            "Combine crumbs, 1/4 cup sugar and butter. Press into bottom of 9-inch pan.",
            "Beat cream cheese, 1/4 cup sugar, egg, milk and lemon juice.",
            "Stir in pineapple.",
            "Pour over crumb crust.",
            "Bake at 350°F for 25-30 minutes."
        ],
        temp: "350°F",
        cookTime: "30 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Cinnamon Kiff / Kells",
        category: Category.DESSERTS,
        ingredients: [
            "1/4 cup margarine",
            "1 cup white sugar",
            "2 eggs",
            "2 cups flour",
            "1 tsp baking powder",
            "1/4 tsp baking soda",
            "2 tsp vanilla",
            "1 cup sour milk"
        ],
        instructions: [
            "Mix margarine, sugar, eggs. Add vanilla.",
            "Add dry ingredients alternately with sour milk.",
            "Topping: 6 tsp flour, sugar, cinnamon, butter (crumbly).",
            "Sprinkle on top.",
            "Bake at 350°F."
        ],
        temp: "350°F",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Biscuits (3 3/4 Cup)",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "3 3/4 cups flour",
            "3 tbsp baking powder",
            "1 tbsp sugar",
            "Pinch of salt",
            "1 pint whipping cream (implied 'of whipping')"
        ],
        instructions: [
            "Mix well.",
            "Bake at 450°F for 15 min approx.",
            "Makes 15 serves."
        ],
        temp: "450°F",
        cookTime: "15 mins",
        yields: "15",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Fruit Pizza (Transcribed)",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup margarine",
            "1 cup brown sugar",
            "1 tsp flour",
            "1/2 tsp salt",
            "2 eggs",
            "2 1/2 cups flour",
            "1/2 tsp soda",
            "250gm cream cheese",
            "1/2 cup white sugar"
        ],
        instructions: [
            "Mix margarine, brown sugar, eggs. Add dry ingredients.",
            "Bake for 10-15 min on pizza pan.",
            "Mix cream cheese and white sugar. Spread over cooled crust.",
            "Top with fruit."
        ],
        cookTime: "15 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "5 Minute Chips",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup butter",
            "1/2 cup milk",
            "2 cups sugar",
            "3 cups oatmeal",
            "1 cup coconut",
            "6 tbsp cocoa",
            "1/2 tsp salt"
        ],
        instructions: [
            "Boil butter, milk, sugar 5 minutes.",
            "Remove from heat.",
            "Stir in oatmeal, coconut, cocoa, salt.",
            "Drop on wax paper. Chill."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pineapple Dessert",
        category: Category.DESSERTS,
        ingredients: [
            "1/4 cup white sugar",
            "1 cup butter",
            "2 egg yolks",
            "1 cup pineapple",
            "1/2 cup flour",
            "2 tbsp cornstarch"
        ],
        instructions: [
            "Cook ingredients until thickened.",
            "Bake at 325°F until slightly brown."
        ],
        temp: "325°F",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Highland Cake (Transcribed)",
        category: Category.DESSERTS,
        ingredients: [
            "1 1/2 cups sifted flour",
            "1 tsp cinnamon",
            "1 tsp cloves",
            "1/2 tsp salt",
            "1 cup sugar",
            "1/2 cup shortening",
            "2 eggs",
            "1 tsp soda",
            "1 cup sour milk",
            "1 cup raisins"
        ],
        instructions: [
            "Sift first four ingredients. Sift again.",
            "Cream shortening and sugar. Add eggs.",
            "Add dry ingredients alternately with milk.",
            "Stir in raisins.",
            "Bake in pan."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Blueberry Muffins (Transcribed)",
        category: Category.BREADS_MUFFINS,
        ingredients: [
            "1 1/2 cups Flour",
            "2 tsp Baking Powder",
            "1/2 tsp salt",
            "1/2 cup butter",
            "1/2 cup sugar",
            "1 egg",
            "1/4 cup milk",
            "1 tsp Vanilla",
            "1 cup blueberries"
        ],
        instructions: [
            "Coat blueberries with 2 tbsp of flour mix.",
            "Cream shortening and sugar. Add egg, milk, vanilla.",
            "Combine creamed mixture with flour.",
            "Fold in blueberries.",
            "Bake at 350°F for 20 min."
        ],
        temp: "350°F",
        cookTime: "20 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Microwave Stir Brownies",
        category: Category.DESSERTS,
        ingredients: [
            "1/2 cup butter/margarine",
            "2 squares unsweetened chocolate (or 6 tbsp cocoa + 2 tbsp fat)",
            "1 cup sugar",
            "2 eggs",
            "3/4 cup flour",
            "1/2 tsp baking powder",
            "1/4 tsp salt",
            "1 tsp vanilla",
            "1/2 cup nuts (optional)"
        ],
        instructions: [
            "In a medium bowl, melt butter and chocolate on High 1 min. Stir.",
            "Stir in sugar, eggs, vanilla.",
            "Stir in flour, baking powder, salt.",
            "Pour into greased 8x8 pan.",
            "Microwave on High 5-6 minutes."
        ],
        cookTime: "6 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Black Boiled Fruit Cake",
        category: Category.DESSERTS,
        ingredients: [
            "1 lb raisins",
            "1 pt currants",
            "1/2 pt dates",
            "2 cups brown sugar",
            "2 cups white sugar",
            "2 cups boiling water",
            "1/2 lb butter",
            "4 cups flour",
            "1 tsp soda",
            "Spices: Cinnamon, Cloves, Nutmeg"
        ],
        instructions: [
            "Boil fruit, sugar, water, butter for 8 min.",
            "Cool.",
            "Add flour, soda, spices.",
            "Bake in 300°F oven for 2-3 hours."
        ],
        temp: "300°F",
        cookTime: "3 hours",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Moose Hunters (Molasses Cookies)",
        category: Category.DESSERTS,
        ingredients: [
            "1 cup Brown Sugar",
            "1 cup Molasses",
            "1 cup milk",
            "2 tsp soda",
            "1/2 cup butter/shortening",
            "Flour (enough to roll)",
            "Ginger, Cinnamon, Salt"
        ],
        instructions: [
            "Mix brown sugar, molasses, butter. Add milk.",
            "Add dry ingredients.",
            "Roll out thick.",
            "Bake at 325°F for 12 mins."
        ],
        temp: "325°F",
        cookTime: "12 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Chocolate Chip Cookies (Transcribed)",
        category: Category.DESSERTS,
        ingredients: [
            "2 1/2 cup flour",
            "1 tsp salt",
            "1 tsp baking soda",
            "3/4 cup butter",
            "3/4 cup brown sugar packed",
            "1 cup white sugar",
            "2 eggs",
            "1 tsp vanilla",
            "1 (12 oz) pkg chocolate chips"
        ],
        instructions: [
            "Cream butter and sugars.",
            "Add eggs and vanilla.",
            "Add dry ingredients and chips.",
            "Bake."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Raisin Cake (Boiled)",
        category: Category.DESSERTS,
        ingredients: [
            "1 lb Raisins",
            "2 Cups Brown Sugar",
            "1/2 cup Shortening",
            "3 cups water (or 2 cups)",
            "1 tsp Salt",
            "1 1/2 tsp Cinnamon",
            "1 tsp Cloves",
            "1 tsp Nutmeg",
            "1 tsp Baking Soda",
            "4 cups Flour"
        ],
        instructions: [
            "Boil raisins, sugar, shortening, water, salt, spices for three min.",
            "Cool.",
            "Add flour and soda.",
            "Bake."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Strawberry Cheesecake",
        category: Category.DESSERTS,
        ingredients: [
            "Graham wafer crumbs for 9x9 pan",
            "3 pkg (8oz) cream cheese",
            "1 cup sugar",
            "1 tbsp Vanilla",
            "4 eggs",
            "Strawberries (cut up)"
        ],
        instructions: [
            "Prepare crust.",
            "Beat cream cheese, sugar, vanilla.",
            "Add eggs one at a time.",
            "Pour over crust.",
            "Top with cut up strawberries."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Green Tomato Chow (Loaf)",
        category: Category.SAUCES,
        ingredients: [
            "4 qts Green Tomatoes (thinly sliced)",
            "8 onions (sliced)",
            "1/2 cup salt",
            "1 qt vinegar",
            "2 cups white sugar",
            "2 cups brown sugar",
            "Mixed pickling spices (in a cheesecloth bag)"
        ],
        instructions: [
            "Let tomatoes and onions stand with salt overnight. Drain.",
            "Mix vinegar, sugars, spices in pot.",
            "Bring to boil, then add tomatoes/onions.",
            "Simmer until tender.",
            "Bottle."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Chow Chow (Version 2)",
        category: Category.SAUCES,
        ingredients: [
            "32 cups green tomatoes",
            "3 to 4 lbs white onions",
            "5 to 6 lbs white sugar",
            "3 pints white vinegar",
            "Pickling spices"
        ],
        instructions: [
            "Cook tomatoes and onions.",
            "Add sugar, vinegar, and spices.",
            "Boil until thick."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Pickled Beets",
        category: Category.SAUCES,
        ingredients: [
            "Beets (cooked and sliced)",
            "6 cups vinegar",
            "3 cups sugar",
            "3 cups water",
            "1 tbsp celery salt (or seed)",
            "Enough for 10 pts Beets"
        ],
        instructions: [
            "Cook and slice beets.",
            "Mix vinegar, sugar, water, salt.",
            "Boil syrup.",
            "Pour over beets in jars."
        ],
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    },
    {
        id: id(),
        title: "Saucy Chicken Asparagus (Transcribed)",
        category: Category.MAIN_DISHES,
        ingredients: [
            "1-2 lbs fresh asparagus spears (halved)",
            "4 boneless skinless chicken breasts halves",
            "1 1/2 tsp Salt",
            "1/2 tsp Pepper",
            "1 can condensed cream of chicken soup (undiluted)",
            "1/2 cup mayonnaise",
            "1 tsp lemon juice",
            "1/2 tsp curry powder",
            "1 cup (4oz) Shredded cheddar cheese"
        ],
        instructions: [
            "Layer asparagus and chicken in baking dish.",
            "Mix soup, mayo, lemon juice, curry, salt, pepper.",
            "Pour over chicken.",
            "Bake at 375°F for 45 min.",
            "Top with cheese and bake 5-10 min longer."
        ],
        temp: "375°F",
        cookTime: "55 mins",
        addedBy: "Nan (Transcribed)",
        timestamp: Date.now()
    }
];