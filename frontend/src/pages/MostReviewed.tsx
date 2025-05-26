import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Avatar,
  Chip,
  Button,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Star,
  StarHalf,
  TrendingUp,
  Download,
  ThumbUp,
  Comment,
  FilterList,
  SortByAlpha,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data for most reviewed servers
const mostReviewedServers = [
  { 
    id: 1, 
    name: 'Smart Analytics Engine', 
    description: 'Advanced data analytics and business intelligence platform',
    category: 'Analytics', 
    totalReviews: 2847, 
    averageRating: 4.9,
    ratingDistribution: { 5: 2456, 4: 312, 3: 56, 2: 15, 1: 8 },
    downloads: 345678,
    author: 'Analytics Pro',
    lastUpdate: '2 days ago',
    highlights: ['Excellent documentation', 'Great performance', 'Easy to use'],
    recentReviews: [
      { user: 'DevUser123', rating: 5, comment: 'Amazing tool! Saved hours of work.', date: '2 days ago' },
      { user: 'DataScientist', rating: 5, comment: 'Best analytics server I\'ve used.', date: '3 days ago' },
    ]
  },
  { 
    id: 2, 
    name: 'Code Quality Checker', 
    description: 'Comprehensive code analysis and quality assessment tool',
    category: 'Development', 
    totalReviews: 2156, 
    averageRating: 4.8,
    ratingDistribution: { 5: 1823, 4: 278, 3: 43, 2: 8, 1: 4 },
    downloads: 198765,
    author: 'CodeQuality Inc',
    lastUpdate: '1 day ago',
    highlights: ['Accurate analysis', 'Great integrations', 'Fast scanning'],
    recentReviews: [
      { user: 'Frontend_Dev', rating: 5, comment: 'Caught bugs I would have missed!', date: '1 day ago' },
      { user: 'TeamLead', rating: 4, comment: 'Good tool, helps maintain code quality.', date: '2 days ago' },
    ]
  },
  { 
    id: 3, 
    name: 'Deployment Automation Suite', 
    description: 'Complete CI/CD pipeline automation and deployment management',
    category: 'DevOps', 
    totalReviews: 1923, 
    averageRating: 4.7,
    ratingDistribution: { 5: 1534, 4: 312, 3: 65, 2: 9, 1: 3 },
    downloads: 167543,
    author: 'DevOps Solutions',
    lastUpdate: '3 hours ago',
    highlights: ['Reliable deployments', 'Good documentation', 'Active support'],
    recentReviews: [
      { user: 'SysAdmin', rating: 5, comment: 'Streamlined our entire deployment process.', date: '5 hours ago' },
      { user: 'CloudEngineer', rating: 4, comment: 'Works well with multiple cloud providers.', date: '1 day ago' },
    ]
  },
  { 
    id: 4, 
    name: 'API Testing Framework', 
    description: 'Comprehensive API testing and validation framework',
    category: 'Testing', 
    totalReviews: 1687, 
    averageRating: 4.6,
    ratingDistribution: { 5: 1234, 4: 356, 3: 78, 2: 15, 1: 4 },
    downloads: 234567,
    author: 'TestTech',
    lastUpdate: '6 hours ago',
    highlights: ['Comprehensive testing', 'Easy setup', 'Good reporting'],
    recentReviews: [
      { user: 'QA_Engineer', rating: 5, comment: 'Makes API testing so much easier!', date: '4 hours ago' },
      { user: 'BackendDev', rating: 4, comment: 'Good coverage of test scenarios.', date: '8 hours ago' },
    ]
  },
  { 
    id: 5, 
    name: 'Performance Monitor Pro', 
    description: 'Real-time application performance monitoring and optimization',
    category: 'Monitoring', 
    totalReviews: 1456, 
    averageRating: 4.8,
    ratingDistribution: { 5: 1203, 4: 201, 3: 42, 2: 7, 1: 3 },
    downloads: 156789,
    author: 'PerfMon Systems',
    lastUpdate: '12 hours ago',
    highlights: ['Real-time monitoring', 'Great visualizations', 'Helpful alerts'],
    recentReviews: [
      { user: 'SiteReliability', rating: 5, comment: 'Excellent monitoring capabilities.', date: '10 hours ago' },
      { user: 'DevOpsEng', rating: 5, comment: 'Helped identify performance bottlenecks.', date: '1 day ago' },
    ]
  },
];

