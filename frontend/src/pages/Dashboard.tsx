import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Star,
  ArrowUpward,
} from '@mui/icons-material';
import { useTopServers, useRealTimeData, useAnalytics } from '../hooks/useServerData';

// TabPanel component for tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Mock data for the dashboard
const mockServers = [
  {
    id: 1,
    name: 'Weather API',
    category: 'Weather',
    downloads: 12500,
    rating: 4.8,
    growth: 15,
    status: 'trending',
    reviews: 230,
  },
  {
    id: 2,
    name: 'GitHub Integration',
    category: 'Development',
    downloads: 9800,
    rating: 4.6,
    growth: 8,
    status: 'hot',
    reviews: 185,
  },
  {
    id: 3,
    name: 'News Aggregator',
    category: 'News',
    downloads: 7200,
    rating: 4.2,
    growth: 5,
    status: 'stable',
    reviews: 120,
  },
  {
    id: 4,
    name: 'Image Generator',
    category: 'AI',
    downloads: 15600,
    rating: 4.9,
    growth: 25,
    status: 'trending',
    reviews: 310,
  },
  {
    id: 5,
    name: 'Code Assistant',
    category: 'Development',
    downloads: 18200,
    rating: 4.7,
    growth: 12,
    status: 'hot',
    reviews: 275,
  },
];

const mockMetrics = {
  newThisWeek: 42,
  growthRate: 18,
  activeUsers: 125000,
};

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const { data: serverData, isLoading, error } = useTopServers();
  const { data: analyticsData } = useAnalytics();
  const { data: realTimeData } = useRealTimeData();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        MCP Server Dashboard
      </Typography>

      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 120,
              },
            }}
          >
            <Tab label="All Servers" />
            <Tab label="Fastest Growing" />
            <Tab label="Most Downloaded" />
            <Tab label="Highest Rated" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Server</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Downloads</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Growth</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockServers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {server.name}
                          </Typography>
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {server.reviews} reviews
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
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'success.main' }}
                          >
                            {server.growth}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={server.status}
                          size="small"
                          color={
                            server.status === 'trending' ? 'primary' :
                            server.status === 'hot' ? 'error' :
                            server.status === 'new' ? 'success' : 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Fastest Growing Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Most Downloaded Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Highest Rated Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Live Updates Section */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          🔴 Live Updates
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {mockMetrics.newThisWeek}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                New servers this week
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                +{mockMetrics.growthRate}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Overall growth rate
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {mockMetrics.activeUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active users online
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
