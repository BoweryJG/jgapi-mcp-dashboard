import { Server } from 'socket.io';
import * as cron from 'node-cron';
import axios from 'axios';
import { logger } from '../utils/logger';

// PulseMCP API configuration
const PULSE_MCP_API = 'https://api.pulsemcp.com/v0beta/servers';
const RAPID_API_BASE = 'https://rapidapi.com/hub';

interface MCPServer {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  downloads: number;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  repository: string;
  lastUpdated: string;
  growthRate?: number;
}

interface APIService {
  id: string;
  name: string;
  description: string;
  provider: string;
  version: string;
  requests: number;
  uptime: number;
  latency: number;
  category: string;
  tags: string[];
  documentation: string;
  lastUpdated: string;
  growthRate?: number;
}

// In-memory data store (in production, use a real database)
let mcpServers: MCPServer[] = [];
let apiServices: APIService[] = [];
let lastUpdateTime = new Date();
let realMCPData: any[] = [];
let useRealData = true; // Toggle for real vs synthetic data

// Fetch real MCP servers from PulseMCP
const fetchRealMCPServers = async (): Promise<any[]> => {
  try {
    logger.info('Fetching real MCP server data from PulseMCP...');
    const response = await axios.get(PULSE_MCP_API, {
      timeout: 10000,
      headers: {
        'User-Agent': 'MCP-Dashboard/1.0',
        'Accept': 'application/json'
      }
    });
    
    // PulseMCP returns an object with a 'servers' array
    const data = response.data?.servers || [];
    
    if (Array.isArray(data) && data.length > 0) {
      logger.info(`Fetched ${data.length} MCP servers from PulseMCP`);
      return data;
    }
    
    logger.warn('PulseMCP returned empty or invalid data');
    return [];
  } catch (error: any) {
    logger.error('Failed to fetch MCP servers from PulseMCP:', error.message);
    if (error.response) {
      logger.error('Response status:', error.response.status);
      logger.error('Response data:', error.response.data);
    }
    return [];
  }
};

// Transform PulseMCP data to our format
const transformPulseMCPData = (pulseMCPData: any[]): MCPServer[] => {
  return pulseMCPData.map((server, index) => ({
    id: `mcp-${server.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || index}`,
    name: server.name || `Unknown Server ${index}`,
    description: server.short_description || server.ai_generated_short_description || 'No description available',
    author: server.package_registry === 'npm' ? server.package_name?.split('/')[0]?.substring(1) : 'Unknown',
    version: server.latest_version || '1.0.0',
    downloads: server.package_download_count || Math.floor(Math.random() * 50000),
    rating: server.github_stars ? Math.min(5, 3 + (server.github_stars / 1000)) : 4.0,
    reviews: server.github_stars || 0,
    category: inferCategory(server),
    tags: extractTags(server),
    repository: server.source_code_url || server.url || '',
    lastUpdated: server.updated_at || new Date().toISOString(),
    growthRate: calculateGrowthFromStars(server.github_stars)
  }));
};

// Infer category from server data
const inferCategory = (server: any): string => {
  const name = (server.name || '').toLowerCase();
  const desc = (server.short_description || '').toLowerCase();
  
  if (name.includes('ai') || name.includes('llm') || desc.includes('ai')) return 'AI/ML';
  if (name.includes('db') || name.includes('database') || desc.includes('database')) return 'Database';
  if (name.includes('api') || name.includes('http') || desc.includes('api')) return 'Integration';
  if (name.includes('file') || name.includes('fs') || desc.includes('file')) return 'File System';
  if (name.includes('git') || name.includes('github') || desc.includes('git')) return 'Development Tools';
  if (name.includes('cloud') || name.includes('aws') || desc.includes('cloud')) return 'Cloud Services';
  if (name.includes('chat') || name.includes('slack') || desc.includes('communication')) return 'Communication';
  if (name.includes('auth') || name.includes('security') || desc.includes('auth')) return 'Security';
  return 'Utilities';
};

// Extract tags from server data
const extractTags = (server: any): string[] => {
  const tags = [];
  if (server.package_registry) tags.push(server.package_registry);
  if (server.github_stars > 100) tags.push('popular');
  if (server.name) tags.push(...server.name.toLowerCase().split('-').slice(0, 2));
  return tags.slice(0, 3);
};

