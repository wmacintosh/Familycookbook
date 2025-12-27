import { useState, useMemo } from 'react';
import { Recipe, Category } from '../types';

/**
 * Custom hook for managing recipe filtering logic
 * @param recipes - Array of recipes to filter
 * @returns Filtered recipes and filter control functions
 */
export const useRecipeFilters = (recipes: Recipe[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            const matchesSearch = !searchTerm ||
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [recipes, searchTerm, categoryFilter]);

    return {
        filteredRecipes,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
    };
};
