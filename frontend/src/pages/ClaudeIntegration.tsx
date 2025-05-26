import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Alert,
  Paper,
  Tab,
  Tabs,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ExpandMore,
  Computer,
  Terminal,
  CloudDownload,
  Settings,
  PlayArrow,
  CheckCircle,
  Warning,
  Info,
  Code as CodeIcon,
  IntegrationInstructions,
  Lightbulb,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

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
      id={`integration-tabpanel-${index}`}
      aria-labelledby={`integration-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ClaudeIntegration: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const CodeBlock = ({ children, language = 'bash' }: { children: string; language?: string }) => (
    <Paper 
      sx={{ 
        p: 2, 
        backgroundColor: alpha(theme.palette.text.primary, 0.05),
        borderRadius: 2,
        fontFamily: 'monospace',
        overflow: 'auto'
      }}
    >
      <Typography component="pre" variant="body2" sx={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {children}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            🤖 Claude Integration Guide
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
            Complete guide to integrating MCP servers with Claude Desktop and Claude Code
          </Typography>
          <Alert severity="info" sx={{ maxWidth: 800, mx: 'auto' }}>
            This guide covers the latest methods for leveraging MCP servers with Claude's desktop application and command-line tools.
          </Alert>
        </Box>
      </motion.div>

      {/* Main Integration Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 3 }}>
              <Tab label="Claude Desktop" icon={<Computer />} iconPosition="start" />
              <Tab label="Claude Code" icon={<Terminal />} iconPosition="start" />
              <Tab label="Best Practices" icon={<Lightbulb />} iconPosition="start" />
              <Tab label="Troubleshooting" icon={<Warning />} iconPosition="start" />
            </Tabs>
          </Box>

          <CardContent>
            <TabPanel value={tabValue} index={0}>
              {/* Claude Desktop Integration */}
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Setting up MCP Servers with Claude Desktop
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  {/* Installation Steps */}
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CloudDownload sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          1. Install Claude Desktop
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Download and install the latest version of Claude Desktop from the official Anthropic website.
                      </Typography>
                      <CodeBlock>
{`# macOS
curl -O https://claude.ai/download/desktop/mac
# Windows
curl -O https://claude.ai/download/desktop/windows
# Linux
curl -O https://claude.ai/download/desktop/linux`}
                      </CodeBlock>
                      <Alert severity="info" sx={{ mt: 2 }}>
                        Make sure you're running Claude Desktop version 1.0.0 or later for full MCP support.
                      </Alert>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Settings sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          2. Configure MCP Settings
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Navigate to Claude Desktop settings and configure your MCP server connections.
                      </Typography>
                      <CodeBlock language="json">
{`{
  "mcpServers": {
    "file-manager": {
      "command": "npx",
      "args": ["@fileops/universal-file-manager"],
      "env": {
        "API_KEY": "your-api-key-here"
      }
    },
    "database-connector": {
      "command": "node",
      "args": ["/path/to/db-connector/index.js"],
      "env": {
        "DB_CONNECTION": "postgresql://..."
      }
    }
  }
}`}
                      </CodeBlock>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlayArrow sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          3. Start Using MCP Servers
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Once configured, you can interact with MCP servers directly through Claude Desktop's chat interface.
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          Example Commands:
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                            <ListItemText primary="List all files in my project directory" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                            <ListItemText primary="Query my database for user statistics" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                            <ListItemText primary="Analyze this code file for potential improvements" />
                          </ListItem>
                        </List>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Quick Setup Checklist
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                          <ListItemText primary="Download Claude Desktop" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                          <ListItemText primary="Install MCP servers" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                          <ListItemText primary="Configure settings.json" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                          <ListItemText primary="Restart Claude Desktop" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle sx={{ color: 'success.main' }} /></ListItemIcon>
                          <ListItemText primary="Test server connections" />
                        </ListItem>
                      </List>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="textSecondary">
                        Need help? Check our troubleshooting section or contact support.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* Claude Code Integration */}
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Using MCP Servers with Claude Code
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                Claude Code is an agentic command-line tool that lets developers delegate coding tasks to Claude directly from their terminal.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Terminal sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          1. Install Claude Code CLI
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Install the Claude Code command-line interface using npm or download directly from Anthropic.
                      </Typography>
                      <CodeBlock>
{`# Install via npm
npm install -g @anthropic-ai/claude-code

# Or install via curl (macOS/Linux)
curl -fsSL https://claude.ai/install-cli.sh | sh

# Verify installation
claude-code --version`}
                      </CodeBlock>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Settings sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          2. Configure API Access
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Set up your API credentials and configure MCP server integrations.
                      </Typography>
                      <CodeBlock>
{`# Login to Claude
claude-code auth login

# Configure MCP servers
claude-code config add-server file-manager \\
  --command "npx @fileops/universal-file-manager" \\
  --env "API_KEY=your-key"

# List configured servers
claude-code config list-servers`}
                      </CodeBlock>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          3. Advanced Usage Examples
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Powerful examples of using Claude Code with MCP servers for development tasks.
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Code Analysis and Refactoring:
                      </Typography>
                      <CodeBlock>
{`# Analyze code quality across project
claude-code analyze --use-server code-quality-checker \\
  --recursive ./src \\
  --output analysis-report.md

# Refactor based on MCP server suggestions
claude-code refactor ./components/UserDashboard.tsx \\
  --use-server smart-refactor \\
  --apply-suggestions`}
                      </CodeBlock>

                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
                        Database Operations:
                      </Typography>
                      <CodeBlock>
{`# Generate migration scripts
claude-code generate migration \\
  --use-server database-connector \\
  --description "Add user preferences table"

# Optimize database queries
claude-code optimize-queries ./queries/ \\
  --use-server db-optimizer \\
  --target postgresql`}
                      </CodeBlock>

                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
                        Project Automation:
                      </Typography>
                      <CodeBlock>
{`# Auto-generate documentation
claude-code generate docs \\
  --use-server doc-generator \\
  --include-examples \\
  --format markdown

# Set up CI/CD pipeline
claude-code setup-pipeline \\
  --use-server devops-automation \\
  --platform github-actions`}
                      </CodeBlock>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {/* Best Practices */}
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Best Practices for MCP Integration
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Security sx={{ mr: 2, color: 'warning.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Security Guidelines
                        </Typography>
                      </Box>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Use environment variables for sensitive data"
                            secondary="Never hardcode API keys or passwords in configuration files"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Implement proper authentication"
                            secondary="Ensure MCP servers validate user permissions"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Regular security updates"
                            secondary="Keep MCP servers and Claude tools updated"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Lightbulb sx={{ mr: 2, color: 'success.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Performance Optimization
                        </Typography>
                      </Box>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Optimize server startup time"
                            secondary="Use efficient initialization and caching strategies"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Implement proper error handling"
                            secondary="Graceful degradation when servers are unavailable"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Monitor resource usage"
                            secondary="Track memory and CPU usage of MCP servers"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Configuration Templates
                      </Typography>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Development Environment</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CodeBlock language="json">
{`{
  "mcpServers": {
    "development-tools": {
      "command": "node",
      "args": ["./dev-tools/index.js"],
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "true",
        "LOG_LEVEL": "verbose"
      }
    },
    "local-database": {
      "command": "npx",
      "args": ["@db/local-connector"],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "5432"
      }
    }
  }
}`}
                          </CodeBlock>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Production Environment</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CodeBlock language="json">
{`{
  "mcpServers": {
    "analytics-engine": {
      "command": "docker",
      "args": ["run", "--rm", "analytics:latest"],
      "env": {
        "NODE_ENV": "production",
        "API_ENDPOINT": "https://api.example.com",
        "RATE_LIMIT": "1000"
      }
    },
    "secure-vault": {
      "command": "vault-connector",
      "args": ["--secure"],
      "env": {
        "VAULT_ADDR": "\${VAULT_ADDR}",
        "VAULT_TOKEN": "\${VAULT_TOKEN}"
      }
    }
  }
}`}
                          </CodeBlock>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              {/* Troubleshooting */}
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Troubleshooting Common Issues
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {[
                    {
                      issue: "MCP Server Not Starting",
                      symptoms: "Server appears offline in Claude Desktop",
                      solutions: [
                        "Check if the server command path is correct",
                        "Verify all required dependencies are installed",
                        "Review server logs for startup errors",
                        "Ensure proper permissions for the server executable"
                      ]
                    },
                    {
                      issue: "Authentication Failures",
                      symptoms: "Access denied errors when using servers",
                      solutions: [
                        "Verify API keys and credentials are correctly set",
                        "Check environment variable configuration",
                        "Ensure the user has proper permissions",
                        "Review authentication token expiration"
                      ]
                    },
                    {
                      issue: "Performance Issues",
                      symptoms: "Slow response times or timeouts",
                      solutions: [
                        "Monitor server resource usage",
                        "Optimize database queries and operations",
                        "Implement caching strategies",
                        "Consider scaling server resources"
                      ]
                    },
                    {
                      issue: "Connection Timeouts",
                      symptoms: "Servers become unresponsive after time",
                      solutions: [
                        "Increase timeout values in configuration",
                        "Implement connection pooling",
                        "Add health check endpoints",
                        "Review network connectivity"
                      ]
                    }
                  ].map((item, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Warning sx={{ mr: 2, color: 'error.main' }} />
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {item.issue}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {item.symptoms}
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          Solutions:
                        </Typography>
                        <List dense>
                          {item.solutions.map((solution, solutionIndex) => (
                            <ListItem key={solutionIndex}>
                              <ListItemIcon>
                                <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />
                              </ListItemIcon>
                              <ListItemText primary={solution} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Need Additional Help?
                    </Typography>
                    <Typography variant="body2">
                      Join our community Discord server or check the official documentation for more detailed troubleshooting guides and community support.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        Community Discord
                      </Button>
                      <Button variant="outlined" size="small">
                        Documentation
                      </Button>
                    </Box>
                  </Alert>
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ClaudeIntegration;