// Calculate growth rate based on GitHub stars
const calculateGrowthFromStars = (stars: number): number => {
  if (!stars) return 0;
  if (stars > 1000) return 15 + Math.random() * 10;
  if (stars > 500) return 10 + Math.random() * 10;
  if (stars > 100) return 5 + Math.random() * 10;
  return Math.random() * 10;
};

// Generate realistic MCP server data
const generateMCPServers = (): MCPServer[] => {
  const servers = [
    { name: '@anthropic/claude-tools', author: 'Anthropic', category: 'AI/ML', baseDownloads: 250000 },
    { name: '@github/copilot-mcp', author: 'GitHub', category: 'Development Tools', baseDownloads: 180000 },
    { name: '@openai/gpt-connector', author: 'OpenAI', category: 'AI/ML', baseDownloads: 220000 },
    { name: '@stripe/payment-mcp', author: 'Stripe', category: 'Payment', baseDownloads: 150000 },
    { name: '@aws/s3-mcp', author: 'Amazon', category: 'Cloud Storage', baseDownloads: 200000 },
    { name: '@google/firebase-mcp', author: 'Google', category: 'Database', baseDownloads: 170000 },
    { name: '@slack/workspace-mcp', author: 'Slack', category: 'Communication', baseDownloads: 140000 },
    { name: '@docker/container-mcp', author: 'Docker Inc.', category: 'DevOps', baseDownloads: 160000 },
    { name: '@postgres/database-mcp', author: 'PostgreSQL', category: 'Database', baseDownloads: 190000 },
    { name: '@redis/cache-mcp', author: 'Redis Labs', category: 'Database', baseDownloads: 130000 },
    { name: '@mongodb/atlas-mcp', author: 'MongoDB', category: 'Database', baseDownloads: 145000 },
    { name: '@twilio/communications-mcp', author: 'Twilio', category: 'Communication', baseDownloads: 120000 },
    { name: '@datadog/monitoring-mcp', author: 'Datadog', category: 'Monitoring', baseDownloads: 110000 },
    { name: '@elastic/search-mcp', author: 'Elastic', category: 'Search', baseDownloads: 135000 },
    { name: '@vercel/deployment-mcp', author: 'Vercel', category: 'DevOps', baseDownloads: 125000 },
    { name: '@netlify/hosting-mcp', author: 'Netlify', category: 'DevOps', baseDownloads: 115000 },
    { name: '@supabase/backend-mcp', author: 'Supabase', category: 'Database', baseDownloads: 105000 },
    { name: '@pinecone/vector-mcp', author: 'Pinecone', category: 'AI/ML', baseDownloads: 95000 },
    { name: '@langchain/llm-mcp', author: 'LangChain', category: 'AI/ML', baseDownloads: 100000 },
    { name: '@discord/bot-mcp', author: 'Discord', category: 'Communication', baseDownloads: 130000 },
  ];

  return servers.map((server, index) => {
    const variation = Math.random() * 0.1 - 0.05; // ±5% variation
    const currentDownloads = Math.floor(server.baseDownloads * (1 + variation));
    const previousDownloads = Math.floor(server.baseDownloads * (1 + variation - 0.02));
    const growthRate = ((currentDownloads - previousDownloads) / previousDownloads) * 100;

    return {
      id: `mcp-${index + 1}`,
      name: server.name,
      description: `Enterprise-grade MCP server for ${server.category.toLowerCase()} integration`,
      author: server.author,
      version: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}`,
      downloads: currentDownloads,
      rating: Math.round((4 + Math.random()) * 10) / 10,
      reviews: Math.floor(currentDownloads / 100 + Math.random() * 500),
      category: server.category,
      tags: [server.category.toLowerCase(), 'mcp', 'integration'],
      repository: `https://github.com/${server.author.toLowerCase().replace(/\s+/g, '-')}/${server.name.split('/')[1]}`,
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      growthRate: Math.round(growthRate * 10) / 10
    };
  });
};

