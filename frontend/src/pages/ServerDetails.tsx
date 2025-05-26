import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  Rating,
  LinearProgress,
  Tab,
  Tabs,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Download,
  Star,
  TrendingUp,
  GitHub,
  Language,
  Security,
  Update,
  BugReport,
  Code,
  Documentation,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Mock server detail data
const mockServerDetails = {
  id: 1,
  name: 'Universal File Manager Pro',
  description: 'A comprehensive file management solution with advanced cloud integration, real-time synchronization, and intelligent organization features.',
  longDescription: 'Universal File Manager Pro is the ultimate solution for managing files across multiple platforms and cloud services. With its intuitive interface and powerful automation features, it streamlines file operations, enhances productivity, and ensures your data is always organized and accessible.',
  category: 'Utilities',
  author: 'FileOps Inc',
  version: '3.2.1',
  size: '2.3 MB',
  downloads: 1234567,
  rating: 4.8,
  totalReviews: 2847,
  github: 'https://github.com/fileops/universal-file-manager',
  website: 'https://fileops.com/universal-manager',
  documentation: 'https://docs.fileops.com/universal-manager',
  license: 'MIT',
  tags: ['file-management', 'cloud-sync', 'automation', 'productivity'],
  features: [
    'Multi-cloud synchronization',
    'Intelligent file organization',
    'Real-time collaboration',
    'Advanced search capabilities',
    'Automated backup systems',
    'Cross-platform compatibility'
  ],
  requirements: {
    node: '>=16.0.0',
    memory: '256MB',
    disk: '50MB',
    network: 'Required for cloud features'
  },
  changelog: [
    { version: '3.2.1', date: '2024-01-15', changes: ['Bug fixes', 'Performance improvements'] },
    { version: '3.2.0', date: '2024-01-10', changes: ['New cloud provider support', 'Enhanced UI'] },
    { version: '3.1.0', date: '2023-12-20', changes: ['Collaboration features', 'API improvements'] }
  ],
  statistics: {
    downloads: [
      { month: 'Jul', count: 89000 },
      { month: 'Aug', count: 95000 },
      { month: 'Sep', count: 103000 },
      { month: 'Oct', count: 112000 },
      { month: 'Nov', count: 125000 },
      { month: 'Dec', count: 134000 }
    ],
    ratings: { 5: 2456, 4: 312, 3: 56, 2: 15, 1: 8 }
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`server-tabpanel-${index}`}
      aria-labelledby={`server-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ServerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mr: 3, 
                      bgcolor: theme.palette.primary.main,
                      fontSize: '2rem'
                    }}
                  >
                    {mockServerDetails.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {mockServerDetails.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                      {mockServerDetails.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip label={mockServerDetails.category} color="primary" />
                      <Chip label={`v${mockServerDetails.version}`} variant="outlined" />
                      <Chip label={mockServerDetails.license} variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      by {mockServerDetails.author}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {mockServerDetails.longDescription}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {mockServerDetails.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ 
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main 
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<Download />} size="large">
                    Install Server
                  </Button>
                  <Button variant="outlined" startIcon={<GitHub />}>
                    View Source
                  </Button>
                  <Button variant="outlined" startIcon={<Documentation />}>
                    Documentation
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Server Statistics
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Downloads
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatDownloads(mockServerDetails.downloads)}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Rating
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mr: 1 }}>
                          {mockServerDetails.rating}
                        </Typography>
                        <Rating value={mockServerDetails.rating} readOnly precision={0.1} />
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {mockServerDetails.totalReviews.toLocaleString()} reviews
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Size: <strong>{mockServerDetails.size}</strong>
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Version: <strong>{mockServerDetails.version}</strong>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        License: <strong>{mockServerDetails.license}</strong>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Information Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 3 }}>
              <Tab label="Overview" icon={<TrendingUp />} iconPosition="start" />
              <Tab label="Features" icon={<Star />} iconPosition="start" />
              <Tab label="Analytics" icon={<TrendingUp />} iconPosition="start" />
              <Tab label="Requirements" icon={<Security />} iconPosition="start" />
              <Tab label="Changelog" icon={<Update />} iconPosition="start" />
            </Tabs>
          </Box>

          <CardContent>
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Download Trends (Last 6 Months)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockServerDetails.statistics.downloads}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                      <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                      <YAxis stroke={theme.palette.text.secondary} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                          borderRadius: 8,
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Rating Distribution
                  </Typography>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 20 }}>
                        {rating}
                      </Typography>
                      <Star sx={{ fontSize: 16, color: 'warning.main', mx: 1 }} />
                      <Box 
                        sx={{ 
                          flex: 1, 
                          mx: 2,
                          height: 8, 
                          backgroundColor: alpha(theme.palette.text.primary, 0.1),
                          borderRadius: 1,
                        }}
                      >
                        <Box 
                          sx={{
                            width: `${(mockServerDetails.statistics.ratings[rating as keyof typeof mockServerDetails.statistics.ratings] / mockServerDetails.totalReviews) * 100}%`,
                            height: '100%',
                            backgroundColor: theme.palette.warning.main,
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                        {mockServerDetails.statistics.ratings[rating as keyof typeof mockServerDetails.statistics.ratings]}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Key Features
              </Typography>
              <Grid container spacing={2}>
                {mockServerDetails.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: alpha(theme.palette.success.main, 0.05), borderRadius: 2 }}>
                      <Star sx={{ color: 'success.main', mr: 2 }} />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance Analytics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        +23%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Growth This Month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                        87%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        5-Star Reviews
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                        #12
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Category Ranking
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                        134K
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Last Month Downloads
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                System Requirements
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Minimum Requirements
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Node.js: <strong>{mockServerDetails.requirements.node}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Memory: <strong>{mockServerDetails.requirements.memory}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Disk Space: <strong>{mockServerDetails.requirements.disk}</strong>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Network: <strong>{mockServerDetails.requirements.network}</strong>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Installation
                      </Typography>
                      <Box sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.05), p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
                        <Typography variant="body2" component="pre">
                          {`npm install universal-file-manager
# or
yarn add universal-file-manager

# Configure your MCP settings
mcp configure --server universal-file-manager`}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Version History
              </Typography>
              {mockServerDetails.changelog.map((version, index) => (
                <Box key={index} sx={{ mb: 3, p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Version {version.version}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {version.date}
                    </Typography>
                  </Box>
                  <Box>
                    {version.changes.map((change, changeIndex) => (
                      <Typography key={changeIndex} variant="body2" sx={{ mb: 0.5 }}>
                        • {change}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </TabPanel>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ServerDetails;
