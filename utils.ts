// Custom Error Class for Application-level errors
export class AppError extends Error {
  constructor(message: string, public code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'AppError';
  }
}

// Robust ID Generation using Crypto API
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Simulated Fetch wrapper to handle mocked CORS/Server policies
export const fetchWithCORS = async (url: string, options: RequestInit = {}) => {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    // Simulate strict CORS headers (would be enforced by backend)
    'X-Requested-With': 'XMLHttpRequest', 
  };
  
  // In a real app, this would fetch from a backend. 
  // Here we just return the config for demonstration.
  return { url, headers };
};