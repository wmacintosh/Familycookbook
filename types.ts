
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
