import { Recipe } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Interface for storage operations
 */
export interface StorageService {
    getRecipes(): Promise<Recipe[]>;
    saveRecipes(recipes: Recipe[]): Promise<void>;
    getFavorites(): Promise<string[]>;
    saveFavorites(favorites: string[]): Promise<void>;
}

/**
 * LocalStorage implementation with error handling
 */
class LocalStorageService implements StorageService {
    private safeSetItem(key: string, value: string): boolean {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                console.error('Storage quota exceeded');
                throw new Error('Storage is full. Please delete some recipes or clear old data.');
            }
            throw error;
        }
    }

    private safeGetItem(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    async getRecipes(): Promise<Recipe[]> {
        const data = this.safeGetItem(STORAGE_KEYS.RECIPES);
        if (!data) return [];

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to parse recipes from storage:', error);
            return [];
        }
    }

    async saveRecipes(recipes: Recipe[]): Promise<void> {
        this.safeSetItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
    }

    async getFavorites(): Promise<string[]> {
        const data = this.safeGetItem(STORAGE_KEYS.FAVORITES);
        if (!data) return [];

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to parse favorites from storage:', error);
            return [];
        }
    }

    async saveFavorites(favorites: string[]): Promise<void> {
        this.safeSetItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
}

// Export singleton instance
export const storageService = new LocalStorageService();