// Generate realistic API service data
const generateAPIServices = (): APIService[] => {
  const services = [
    { name: 'Stripe API', provider: 'Stripe', category: 'Payment', baseRequests: 5000000 },
    { name: 'OpenAI API', provider: 'OpenAI', category: 'AI/ML', baseRequests: 4500000 },
    { name: 'Google Maps API', provider: 'Google', category: 'Geolocation', baseRequests: 6000000 },
    { name: 'Twilio SMS API', provider: 'Twilio', category: 'Communication', baseRequests: 3500000 },
    { name: 'SendGrid Email API', provider: 'SendGrid', category: 'Communication', baseRequests: 4000000 },
    { name: 'AWS S3 API', provider: 'Amazon', category: 'Cloud Storage', baseRequests: 7000000 },
    { name: 'GitHub API', provider: 'GitHub', category: 'Development', baseRequests: 5500000 },
    { name: 'Slack API', provider: 'Slack', category: 'Communication', baseRequests: 3000000 },
    { name: 'Firebase Auth API', provider: 'Google', category: 'Authentication', baseRequests: 4200000 },
    { name: 'Cloudinary API', provider: 'Cloudinary', category: 'Media', baseRequests: 2800000 },
    { name: 'Algolia Search API', provider: 'Algolia', category: 'Search', baseRequests: 3200000 },
    { name: 'Auth0 API', provider: 'Auth0', category: 'Authentication', baseRequests: 2500000 },
    { name: 'Mapbox API', provider: 'Mapbox', category: 'Geolocation', baseRequests: 2900000 },
    { name: 'Sentry API', provider: 'Sentry', category: 'Monitoring', baseRequests: 2300000 },
    { name: 'Mixpanel API', provider: 'Mixpanel', category: 'Analytics', baseRequests: 2100000 },
    { name: 'Segment API', provider: 'Segment', category: 'Analytics', baseRequests: 2400000 },
    { name: 'Contentful API', provider: 'Contentful', category: 'CMS', baseRequests: 1900000 },
    { name: 'Shopify API', provider: 'Shopify', category: 'E-commerce', baseRequests: 3800000 },
    { name: 'Square API', provider: 'Square', category: 'Payment', baseRequests: 3300000 },
    { name: 'Plaid API', provider: 'Plaid', category: 'Finance', baseRequests: 2700000 },
  ];

  return services.map((service, index) => {
    const variation = Math.random() * 0.15 - 0.075; // ±7.5% variation
    const currentRequests = Math.floor(service.baseRequests * (1 + variation));
    const previousRequests = Math.floor(service.baseRequests * (1 + variation - 0.03));
    const growthRate = ((currentRequests - previousRequests) / previousRequests) * 100;

    return {
      id: `api-${index + 1}`,
      name: service.name,
      description: `High-performance ${service.category} API with enterprise features`,
      provider: service.provider,
      version: `v${Math.floor(Math.random() * 3) + 1}`,
      requests: currentRequests,
      uptime: 99.5 + Math.random() * 0.49, // 99.5-99.99%
      latency: Math.floor(50 + Math.random() * 150), // 50-200ms
      category: service.category,
      tags: [service.category.toLowerCase(), 'api', 'rest'],
      documentation: `https://docs.${service.provider.toLowerCase()}.com/api`,
      lastUpdated: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
      growthRate: Math.round(growthRate * 10) / 10
    };
  });
};

// Calculate rankings and trends
const calculateRankings = (data: any[], metric: string) => {
  return data
    .sort((a, b) => b[metric] - a[metric])
    .map((item, index) => ({
      rank: index + 1,
      server: item,
      score: Math.round(item[metric] / 1000),
      change: Math.floor(Math.random() * 5) - 2,
      trend: item.growthRate > 5 ? 'up' : item.growthRate < -5 ? 'down' : 'stable'
    }));
};

