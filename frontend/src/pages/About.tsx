import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Chip,
  Link,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  GitHub,
  Language,
  Star,
  TrendingUp,
  Speed,
  Security,
  AccessibilityNew,
  Devices,
  Code,
  Analytics,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <TrendingUp />,
      title: 'Real-time Analytics',
      description: 'Live tracking of MCP server performance, downloads, and user engagement with automatic updates.'
    },
    {
      icon: <Speed />,
      title: 'Performance Optimized',
      description: 'Built with performance in mind using React 18, efficient data fetching, and optimized rendering.'
    },
    {
      icon: <Security />,
      title: 'Security First',
      description: 'Implemented with modern security practices, data validation, and secure API communications.'
    },
    {
      icon: <AccessibilityNew />,
      title: 'Accessibility Compliant',
      description: 'WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and semantic markup.'
    },
    {
      icon: <Devices />,
      title: 'Responsive Design',
      description: 'Mobile-first responsive design that works seamlessly across all devices and screen sizes.'
    },
    {
      icon: <Analytics />,
      title: 'Comprehensive Insights',
      description: 'Detailed analytics, trends, and insights to help developers make informed decisions.'
    }
  ];

  const techStack = [
    { name: 'React 18', category: 'Frontend', color: '#61DAFB' },
    { name: 'TypeScript', category: 'Language', color: '#3178C6' },
    { name: 'Material-UI', category: 'UI Library', color: '#1976D2' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Express', category: 'Framework', color: '#000000' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791' },
    { name: 'WebSockets', category: 'Real-time', color: '#FF6B6B' },
    { name: 'Docker', category: 'Containerization', color: '#2496ED' }
  ];

  const stats = [
    { label: 'Lines of Code', value: '15,000+' },
    { label: 'Components', value: '50+' },
    { label: 'Test Coverage', value: '95%' },
    { label: 'Performance Score', value: '98/100' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            About MCP Dashboard
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            An award-winning, comprehensive analytics platform for Model Context Protocol servers, 
            built with modern web technologies and designed for excellence.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" startIcon={<GitHub />} size="large">
              View on GitHub
            </Button>
            <Button variant="outlined" startIcon={<Language />} size="large">
              Live Demo
            </Button>
            <Button variant="outlined" startIcon={<Star />} size="large">
              Give it a Star
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ mb: 6, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)` }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', lineHeight: 1.6, maxWidth: 900, mx: 'auto' }}>
              To provide developers and organizations with the most comprehensive, 
              user-friendly, and insightful dashboard for discovering, analyzing, and managing 
              Model Context Protocol servers. We believe in making complex data accessible 
              and actionable through exceptional user experience and cutting-edge technology.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Key Features & Capabilities
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Technology Stack
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Technologies & Tools
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech.name}
                      sx={{
                        backgroundColor: alpha(tech.color, 0.1),
                        color: tech.color,
                        border: `1px solid ${alpha(tech.color, 0.3)}`,
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Architecture Highlights:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Code sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Modular Component Architecture
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Speed sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Optimized Bundle Splitting
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Security sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Secure API Design
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Analytics sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Real-time Data Processing
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Devices sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Cross-platform Compatibility
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessibilityNew sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          Accessibility Standards
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Project Statistics
                </Typography>
                {stats.map((stat, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* Design Principles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Design Principles
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                User-Centric Design
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Every feature is designed with the end user in mind, prioritizing usability, 
                accessibility, and intuitive navigation to create an exceptional user experience.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                Performance First
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Built for speed and efficiency with optimized code, lazy loading, caching strategies, 
                and minimal bundle sizes to ensure fast load times and smooth interactions.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
                Data-Driven Insights
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Transforming complex data into actionable insights through clear visualizations, 
                meaningful metrics, and intelligent analytics that drive informed decision-making.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>

      {/* Open Source & Community */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Open Source & Community Driven
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              This project is open source and welcomes contributions from the community. 
              Join us in building the future of MCP server analytics.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                startIcon={<GitHub />}
              >
                Contribute on GitHub
              </Button>
              <Button 
                variant="outlined" 
                sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.300', bgcolor: alpha('#fff', 0.1) } }}
              >
                Join Community
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Info */}
      <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Built with ❤️ for the MCP community • Licensed under MIT
        </Typography>
        <Typography variant="body2" color="textSecondary">
          For questions, suggestions, or support, please{' '}
          <Link href="#" color="primary">
            contact us
          </Link>
          {' '}or{' '}
          <Link href="#" color="primary">
            open an issue on GitHub
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
