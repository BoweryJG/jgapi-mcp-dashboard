import React from 'react';
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
  alpha,
  useTheme,
} from '@mui/material';
import {
  Download,
  Star,
  TrendingUp,
  FilterList,
  SortByAlpha,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for most downloaded servers
const mostDownloadedServers = [
  { 
    id: 1, 
    name: 'Universal File Manager', 
    description: 'Complete file management solution with cloud integration',
    category: 'Utilities', 
    downloads: 1234567, 
    rating: 4.8, 
    monthlyDownloads: [89000, 95000, 103000, 112000, 125000, 134000],
    author: 'FileOps Inc',
    lastUpdate: '1 day ago',
    size: '2.3 MB',
    version: '3.2.1'
  },
  { 
    id: 2, 
    name: 'AI Code Assistant Pro', 
    description: 'Advanced AI-powered code generation and debugging tool',
    category: 'AI/ML', 
    downloads: 987654, 
    rating: 4.9, 
    monthlyDownloads: [78000, 82000, 89000, 95000, 105000, 98000],
    author: 'CodeAI Labs',
    lastUpdate: '3 hours ago',
    size: '5.7 MB',
    version: '2.1.0'
  },
  { 
    id: 3, 
    name: 'Database Connector Suite', 
    description: 'Multi-database connection and management platform',
    category: 'Database', 
    downloads: 876543, 
    rating: 4.7, 
    monthlyDownloads: [65000, 70000, 75000, 82000, 88000, 87000],
    author: 'DataBase Corp',
    lastUpdate: '2 days ago',
    size: '4.1 MB',
    version: '1.8.5'
  },
  { 
    id: 4, 
    name: 'Web Scraper Ultimate', 
    description: 'Professional web scraping with advanced parsing capabilities',
    category: 'Automation', 
    downloads: 765432, 
    rating: 4.6, 
    monthlyDownloads: [58000, 62000, 67000, 73000, 78000, 76000],
    author: 'ScrapeTech',
    lastUpdate: '6 hours ago',
    size: '3.8 MB',
    version: '4.0.2'
  },
  { 
    id: 5, 
    name: 'Security Monitor Plus', 
    description: 'Comprehensive security monitoring and threat detection',
    category: 'Security', 
    downloads: 654321, 
    rating: 4.8, 
    monthlyDownloads: [45000, 48000, 52000, 58000, 65000, 65000],
    author: 'SecureWatch',
    lastUpdate: '5 hours ago',
    size: '6.2 MB',
    version: '2.5.3'
  },
];

const downloadStatsData = [
  { month: 'Jan', downloads: 450000 },
  { month: 'Feb', downloads: 520000 },
  { month: 'Mar', downloads: 610000 },
  { month: 'Apr', downloads: 680000 },
  { month: 'May', downloads: 750000 },
  { month: 'Jun', downloads: 820000 },
];

const MostDownloaded: React.FC = () => {
  const theme = useTheme();

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(0)}K`;
    }
    return downloads.toString();
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
            📥 Most Downloaded Servers
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            The most popular MCP servers by total download count
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

      {/* Download Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Monthly Download Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={downloadStatsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                        borderRadius: 8,
                      }}
                      formatter={(value: any) => [formatDownloads(value), 'Downloads']}
                    />
                    <Bar 
                      dataKey="downloads" 
                      fill={theme.palette.primary.main}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} lg={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      1.2M
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Top Server Downloads
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={6} lg={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                      820K
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      This Month
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                      4.7★
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Average Rating
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
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
              Top 100 Most Downloaded Servers
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Server Details</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Total Downloads</TableCell>
                    <TableCell align="right">Monthly Avg</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell>Version</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mostDownloadedServers.map((server, index) => (
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
                          <Avatar sx={{ mr: 2, bgcolor: theme.palette.success.main }}>
                            <Download />
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
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {formatDownloads(server.downloads)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {server.downloads.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {formatDownloads(server.monthlyDownloads[server.monthlyDownloads.length - 1])}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          this month
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
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {server.size}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={server.version} 
                          size="small"
                          variant="outlined"
                          sx={{ fontFamily: 'monospace' }}
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

export default MostDownloaded;
