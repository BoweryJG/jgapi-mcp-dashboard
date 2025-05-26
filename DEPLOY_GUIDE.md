# Deployment Guide: Netlify (Frontend) + Render (Backend)

## Quick Start

This guide will help you deploy your MCP Dashboard with:
- **Frontend**: Netlify (free hosting with automatic deploys)
- **Backend**: Render (free tier with real MCP data from PulseMCP)

## Step 1: Prepare Your Code

### A. Update Backend for Production

The backend is already configured, but ensure these files exist:

**backend/.env.example**:
```
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-app.netlify.app
LOG_LEVEL=info
```

### B. Create a GitHub Repository

```bash
# In your project root
git init
git add .
git commit -m "Initial commit: MCP Dashboard with real data"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/mcp-dashboard.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

### A. Create Render Account
1. Sign up at [render.com](https://render.com) (free)
2. Click "New +" → "Web Service"

### B. Configure Web Service
1. Connect your GitHub account
2. Select your repository
3. Configure:
   - **Name**: `mcp-dashboard-backend`
   - **Region**: Choose nearest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### C. Set Environment Variables
Add these in the Environment tab:
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-app.netlify.app  # Update after Netlify deploy
LOG_LEVEL=info
```

### D. Create Service
Click "Create Web Service". Your backend will be available at:
```
https://mcp-dashboard-backend.onrender.com
```

**Note**: Free tier spins down after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

## Step 3: Deploy Frontend to Netlify

### A. Update API URL

1. Edit `frontend/.env.production`:
```
REACT_APP_API_URL=https://mcp-dashboard-backend.onrender.com/api
```

2. Update `netlify.toml`:
```toml
[build]
  publish = "frontend/build"
  command = "cd frontend && npm install && CI=false npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
  CI = "false"
  REACT_APP_API_URL = "https://mcp-dashboard-backend.onrender.com/api"

[[redirects]]
  from = "/api/*"
  to = "https://mcp-dashboard-backend.onrender.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### B. Deploy to Netlify

#### Option 1: Netlify Dashboard (Recommended)
1. Sign up at [netlify.com](https://netlify.com) (free)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repo
4. Configure:
   - **Base directory**: (leave empty)
   - **Build command**: `cd frontend && npm install && CI=false npm run build`
   - **Publish directory**: `frontend/build`
5. Click "Deploy site"

#### Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build frontend
cd frontend
npm run build

# Deploy
netlify deploy
netlify deploy --prod
```

Your frontend will be available at:
```
https://amazing-mcp-dashboard.netlify.app
```

## Step 4: Final Configuration

### A. Update CORS on Backend

1. Go to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Netlify URL
3. Click "Manual Deploy" → "Deploy latest commit"

### B. (Optional) Custom Domain

Both services support custom domains:
- **Netlify**: Site settings → Domain management
- **Render**: Settings → Custom domains

## Step 5: Keep Backend Awake (Optional)

Since Render free tier sleeps after 15 minutes, you can:

1. Use [UptimeRobot](https://uptimerobot.com/) (free):
   - Create a monitor for `https://mcp-dashboard-backend.onrender.com/api/health`
   - Set interval to 14 minutes
   - This keeps your backend warm

2. Or upgrade to Render Starter plan ($7/month)

## Troubleshooting

### Backend Not Responding
- Check Render logs for errors
- Ensure all environment variables are set
- Wait 30 seconds for cold start on free tier

### CORS Errors
- Verify `FRONTEND_URL` in Render matches your Netlify URL exactly
- Include `https://` in the URL
- Redeploy backend after changing environment variables

### Build Failures
- Check Node version compatibility (18+)
- Ensure all dependencies are in package.json
- Review build logs for specific errors

### API Connection Issues
- Test backend directly: `https://your-backend.onrender.com/api/health`
- Check browser console for errors (F12)
- Verify `REACT_APP_API_URL` includes `/api`

## What You Get

### Live Features
- ✅ Real MCP server data from PulseMCP (4,000+ servers)
- ✅ Live updates every 5 minutes
- ✅ Search and filtering
- ✅ Toggle between MCP and API view
- ✅ Responsive design
- ✅ Dark/light theme

### Performance
- Frontend served via Netlify's global CDN
- Automatic HTTPS/SSL
- Optimized build with code splitting
- Real-time updates via WebSocket

### Cost
- **Netlify Free**: 100GB bandwidth, 300 build minutes/month
- **Render Free**: 750 hours/month (with sleep)
- **Total**: $0/month for moderate traffic

## Next Steps

1. Monitor your apps:
   - Netlify: Check analytics in dashboard
   - Render: View logs and metrics

2. Set up alerts:
   - Netlify: Form submissions, deploy notifications
   - Render: Health check alerts

3. Scale when needed:
   - Upgrade to paid plans for more resources
   - Add database for data persistence
   - Implement user authentication

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Issues**: Create an issue on your GitHub repo

Congratulations! Your MCP Dashboard is now live with real data! 🎉