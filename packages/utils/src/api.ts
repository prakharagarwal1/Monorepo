export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = 'An unknown error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new ApiError(response.status, errorMessage);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    if (error instanceof ApiError) {
      return { data: null as T, error: error.message };
    }
    // Handle network errors or other non-ApiError
    return { data: null as T, error: error instanceof Error ? error.message : 'Network error' };
  }
}