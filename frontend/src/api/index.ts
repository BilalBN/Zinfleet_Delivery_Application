// crudService.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<T> {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: T;
}

const BASE_URL = 'https://zinfleet-delivery-application-8gjv.onrender.com'; // Replace with your actual base API Ugit statusRL

// const BASE_URL = 'http://localhost:3009'; 

// Generic request function with automatic token retrieval
async function fetchRequest<TResponse, TBody = undefined>(
  endpoint: string,
  { method = 'GET', headers, body }: FetchOptions<TBody> = {}
): Promise<TResponse> {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  // Construct headers with optional Authorization token
  const finalHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  // Add the Authorization header if token is available
  if (token) {
    finalHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<TResponse>;
}

// CRUD operations without needing authToken in parameters
export const apiService = {
  get: <TResponse>(endpoint: string, headers?: HeadersInit) =>
    fetchRequest<TResponse>(endpoint, { method: 'GET', headers }),

  post: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    headers?: HeadersInit
  ) => fetchRequest<TResponse, TBody>(endpoint, { method: 'POST', headers, body }),

  put: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    headers?: HeadersInit
  ) => fetchRequest<TResponse, TBody>(endpoint, { method: 'PUT', headers, body }),

  delete: <TResponse>(endpoint: string, headers?: HeadersInit) =>
    fetchRequest<TResponse>(endpoint, { method: 'DELETE', headers }),
};