// Start data collection and real-time updates
export const startDataCollection = async (io: Server) => {
  logger.info('Starting data collection service...');

  // Try to fetch real data first
  const realData = await fetchRealMCPServers();
  if (realData.length > 0) {
    mcpServers = transformPulseMCPData(realData);
    logger.info(`Using real MCP data: ${mcpServers.length} servers`);
  } else {
    // Fall back to synthetic data
    mcpServers = generateMCPServers();
    logger.info('Using synthetic MCP data due to API failure');
  }
  
  // For now, keep API services as synthetic (we'll add real API data later)
  apiServices = generateAPIServices();

  // Update data every 5 minutes (to avoid rate limits)
  cron.schedule('*/5 * * * *', async () => {
    logger.info('Updating server and API data...');
    
    // Try to fetch fresh real data
    if (useRealData) {
      const freshData = await fetchRealMCPServers();
      if (freshData.length > 0) {
        mcpServers = transformPulseMCPData(freshData);
        logger.info(`Updated with real MCP data: ${mcpServers.length} servers`);
      }
    }
    
    // Update synthetic API data with variations
    apiServices = generateAPIServices();
    lastUpdateTime = new Date();

    // Emit updates to connected clients
    io.to('live-updates').emit('data-update', {
      mcpServers: calculateRankings(mcpServers, 'downloads').slice(0, 10),
      apiServices: calculateRankings(apiServices, 'requests').slice(0, 10),
      timestamp: lastUpdateTime
    });

    logger.info('Data update complete and broadcast to clients');
  });

  // Simulate real-time metrics every 5 seconds
  cron.schedule('*/5 * * * * *', () => {
    const metrics = {
      totalMCPDownloads: mcpServers.reduce((sum, s) => sum + s.downloads, 0),
      totalAPIRequests: apiServices.reduce((sum, s) => sum + s.requests, 0),
      activeMCPServers: mcpServers.length,
      activeAPIServices: apiServices.length,
      timestamp: new Date()
    };

    io.to('live-updates').emit('metrics-update', metrics);
  });
};

// Export data access functions
export const getMCPServers = (sortBy: string = 'downloads', limit: number = 100) => {
  const sorted = [...mcpServers].sort((a, b) => {
    switch (sortBy) {
      case 'downloads': return b.downloads - a.downloads;
      case 'rating': return b.rating - a.rating;
      case 'growth': return (b.growthRate || 0) - (a.growthRate || 0);
      case 'reviews': return b.reviews - a.reviews;
      default: return b.downloads - a.downloads;
    }
  });

  return calculateRankings(sorted, sortBy === 'growth' ? 'growthRate' : sortBy).slice(0, limit);
};

export const getAPIServices = (sortBy: string = 'requests', limit: number = 100) => {
  const sorted = [...apiServices].sort((a, b) => {
    switch (sortBy) {
      case 'requests': return b.requests - a.requests;
      case 'uptime': return b.uptime - a.uptime;
      case 'latency': return a.latency - b.latency; // Lower is better
      case 'growth': return (b.growthRate || 0) - (a.growthRate || 0);
      default: return b.requests - a.requests;
    }
  });

  return calculateRankings(sorted, sortBy === 'growth' ? 'growthRate' : sortBy).slice(0, limit);
};

export const getAnalytics = () => {
  const totalMCPDownloads = mcpServers.reduce((sum, s) => sum + s.downloads, 0);
  const totalAPIRequests = apiServices.reduce((sum, s) => sum + s.requests, 0);
  
  return {
    overview: {
      totalMCPServers: mcpServers.length,
      totalAPIServices: apiServices.length,
      totalMCPDownloads,
      totalAPIRequests,
      avgMCPRating: mcpServers.reduce((sum, s) => sum + s.rating, 0) / mcpServers.length,
      avgAPIUptime: apiServices.reduce((sum, s) => sum + s.uptime, 0) / apiServices.length,
      lastUpdated: lastUpdateTime
    },
    topCategories: {
      mcp: getCategoryStats(mcpServers, 'downloads'),
      api: getCategoryStats(apiServices, 'requests')
    },
    growth: {
      mcp: {
        daily: 12.5,
        weekly: 23.4,
        monthly: 34.2
      },
      api: {
        daily: 15.3,
        weekly: 28.7,
        monthly: 42.1
      }
    }
  };
};

const getCategoryStats = (data: any[], metric: string) => {
  const categoryMap = new Map();
  
  data.forEach(item => {
    const current = categoryMap.get(item.category) || { count: 0, total: 0 };
    categoryMap.set(item.category, {
      count: current.count + 1,
      total: current.total + item[metric]
    });
  });

  return Array.from(categoryMap.entries())
    .map(([category, stats]) => ({
      category,
      count: stats.count,
      total: stats.total,
      average: Math.round(stats.total / stats.count)
    }))
    .sort((a, b) => b.total - a.total);
};