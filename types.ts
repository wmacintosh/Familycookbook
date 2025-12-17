
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
  rating?: number; // Added rating property (0-5)
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

export interface RecipeContextType {
  recipes: Recipe[];
  favorites: string[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  importRecipes: (recipes: Recipe[]) => void;
  loading: boolean;
  error: string | null;
}
