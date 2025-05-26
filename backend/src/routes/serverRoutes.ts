import { Router } from 'express';
import { 
  getTopServers, 
  getFastestGrowing, 
  getMostDownloaded, 
  getMostReviewed,
  getServerById,
  searchServers
} from '../services/serverService';
import { validateQueryParams } from '../middleware/validationMiddleware';
import { QueryParams, APIResponse, MCPServer, ServerRanking } from '../models/types';

const router = Router();

// GET /api/servers/top - Get top 100 servers overall
router.get('/top', validateQueryParams, async (req, res) => {
  try {
    const params: QueryParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 100,
      category: req.query.category as string,
      sortBy: req.query.sortBy as any || 'downloads',
      sortOrder: req.query.sortOrder as any || 'desc'
    };

    const result = await getTopServers(params);
    
    const response: APIResponse<ServerRanking[]> = {
      success: true,
      data: result.servers,
      pagination: {
        page: params.page!,
        limit: params.limit!,
        total: result.total,
        pages: Math.ceil(result.total / params.limit!)
      },
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top servers',
      data: null
    });
  }
});

// GET /api/servers/fastest-growing - Get fastest growing servers
router.get('/fastest-growing', validateQueryParams, async (req, res) => {
  try {
    const params: QueryParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 100,
      category: req.query.category as string
    };

    const result = await getFastestGrowing(params);
    
    const response: APIResponse<ServerRanking[]> = {
      success: true,
      data: result.servers,
      pagination: {
        page: params.page!,
        limit: params.limit!,
        total: result.total,
        pages: Math.ceil(result.total / params.limit!)
      },
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fastest growing servers',
      data: null
    });
  }
});

// GET /api/servers/most-downloaded - Get most downloaded servers
router.get('/most-downloaded', validateQueryParams, async (req, res) => {
  try {
    const params: QueryParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 100,
      category: req.query.category as string
    };

    const result = await getMostDownloaded(params);
    
    const response: APIResponse<ServerRanking[]> = {
      success: true,
      data: result.servers,
      pagination: {
        page: params.page!,
        limit: params.limit!,
        total: result.total,
        pages: Math.ceil(result.total / params.limit!)
      },
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch most downloaded servers',
      data: null
    });
  }
});

// GET /api/servers/most-reviewed - Get most reviewed servers
router.get('/most-reviewed', validateQueryParams, async (req, res) => {
  try {
    const params: QueryParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 100,
      category: req.query.category as string
    };

    const result = await getMostReviewed(params);
    
    const response: APIResponse<ServerRanking[]> = {
      success: true,
      data: result.servers,
      pagination: {
        page: params.page!,
        limit: params.limit!,
        total: result.total,
        pages: Math.ceil(result.total / params.limit!)
      },
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch most reviewed servers',
      data: null
    });
  }
});

// GET /api/servers/search - Search servers
router.get('/search', validateQueryParams, async (req, res) => {
  try {
    const params: QueryParams = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 50,
      search: req.query.search as string,
      category: req.query.category as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      minRating: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
      sortBy: req.query.sortBy as any || 'downloads',
      sortOrder: req.query.sortOrder as any || 'desc'
    };

    if (!params.search) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
        data: null
      });
    }

    const result = await searchServers(params);
    
    const response: APIResponse<ServerRanking[]> = {
      success: true,
      data: result.servers,
      pagination: {
        page: params.page!,
        limit: params.limit!,
        total: result.total,
        pages: Math.ceil(result.total / params.limit!)
      },
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search servers',
      data: null
    });
  }
});

// GET /api/servers/:id - Get server by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const server = await getServerById(id);
    
    if (!server) {
      return res.status(404).json({
        success: false,
        message: 'Server not found',
        data: null
      });
    }

    const response: APIResponse<MCPServer> = {
      success: true,
      data: server,
      meta: {
        timestamp: new Date(),
        version: '1.0.0',
        requestId: req.headers['x-request-id'] as string || 'unknown'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch server details',
      data: null
    });
  }
});

export default router;
