import { Recipe } from '../types';
import { DEBOUNCE_DELAYS } from '../constants';

/**
 * Debounce helper function
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

/**
 * Search service for finding recipes with simulated backend latency
 */
class SearchService {
  private recipes: Recipe[] = [];
  private indexUpdateDebounced: (recipes: Recipe[]) => void;

  constructor() {
    // Debounce index updates to prevent excessive re-indexing
    this.indexUpdateDebounced = debounce((recipes: Recipe[]) => {
      this.recipes = recipes;
    }, DEBOUNCE_DELAYS.SEARCH);
  }

  /**
   * Update search index with new recipe data
   * @param recipes - Array of recipes to index
   */
  updateIndex(recipes: Recipe[]) {
    this.indexUpdateDebounced(recipes);
  }

  /**
   * Search recipes asynchronously (simulates backend search)
   * @param query - Search query string
   * @returns Promise resolving to matching recipes
   */
  async searchRecipes(query: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      // Simulate network latency (50-200ms)
      const latency = Math.random() * 150 + 50;

      setTimeout(() => {
        try {
          if (!query.trim()) {
            resolve([]);
            return;
          }

          const lowerQuery = query.toLowerCase();
          const results = this.recipes.filter(
            r =>
              r.title.toLowerCase().includes(lowerQuery) ||
              r.ingredients.some(i => i.toLowerCase().includes(lowerQuery)) ||
              (r.description && r.description.toLowerCase().includes(lowerQuery))
          );

          resolve(results.slice(0, 10)); // Limit results like a real API
        } catch (error) {
          reject(new Error('Search service failed'));
        }
      }, latency);
    });
  }
}

export const searchService = new SearchService();
