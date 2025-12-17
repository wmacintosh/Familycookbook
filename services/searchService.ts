import { Recipe } from '../types';

// Simulating a backend search service with latency and error handling
class SearchService {
  private recipes: Recipe[] = [];

  // Initialize with current data snapshot
  updateIndex(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  // Simulate Async Server Search
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
          const results = this.recipes.filter(r => 
            r.title.toLowerCase().includes(lowerQuery) || 
            r.ingredients.some(i => i.toLowerCase().includes(lowerQuery)) ||
            (r.description && r.description.toLowerCase().includes(lowerQuery))
          );
          
          resolve(results.slice(0, 10)); // Limit results like a real API
        } catch (error) {
          reject(new Error("Search service failed"));
        }
      }, latency);
    });
  }
}

export const searchService = new SearchService();
