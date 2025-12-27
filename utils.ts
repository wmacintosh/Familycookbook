/**
 * Custom error class for application-level errors
 * @param message - Error message describing what went wrong
 * @param code - Error code for tracking and categorization
 * @param statusCode - HTTP status code (default: 500)
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'UNKNOWN_ERROR',
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Robust ID generation using Crypto API with fallback for older browsers
 * @returns A UUID string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Fetch wrapper with CORS headers for API requests
 * @param url - URL to fetch from
 * @param options - Fetch options
 * @returns Promise resolving to the fetch response
 * @throws AppError if the request fails
 */
export const fetchWithCORS = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new AppError(
        `HTTP error! status: ${response.status}`,
        'FETCH_ERROR',
        response.status
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      error instanceof Error ? error.message : 'Failed to fetch',
      'NETWORK_ERROR'
    );
  }
};