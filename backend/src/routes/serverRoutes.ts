import { Router } from 'express';
import { getMCPServers, getAPIServices } from '../services/dataCollectionService';

const router = Router();

// GET /api/servers/top - Get top servers (MCP or API based on type parameter)
router.get('/top', (req, res) => {
  const { type = 'mcp', limit = 100, page = 1 } = req.query;
  const limitNum = Math.min(parseInt(limit as string), 100);
  const pageNum = Math.max(parseInt(page as string), 1);
  
  const data = type === 'api' 
    ? getAPIServices('requests', limitNum) 
    : getMCPServers('downloads', limitNum);

  res.json({
    success: true,
    data,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: data.length,
      pages: Math.ceil(data.length / limitNum)
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  });
});

// GET /api/servers/fastest-growing - Get fastest growing
router.get('/fastest-growing', (req, res) => {
  const { type = 'mcp', limit = 100 } = req.query;
  const limitNum = Math.min(parseInt(limit as string), 100);
  
  const data = type === 'api'
    ? getAPIServices('growth', limitNum)
    : getMCPServers('growth', limitNum);

  res.json({
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// GET /api/servers/most-downloaded - Get most downloaded/requested
router.get('/most-downloaded', (req, res) => {
  const { type = 'mcp', limit = 100 } = req.query;
  const limitNum = Math.min(parseInt(limit as string), 100);
  
  const data = type === 'api'
    ? getAPIServices('requests', limitNum)
    : getMCPServers('downloads', limitNum);

  res.json({
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// GET /api/servers/most-reviewed - Get most reviewed (MCP) or best uptime (API)
router.get('/most-reviewed', (req, res) => {
  const { type = 'mcp', limit = 100 } = req.query;
  const limitNum = Math.min(parseInt(limit as string), 100);
  
  const data = type === 'api'
    ? getAPIServices('uptime', limitNum)
    : getMCPServers('reviews', limitNum);

  res.json({
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// Search servers
router.get('/search', (req, res) => {
  const { q = '', type = 'mcp' } = req.query;
  const searchTerm = (q as string).toLowerCase();
  
  const allData = type === 'api' 
    ? getAPIServices('requests', 1000)
    : getMCPServers('downloads', 1000);
  
  const filtered = allData.filter(item => 
    item.server.name.toLowerCase().includes(searchTerm) ||
    item.server.description.toLowerCase().includes(searchTerm) ||
    item.server.category.toLowerCase().includes(searchTerm)
  );

  res.json({
    success: true,
    data: filtered.slice(0, 50),
    meta: {
      timestamp: new Date().toISOString(),
      query: q,
      results: filtered.length
    }
  });
});

// Get server by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const allMCP = getMCPServers('downloads', 1000);
  const allAPI = getAPIServices('requests', 1000);
  
  const server = [...allMCP, ...allAPI].find(item => item.server.id === id);
  
  if (!server) {
    return res.status(404).json({
      success: false,
      message: 'Server not found'
    });
  }

  res.json({
    success: true,
    data: server,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

export default router;
