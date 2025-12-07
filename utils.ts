
// Helper to safely get API Key without crashing if process is undefined (Vercel/Vite issue)
export const getApiKey = () => {
  // Try retrieving from Vite's import.meta.env (standard for Vercel+Vite)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      const key = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
      if (key) return key;
    }
  } catch (e) {
    // ignore
  }

  // Fallback to process.env (standard Node/Webpack)
  try {
    if (typeof process !== 'undefined' && process.env) {
       const key = process.env.API_KEY || process.env.VITE_API_KEY;
       if (key) return key;
    }
  } catch (e) {
    // process is not defined
  }
  return "";
};
