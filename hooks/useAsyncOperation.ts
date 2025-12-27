import { useState } from 'react';

/**
 * Custom hook for handling async operations with loading and error states
 * @returns Object containing execute function, loading state, and error state
 */
export const useAsyncOperation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = async <T,>(operation: () => Promise<T>): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            return await operation();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
};
