import axios from 'axios';

// Create a generic axios instance
export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for basic error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return custom error object
    return Promise.reject(
      error.response?.data?.message || error.message || 'An unexpected error occurred'
    );
  }
);
