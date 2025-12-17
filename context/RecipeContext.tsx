import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, RecipeContextType } from '../types';
import { INITIAL_RECIPES } from '../data';
import { searchService } from '../services/searchService';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Data
  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem('shirleys_kitchen_recipes');
      const storedFavs = localStorage.getItem('shirleys_kitchen_favorites');

      if (storedRecipes) {
        // Merge logic to keep new initial recipes while preserving user edits
        const parsedStored: Recipe[] = JSON.parse(storedRecipes);
        const storedMap = new Map(parsedStored.map(r => [r.id, r]));
        
        // Ensure new static recipes are added if not deleted by user
        const mergedRecipes = INITIAL_RECIPES.map(r => {
            if (storedMap.has(r.id)) {
                const stored = storedMap.get(r.id);
                storedMap.delete(r.id); 
                return stored!;
            }
            return r;
        });
        
        // Combine merged + user created
        const finalRecipes = [...mergedRecipes, ...Array.from(storedMap.values())];
        setRecipes(finalRecipes);
        searchService.updateIndex(finalRecipes);
      } else {
        setRecipes(INITIAL_RECIPES);
        searchService.updateIndex(INITIAL_RECIPES);
      }

      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (err) {
      setError("Failed to load recipes. Storage might be corrupted.");
      console.error(err);
      // Fallback
      setRecipes(INITIAL_RECIPES);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persistence
  useEffect(() => {
    if (!loading && recipes.length > 0) {
      localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(recipes));
      searchService.updateIndex(recipes);
    }
  }, [recipes, loading]);

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id];
      localStorage.setItem('shirleys_kitchen_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const importRecipes = (importedRecipes: Recipe[]) => {
    const recipeMap = new Map(recipes.map(r => [r.id, r]));
    importedRecipes.forEach(r => recipeMap.set(r.id, r));
    const mergedList = Array.from(recipeMap.values());
    setRecipes(mergedList);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      favorites,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      importRecipes,
      loading,
      error
    }}>
      {children}
    </RecipeContext.Provider>
  );
};
