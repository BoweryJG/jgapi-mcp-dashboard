import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  ArrowUpward,
  Star,
  Download,
  Visibility,
  FilterList,
  SortByAlpha,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for fastest growing servers
const fastestGrowingServers = [
  { 
    id: 1, 
    name: 'NextGen AI Assistant', 
    description: 'Advanced AI-powered automation server with natural language processing',
    category: 'AI/ML', 
    growthRate: 245.3, 
    downloads: 8934, 
    rating: 4.9, 
    weeklyGrowth: [120, 145, 178, 203, 234, 245, 245],
    trend: 'explosive',
    author: 'TechCorp Labs',
    lastUpdate: '2 hours ago'
  },
  { 
    id: 2, 
    name: 'CloudSync Pro', 
    description: 'Multi-cloud file synchronization and backup solution',
    category: 'Cloud Storage', 
    growthRate: 189.7, 
    downloads: 12543, 
    rating: 4.7, 
    weeklyGrowth: [80, 95, 124, 156, 178, 189, 190],
    trend: 'rising',
    author: 'CloudTech Inc',
    lastUpdate: '5 hours ago'
  },
  { 
    id: 3, 
    name: 'Security Scanner Elite', 
    description: 'Comprehensive security scanning and vulnerability assessment',
    category: 'Security', 
    growthRate: 167.2, 
    downloads: 6789, 
    rating: 4.8, 
    weeklyGrowth: [45, 67, 89, 123, 145, 167, 167],
    trend: 'steady',
    author: 'SecureOps',
    lastUpdate: '1 hour ago'
  },
  { 
    id: 4, 
    name: 'API Gateway Master', 
    description: 'High-performance API gateway with advanced routing capabilities',
    category: 'Networking', 
    growthRate: 143.8, 
    downloads: 9876, 
    rating: 4.6, 
    weeklyGrowth: [70, 85, 102, 124, 138, 143, 144],
    trend: 'rising',
    author: 'NetWork Solutions',
    lastUpdate: '3 hours ago'
  },
  { 
    id: 5, 
    name: 'Data Pipeline Optimizer', 
    description: 'Intelligent data processing and pipeline optimization engine',
    category: 'Data Processing', 
    growthRate: 128.5, 
    downloads: 5432, 
    rating: 4.5, 
    weeklyGrowth: [50, 68, 82, 97, 114, 128, 129],
    trend: 'steady',
    author: 'DataFlow Inc',
    lastUpdate: '4 hours ago'
  },
];

const FastestGrowing: React.FC = () => {
  const [sortBy, setSortBy] = useState('growthRate');
  const [filterBy, setFilterBy] = useState('all');
  const theme = useTheme();

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'explosive': return theme.palette.error.main;
      case 'rising': return theme.palette.warning.main;
      case 'steady': return theme.palette.success.main;
      default: return theme.palette.text.secondary;
    }
  };

  const getTrendIcon = (trend: string) => {
    const color = getTrendColor(trend);
    return <TrendingUp sx={{ color, fontSize: 20 }} />;
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
            🚀 Fastest Growing Servers
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            MCP servers with the highest growth rates in downloads and adoption
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter by Category
            </Button>
            <Button variant="outlined" startIcon={<SortByAlpha />}>
              Sort Options
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Growth Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                  245%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Highest Growth Rate
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {fastestGrowingServers.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Top Growing Servers
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  156%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Average Growth Rate
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  5
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Categories Represented
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Detailed Server List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Top 100 Fastest Growing Servers
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Server Details</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Growth Rate</TableCell>
                    <TableCell align="right">Downloads</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="center">7-Day Trend</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fastestGrowingServers.map((server, index) => (
                    <TableRow 
                      key={server.id}
                      sx={{ 
                        '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.04) },
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            #{index + 1}
                          </Typography>
                          {index < 3 && (
                            <Box
                              sx={{
                                ml: 1,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                backgroundColor: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                              }}
                            >
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                            {server.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {server.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 300 }}>
                              {server.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              by {server.author} • Updated {server.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={server.category} 
                          size="small" 
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {getTrendIcon(server.trend)}
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700, 
                              color: getTrendColor(server.trend),
                              ml: 0.5 
                            }}
                          >
                            +{server.growthRate}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {server.downloads.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {server.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ width: 100, height: 40 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={server.weeklyGrowth.map((value, i) => ({ day: i, growth: value }))}>
                              <Line 
                                type="monotone" 
                                dataKey="growth" 
                                stroke={getTrendColor(server.trend)}
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={server.trend} 
                          size="small"
                          sx={{
                            backgroundColor: alpha(getTrendColor(server.trend), 0.1),
                            color: getTrendColor(server.trend),
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default FastestGrowing;
