# Netlify deployment configuration for MCP Dashboard

## Build Settings

**Build command:** `cd frontend && npm run build`
**Publish directory:** `frontend/build`
**Production branch:** `main`

## Environment Variables

Set these in your Netlify dashboard:

```
REACT_APP_API_URL=https://osbackend-zl1h.onrender.com/api
REACT_APP_WS_URL=wss://osbackend-zl1h.onrender.com
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
```

## Deploy Commands

### Manual Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=frontend/build
```

### Auto Deploy
Push to main branch to trigger automatic deployment.

## Performance Optimizations

- Bundle splitting enabled
- Static asset caching (1 year)
- Gzip compression
- Image optimization
- Service worker for offline caching

## Custom Domain Setup

1. Add your custom domain in Netlify dashboard
2. Update DNS records to point to Netlify
3. SSL certificate will be automatically provisioned

## Monitoring

- Build logs available in Netlify dashboard
- Analytics integrated
- Form submissions (if using Netlify Forms)
- Function logs (if using Netlify Functions)
