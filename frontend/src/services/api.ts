import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://corsproxy.io/?' + encodeURIComponent('https://osbackend-zl1h.onrender.com/api')
  : (process.env.REACT_APP_API_URL || 'http://localhost:5001/api');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add request ID for tracking
    config.headers['x-request-id'] = Math.random().toString(36).substring(7);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface ServerRanking {
  rank: number;
  server: {
    id: string;
    name: string;
    description: string;
    author: string;
    version: string;
    category: string;
    downloads: number;
    rating: number;
    reviews: number;
    growthRate?: number;
    lastUpdated: string;
    tags: string[];
    repository: string;
    website?: string;
    license: string;
    size: string;
  };
  score: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  meta?: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: 'downloads' | 'rating' | 'growth' | 'recent' | 'name';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  tags?: string[];
  author?: string;
  minRating?: number;
}

// Server API functions
export const serverAPI = {
  // Get top servers overall
  getTopServers: async (params: QueryParams = {}): Promise<APIResponse<ServerRanking[]>> => {
    const response = await api.get('/servers/top', { params });
    return response.data;
  },

  // Get fastest growing servers
  getFastestGrowing: async (params: QueryParams = {}): Promise<APIResponse<ServerRanking[]>> => {
    const response = await api.get('/servers/fastest-growing', { params });
    return response.data;
  },

  // Get most downloaded servers
  getMostDownloaded: async (params: QueryParams = {}): Promise<APIResponse<ServerRanking[]>> => {
    const response = await api.get('/servers/most-downloaded', { params });
    return response.data;
  },

  // Get most reviewed servers
  getMostReviewed: async (params: QueryParams = {}): Promise<APIResponse<ServerRanking[]>> => {
    const response = await api.get('/servers/most-reviewed', { params });
    return response.data;
  },

  // Search servers
  searchServers: async (params: QueryParams): Promise<APIResponse<ServerRanking[]>> => {
    const response = await api.get('/servers/search', { params });
    return response.data;
  },

  // Get server by ID
  getServerById: async (id: string): Promise<APIResponse<any>> => {
    const response = await api.get(`/servers/${id}`);
    return response.data;
  },
};

// Analytics API functions
export const analyticsAPI = {
  // Get overall analytics
  getAnalytics: async (): Promise<APIResponse<any>> => {
    const response = await api.get('/analytics/overview');
    return response.data;
  },

  // Get category statistics
  getCategoryStats: async (): Promise<APIResponse<any>> => {
    const response = await api.get('/analytics/categories');
    return response.data;
  },

  // Get trending data
  getTrendingData: async (): Promise<APIResponse<any>> => {
    const response = await api.get('/analytics/trending');
    return response.data;
  },

  // Get platform statistics
  getPlatformStats: async (): Promise<APIResponse<any>> => {
    const response = await api.get('/analytics/platforms');
    return response.data;
  },
};

// Health check
export const healthAPI = {
  checkHealth: async (): Promise<APIResponse<any>> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
