import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import { errorHandler, notFound } from './middleware/errorMiddleware';
import { logger } from './utils/logger';
import serverRoutes from './routes/serverRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import healthRoutes from './routes/healthRoutes';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { 
  stream: { write: (message) => logger.info(message.trim()) }
}));
app.use(cors({
  origin: IS_PRODUCTION 
    ? process.env.FRONTEND_URL 
    : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/analytics', analyticsRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('subscribe-to-updates', () => {
    socket.join('live-updates');
    logger.info(`Client ${socket.id} subscribed to live updates`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Make io available to routes
app.set('io', io);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 MCP Dashboard API is live!`);
  
  // Start background data collection
  require('./services/dataCollectionService').startDataCollection(io);
});

export default app;
