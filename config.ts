// Environment Configuration

export const config = {
    apiUrl: (import.meta as any).env?.VITE_API_URL || '',
    enableAnalytics: (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true',
    environment: (import.meta as any).env?.MODE || 'development',
    isDevelopment: (import.meta as any).env?.DEV || false,
    isProduction: (import.meta as any).env?.PROD || false
} as const;