const MostReviewed: React.FC = () => {
  const theme = useTheme();

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return theme.palette.success.main;
    if (rating >= 4.0) return theme.palette.warning.main;
    if (rating >= 3.0) return theme.palette.info.main;
    return theme.palette.error.main;
  };

  const calculatePercentage = (count: number, total: number) => {
    return Math.round((count / total) * 100);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            ⭐ Most Reviewed Servers
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            MCP servers with the highest number of user reviews and ratings
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter by Rating
            </Button>
            <Button variant="outlined" startIcon={<SortByAlpha />}>
              Sort Options
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Review Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  2,847
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Most Reviews
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  4.8
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  87%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  5-Star Reviews
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                  10,069
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Reviews
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Detailed Server List */}
      <Grid container spacing={3}>
        {mostReviewedServers.map((server, index) => (
          <Grid item xs={12} key={server.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card sx={{ '&:hover': { transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Grid container spacing={3}>
                    {/* Server Info */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600, mr: 1 }}>
                            #{index + 1}
                          </Typography>
                          {index < 3 && (
                            <Box sx={{ fontSize: '1.5rem' }}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </Box>
                          )}
                        </Box>
                        <Avatar sx={{ mr: 2, bgcolor: getRatingColor(server.averageRating) }}>
                          <Star />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {server.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {server.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip label={server.category} size="small" variant="outlined" color="primary" />
                            <Typography variant="caption" color="textSecondary">
                              by {server.author} • Updated {server.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Rating Overview */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mr: 1, color: getRatingColor(server.averageRating) }}>
                          {server.averageRating}
                        </Typography>
                        <Box sx={{ mr: 2 }}>
                          <Rating value={server.averageRating} readOnly precision={0.1} />
                          <Typography variant="body2" color="textSecondary">
                            {server.totalReviews.toLocaleString()} reviews
                          </Typography>
                        </Box>
                      </Box>

                      {/* Key Highlights */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          Key Highlights:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {server.highlights.map((highlight, idx) => (
                            <Chip 
                              key={idx}
                              label={highlight} 
                              size="small" 
                              sx={{ 
                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.main 
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Quick Stats */}
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Download sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="textSecondary">
                            {server.downloads.toLocaleString()} downloads
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ThumbUp sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="textSecondary">
                            {calculatePercentage(server.ratingDistribution[5] + server.ratingDistribution[4], server.totalReviews)}% positive
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Rating Distribution */}
                    <Grid item xs={12} md={3}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                        Rating Distribution
                      </Typography>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ minWidth: 20 }}>
                            {rating}
                          </Typography>
                          <Star sx={{ fontSize: 16, color: 'warning.main', mx: 1 }} />
                          <Box 
                            sx={{ 
                              flex: 1, 
                              height: 8, 
                              backgroundColor: alpha(theme.palette.text.primary, 0.1),
                              borderRadius: 1,
                              mr: 1 
                            }}
                          >
                            <Box 
                              sx={{
                                width: `${calculatePercentage(server.ratingDistribution[rating as keyof typeof server.ratingDistribution], server.totalReviews)}%`,
                                height: '100%',
                                backgroundColor: getRatingColor(rating),
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ minWidth: 35, textAlign: 'right' }}>
                            {calculatePercentage(server.ratingDistribution[rating as keyof typeof server.ratingDistribution], server.totalReviews)}%
                          </Typography>
                        </Box>
                      ))}
                    </Grid>

                    {/* Recent Reviews */}
                    <Grid item xs={12} md={3}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                        Recent Reviews
                      </Typography>
                      {server.recentReviews.map((review, idx) => (
                        <Box key={idx} sx={{ mb: 2, p: 2, backgroundColor: alpha(theme.palette.text.primary, 0.02), borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                              {review.user}
                            </Typography>
                            <Rating value={review.rating} readOnly size="small" />
                          </Box>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            "{review.comment}"
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {review.date}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MostReviewed;
