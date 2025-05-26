import { ServerRanking } from '../services/api';

// Map API data to MCP server format
export const mapAPIToMCPFormat = (apiData: any): ServerRanking => {
  return {
    rank: apiData.position || 1,
    server: {
      id: apiData.id || apiData.name?.toLowerCase().replace(/\s+/g, '-'),
      name: apiData.name || apiData.title,
      description: apiData.description || apiData.summary || '',
      author: apiData.author || apiData.creator || apiData.publisher || 'Unknown',
      version: apiData.version || apiData.latest_version || '1.0.0',
      category: mapAPICategory(apiData.category || apiData.type || 'Other'),
      downloads: apiData.downloads || apiData.install_count || apiData.usage_count || 0,
      rating: apiData.rating || apiData.score || apiData.stars || 4.0,
      reviews: apiData.reviews || apiData.review_count || apiData.feedback_count || 0,
      growthRate: apiData.growth_rate || apiData.growth || calculateGrowthRate(apiData),
      lastUpdated: apiData.last_updated || apiData.updated_at || new Date().toISOString(),
      tags: apiData.tags || apiData.keywords || [],
      repository: apiData.repository || apiData.repo_url || apiData.source_url || '',
      website: apiData.website || apiData.homepage || apiData.docs_url,
      license: apiData.license || 'MIT',
      size: apiData.size || apiData.package_size || 'Unknown'
    },
    score: apiData.score || apiData.ranking_score || calculateScore(apiData),
    change: apiData.change || apiData.rank_change || 0,
    trend: determineTrend(apiData)
  };
};

// Map multiple API items to MCP format
export const mapAPIListToMCPFormat = (apiList: any[]): ServerRanking[] => {
  return apiList.map((item, index) => ({
    ...mapAPIToMCPFormat(item),
    rank: item.rank || index + 1
  }));
};

// Category mapping for different API formats
const mapAPICategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'development': 'Development Tools',
    'dev-tools': 'Development Tools',
    'database': 'Database',
    'db': 'Database',
    'analytics': 'Analytics',
    'metrics': 'Analytics',
    'security': 'Security',
    'auth': 'Security',
    'communication': 'Communication',
    'messaging': 'Communication',
    'utility': 'Utilities',
    'utils': 'Utilities',
    'integration': 'Integration',
    'api': 'Integration',
    'monitoring': 'Monitoring',
    'observability': 'Monitoring',
    'data': 'Data Processing',
    'data-processing': 'Data Processing',
    'ml': 'AI/ML',
    'ai': 'AI/ML',
    'machine-learning': 'AI/ML'
  };

  return categoryMap[category.toLowerCase()] || category;
};

// Calculate growth rate if not provided
const calculateGrowthRate = (data: any): number => {
  if (data.weekly_downloads && data.previous_week_downloads) {
    return ((data.weekly_downloads - data.previous_week_downloads) / data.previous_week_downloads) * 100;
  }
  if (data.monthly_growth) {
    return data.monthly_growth;
  }
  return Math.random() * 20 - 5; // Random growth between -5% and 15%
};

// Calculate score if not provided
const calculateScore = (data: any): number => {
  const downloads = data.downloads || data.install_count || 0;
  const rating = data.rating || data.score || 4.0;
  const reviews = data.reviews || data.review_count || 0;
  
  // Weighted scoring algorithm
  const downloadScore = Math.min(downloads / 10000, 100) * 0.4;
  const ratingScore = (rating / 5) * 100 * 0.4;
  const reviewScore = Math.min(reviews / 100, 100) * 0.2;
  
  return Math.round(downloadScore + ratingScore + reviewScore);
};

// Determine trend based on various indicators
const determineTrend = (data: any): 'up' | 'down' | 'stable' => {
  if (data.trend) return data.trend;
  if (data.rank_change > 0) return 'up';
  if (data.rank_change < 0) return 'down';
  if (data.growth_rate > 5) return 'up';
  if (data.growth_rate < -5) return 'down';
  return 'stable';
};

// Generate mock API data for demonstration
export const generateMockAPIData = (count: number = 100): any[] => {
  const apiNames = [
    'RESTful API Gateway', 'GraphQL Server', 'WebSocket Manager', 'OAuth Provider',
    'Payment Gateway', 'Email Service', 'SMS Gateway', 'Push Notification Service',
    'File Storage API', 'Image Processing API', 'Video Streaming Service', 'Search API',
    'Analytics Engine', 'Logging Service', 'Monitoring API', 'Rate Limiter',
    'Cache Manager', 'Queue Service', 'Workflow Engine', 'Scheduler API',
    'Authentication Service', 'Authorization Engine', 'Encryption Service', 'Tokenizer',
    'Data Pipeline', 'ETL Service', 'Report Generator', 'Export Service',
    'Import Service', 'Validation Engine', 'Translation API', 'Geolocation Service',
    'Weather API', 'Maps Service', 'Routing Engine', 'Geocoding API',
    'Machine Learning API', 'Computer Vision API', 'NLP Service', 'Speech Recognition',
    'Text-to-Speech', 'Recommendation Engine', 'Prediction Service', 'Classification API'
  ];

  const categories = ['development', 'database', 'analytics', 'security', 'communication', 
                     'utility', 'integration', 'monitoring', 'data', 'ml'];

  return Array.from({ length: count }, (_, i) => {
    const name = apiNames[i % apiNames.length] + (i >= apiNames.length ? ` ${Math.floor(i / apiNames.length) + 1}` : '');
    return {
      id: `api-${i + 1}`,
      name,
      description: `${name} - High-performance API service for modern applications`,
      author: `API Provider ${(i % 20) + 1}`,
      version: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}`,
      category: categories[i % categories.length],
      downloads: Math.floor(Math.random() * 100000) + 1000,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviews: Math.floor(Math.random() * 500) + 10,
      growth_rate: Math.round((Math.random() * 40 - 10) * 10) / 10,
      last_updated: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['api', categories[i % categories.length], 'rest', 'json'].slice(0, Math.floor(Math.random() * 3) + 2),
      repository: `https://github.com/api-provider/api-${i + 1}`,
      website: `https://api-${i + 1}.example.com`,
      license: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause'][i % 4],
      size: `${Math.floor(Math.random() * 50) + 1}MB`,
      rank_change: Math.floor(Math.random() * 10) - 5
    };
  });
};