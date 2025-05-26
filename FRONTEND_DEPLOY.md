# Frontend Deployment to Netlify

Since you already have a backend at `https://osbackend-zl1h.onrender.com`, you only need to deploy the frontend.

## Quick Deploy Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "MCP Dashboard frontend with real data"
git branch -M main

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/mcp-dashboard-frontend.git
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Netlify Dashboard (Easiest)

1. Go to [netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select your repository
4. Netlify will auto-detect the configuration from `netlify.toml`
5. Click "Deploy site"

That's it! Your site will be live in about 2 minutes.

#### Option B: Drag & Drop

1. Build locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Go to [netlify.com](https://app.netlify.com)
3. Drag the `frontend/build` folder to the deployment area
4. Your site is instantly live!

#### Option C: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd frontend
npm run build
netlify deploy
netlify deploy --prod
```

## Your Live URLs

After deployment:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://osbackend-zl1h.onrender.com` (already running)

## Features Available

Your dashboard will have:
- ✅ Real MCP server data (4,000+ servers from PulseMCP)
- ✅ Toggle between MCP servers and API services
- ✅ Live updates every 30 seconds
- ✅ Search and filtering
- ✅ Dark/light theme toggle
- ✅ Responsive design for all devices

## Custom Domain (Optional)

In Netlify dashboard:
1. Go to "Domain settings"
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic and free

## Environment Variables

The API URL is already configured in:
- `.env.production`
- `netlify.toml`

No additional configuration needed!

## Troubleshooting

### API Connection Issues
- The backend URL is already set to `https://osbackend-zl1h.onrender.com/api`
- Check browser console (F12) for any errors
- Ensure your backend has CORS enabled for Netlify domains

### Build Errors
- Make sure you're using Node 18+
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Check build logs in Netlify dashboard

## Next Steps

1. **Monitor Usage**: Check Netlify Analytics
2. **Set Up Alerts**: Get notified of deploy status
3. **Optimize Performance**: Enable Netlify's asset optimization
4. **Add Forms**: Netlify handles form submissions automatically

## Cost

Netlify Free Tier includes:
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic SSL
- Global CDN
- Continuous deployment

This is more than enough for most projects!

---

🎉 **That's it!** Your MCP Dashboard will be live in minutes with real data from 4,000+ MCP servers!