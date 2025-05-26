import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { serverAPI, analyticsAPI, QueryParams, ServerRanking } from '../services/api';
import { useDataSource } from '../contexts/DataSourceContext';

// Custom hook for top servers
export const useTopServers = (params: QueryParams = {}) => {
  const { dataSource } = useDataSource();
  
  return useQuery({
    queryKey: ['topServers', params, dataSource],
    queryFn: async () => {
      // Pass the data source type to the API
      const response = await serverAPI.getTopServers({
        ...params,
        type: dataSource
      } as any);
      
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for live data
  });
};

// Custom hook for fastest growing servers
export const useFastestGrowing = (params: QueryParams = {}) => {
  const { dataSource } = useDataSource();
  
  return useQuery({
    queryKey: ['fastestGrowing', params, dataSource],
    queryFn: async () => {
      const response = await serverAPI.getFastestGrowing({
        ...params,
        type: dataSource
      } as any);
      
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

// Custom hook for most downloaded servers
export const useMostDownloaded = (params: QueryParams = {}) => {
  const { dataSource } = useDataSource();
  
  return useQuery({
    queryKey: ['mostDownloaded', params, dataSource],
    queryFn: async () => {
      const response = await serverAPI.getMostDownloaded({
        ...params,
        type: dataSource
      } as any);
      
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

// Custom hook for most reviewed servers
export const useMostReviewed = (params: QueryParams = {}) => {
  const { dataSource } = useDataSource();
  
  return useQuery({
    queryKey: ['mostReviewed', params, dataSource],
    queryFn: async () => {
      const response = await serverAPI.getMostReviewed({
        ...params,
        type: dataSource
      } as any);
      
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

// Custom hook for server search
export const useServerSearch = (params: QueryParams) => {
  return useQuery({
    queryKey: ['serverSearch', params],
    queryFn: () => serverAPI.searchServers(params),
    enabled: !!params.search, // Only run if search term is provided
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Custom hook for server details
export const useServerDetails = (id: string) => {
  return useQuery({
    queryKey: ['serverDetails', id],
    queryFn: () => serverAPI.getServerById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for server details
  });
};

// Custom hook for analytics data
export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsAPI.getAnalytics(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000, // Refetch every minute for analytics
  });
};

// Custom hook for category statistics
export const useCategoryStats = () => {
  return useQuery({
    queryKey: ['categoryStats'],
    queryFn: () => analyticsAPI.getCategoryStats(),
    staleTime: 10 * 60 * 1000,
  });
};

// Custom hook for trending data
export const useTrendingData = () => {
  return useQuery({
    queryKey: ['trendingData'],
    queryFn: () => analyticsAPI.getTrendingData(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

// Custom hook for infinite scroll pagination
export const useInfiniteServers = (endpoint: 'top' | 'fastest-growing' | 'most-downloaded' | 'most-reviewed', params: QueryParams = {}) => {
  const getServersFn = {
    'top': serverAPI.getTopServers,
    'fastest-growing': serverAPI.getFastestGrowing,
    'most-downloaded': serverAPI.getMostDownloaded,
    'most-reviewed': serverAPI.getMostReviewed,
  }[endpoint];

  return useInfiniteQuery({
    queryKey: ['infiniteServers', endpoint, params],
    queryFn: ({ pageParam = 1 }) => getServersFn({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination && pagination.page < pagination.pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Custom hook for real-time data with WebSocket fallback
export const useRealTimeData = () => {
  // This would connect to WebSocket for real-time updates
  // For now, we'll use polling as fallback
  return useQuery({
    queryKey: ['realTimeData'],
    queryFn: () => analyticsAPI.getAnalytics(),
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
    refetchIntervalInBackground: true,
  });
};
