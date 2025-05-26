export interface MCPServer {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  category: string;
  downloads: number;
  rating: number;
  reviews: number;
  stars: number;
  forks: number;
  issues: number;
  lastUpdated: Date;
  createdAt: Date;
  tags: string[];
  repository: string;
  website?: string;
  documentation?: string;
  license: string;
  size: string;
  dependencies: string[];
  features: string[];
  screenshots: string[];
  changelog: ChangelogEntry[];
  stats: ServerStats;
}

export interface ServerStats {
  dailyDownloads: number[];
  weeklyDownloads: number[];
  monthlyDownloads: number[];
  downloadHistory: DownloadHistory[];
  ratingDistribution: RatingDistribution;
  growthRate: number;
  activeUsers: number;
  performanceMetrics: PerformanceMetrics;
}

export interface DownloadHistory {
  date: Date;
  count: number;
  platform?: string;
  region?: string;
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface PerformanceMetrics {
  responseTime: number;
  uptime: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface ChangelogEntry {
  version: string;
  date: Date;
  changes: string[];
  type: 'major' | 'minor' | 'patch';
}

export interface ServerRanking {
  rank: number;
  server: MCPServer;
  score: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AnalyticsData {
  totalServers: number;
  totalDownloads: number;
  totalUsers: number;
  averageRating: number;
  categoriesByPopularity: CategoryStats[];
  topAuthors: AuthorStats[];
  trendingTags: TagStats[];
  platformDistribution: PlatformStats[];
  globalMetrics: GlobalMetrics;
}

export interface CategoryStats {
  category: string;
  count: number;
  downloads: number;
  averageRating: number;
}

export interface AuthorStats {
  author: string;
  serverCount: number;
  totalDownloads: number;
  averageRating: number;
}

export interface TagStats {
  tag: string;
  count: number;
  trending: boolean;
}

export interface PlatformStats {
  platform: string;
  downloads: number;
  percentage: number;
}

export interface GlobalMetrics {
  totalServersGrowth: number;
  totalDownloadsGrowth: number;
  newServersThisWeek: number;
  averageRatingTrend: number;
  activeServersCount: number;
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
    timestamp: Date;
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
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface WebSocketEvent {
  type: 'server_update' | 'ranking_change' | 'new_server' | 'analytics_update';
  data: any;
  timestamp: Date;
}
