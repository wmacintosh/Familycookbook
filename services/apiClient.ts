import { fetchWithCORS } from '../utils';
import { config } from '../config';

/**
 * Base API URL - uses environment-specific backend
 */
const API_BASE_URL = config.isDevelopment
    ? 'http://localhost:3001/api'
    : config.apiUrl || '/api';

/**
 * API Client for backend proxy requests
 */
export const apiClient = {
    /**
     * Get cooking tips from Gemini
     */
    async getTips(title: string, ingredients: string[]): Promise<string> {
        const response = await fetchWithCORS(`${API_BASE_URL}/gemini/tips`, {
            method: 'POST',
            body: JSON.stringify({ title, ingredients }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to get tips');
        }

        return data.tips;
    },

    /**
     * Search for ingredient substitutions
     */
    async searchSubstitutions(title: string, query: string): Promise<{ text: string; links: any[] }> {
        const response = await fetchWithCORS(`${API_BASE_URL}/gemini/search`, {
            method: 'POST',
            body: JSON.stringify({ title, query }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to search');
        }

        return { text: data.text, links: data.links };
    },

    /**
     * Generate recipe image
     */
    async generateImage(title: string, description: string | undefined, imageSize: '1K' | '2K' | '4K'): Promise<string> {
        const response = await fetchWithCORS(`${API_BASE_URL}/gemini/image`, {
            method: 'POST',
            body: JSON.stringify({ title, description, imageSize }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to generate image');
        }

        return data.imageUrl;
    },

    /**
     * Generate recipe audio narration
     */
    async generateAudio(title: string, ingredients: string[], instructions: string[]): Promise<string> {
        const response = await fetchWithCORS(`${API_BASE_URL}/gemini/audio`, {
            method: 'POST',
            body: JSON.stringify({ title, ingredients, instructions }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to generate audio');
        }

        return data.audio;
    },
};
