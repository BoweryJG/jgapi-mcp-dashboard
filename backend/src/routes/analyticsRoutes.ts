import { Router } from 'express';
import { getAnalytics } from '../services/dataCollectionService';

const router = Router();

// GET /api/analytics/overview - Get analytics overview
router.get('/overview', (req, res) => {
  const analytics = getAnalytics();
  
  res.json({
    success: true,
    data: analytics,
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  });
});

// GET /api/analytics/categories - Get category statistics
router.get('/categories', (req, res) => {
  const analytics = getAnalytics();
  
  res.json({
    success: true,
    data: analytics.topCategories,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// GET /api/analytics/trending - Get trending data
router.get('/trending', (req, res) => {
  const analytics = getAnalytics();
  
  res.json({
    success: true,
    data: {
      growth: analytics.growth,
      overview: analytics.overview
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

export default router;