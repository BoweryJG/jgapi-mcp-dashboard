# MCP Dashboard - Award-Winning Interface

A comprehensive, real-time dashboard for tracking the top 100 MCP (Model Context Protocol) servers across multiple metrics including growth, downloads, and reviews.

## 🏆 Features

- **Real-time Top 100 Rankings**
  - Fastest Growing MCP Servers
  - Most Downloaded MCP Servers  
  - Most Reviewed MCP Servers
- **Advanced Analytics & Visualizations**
- **Claude Desktop & Claude Code Integration Guides**
- **Responsive, Award-winning UI Design**
- **Dark/Light Theme Support**
- **Real-time Updates via WebSockets**
- **Advanced Search & Filtering**
- **Export Capabilities**

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI v5 (MUI)
- React Router v6
- React Query
- Recharts for data visualization
- Framer Motion for animations
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- WebSocket support
- Redis for caching
- Docker containerization

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: PostgreSQL (Render)

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd JGapiMCPDash
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Start development servers:
```bash
# From root directory
npm run dev
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 📁 Project Structure

```
JGapiMCPDash/
├── frontend/              # React + MUI application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── backend/               # Node.js API server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── models/        # Data models
│   │   └── utils/         # Utility functions
├── docs/                  # Documentation
├── deployment/            # Deployment configurations
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start both frontend and backend in development
npm run build        # Build both frontend and backend for production
npm run test         # Run tests
npm run lint         # Run linting
npm run deploy       # Deploy to production
```

## 🌐 Deployment

### Frontend (Netlify)
The frontend is automatically deployed to Netlify when changes are pushed to the main branch.

### Backend (Render)
The backend is deployed to Render with automatic deployments enabled.

## 📊 Key Metrics Tracked

- **Growth Rate**: Server adoption velocity
- **Download Count**: Total and recent downloads
- **Review Score**: User ratings and feedback
- **Active Users**: Current usage statistics
- **Update Frequency**: Maintenance activity
- **Documentation Quality**: Completeness metrics

## 🔗 Claude Integration

The dashboard includes comprehensive guides for:
- Setting up Claude Desktop with MCP servers
- Using Claude Code with MCP integrations
- Best practices for MCP server development
- Community resources and examples

## 🎨 Design Principles

- **Performance First**: Optimized for speed and responsiveness
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design for all devices
- **Data-Driven**: Clear, actionable insights
- **User-Centric**: Intuitive navigation and interaction

## 📈 Analytics & Monitoring

- Real-time performance metrics
- User engagement tracking
- Error monitoring and alerting
- Performance optimization insights

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Awards & Recognition

This dashboard is designed to meet the highest standards of web application excellence, focusing on:
- Outstanding user experience
- Technical innovation
- Performance optimization
- Accessibility compliance
- Visual design excellence

---

Built with ❤️ for the MCP community
