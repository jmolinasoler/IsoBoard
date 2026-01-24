# IsoBoard - Render.com Deployment Guide

## 🚀 Quick Deploy to Render.com

This guide will help you deploy IsoBoard as a static site on Render.com.

### Prerequisites
- A [Render.com](https://render.com) account (free tier available)
- This repository pushed to GitHub

### Deployment Steps

1. **Push the deployment branch to GitHub:**
   ```bash
   git push origin render-deployment
   ```

2. **Go to Render.com Dashboard:**
   - Navigate to https://dashboard.render.com
   - Click **"New +"** → **"Static Site"**

3. **Connect Your Repository:**
   - Connect your GitHub account if not already connected
   - Select the **IsoBoard** repository
   - Click **"Connect"**

4. **Configure Your Static Site:**
   - **Name:** `isoboard` (or your preferred name)
   - **Branch:** `render-deployment`
   - **Build Command:** Leave empty or use `echo "No build required"`
   - **Publish Directory:** `.` (root directory)
   - Click **"Create Static Site"**

5. **Wait for Deployment:**
   - Render will deploy your site (usually takes 1-2 minutes)
   - You'll receive a URL like: `https://isoboard.onrender.com`

6. **Access Your App:**
   - Click on the provided URL
   - Your IsoBoard tactical whiteboard is now live! 🏀

### Configuration Details

The included `render.yaml` file configures:
- **Service Type:** Static web service
- **Environment:** Static
- **Build Command:** None (static files only)
- **Publish Path:** Root directory (.)
- **Routing:** All routes serve index.html (SPA-like behavior)

### Features on Render.com
- ✅ **Free SSL/HTTPS** - Automatic HTTPS certificates
- ✅ **CDN** - Global content delivery network
- ✅ **Auto-deploys** - Automatic deployments on git push
- ✅ **Custom Domains** - Add your own domain (optional)
- ✅ **Zero Configuration** - Works out of the box

### Updating Your Deployment

To update your deployed site:
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin render-deployment
```

Render will automatically detect changes and redeploy your site.

### Custom Domain (Optional)

To use a custom domain:
1. Go to your site settings on Render
2. Navigate to **"Custom Domains"**
3. Add your domain and follow DNS setup instructions
4. Render provides automatic SSL for custom domains

### Troubleshooting

**Site not loading?**
- Check the deploy logs in Render dashboard
- Ensure all files (especially `index.html` and `js/` folder) are committed
- Verify the branch is `render-deployment`

**Clipboard not working?**
- The site must be served over HTTPS (Render provides this automatically)
- Check browser console for errors

**Images not loading?**
- Ensure the `images/` folder is committed to git
- Check that image paths are relative (not absolute)

### Alternative: Manual Deploy

If you prefer not to use `render.yaml`:
1. Create a new Static Site on Render
2. Manually configure:
   - Branch: `render-deployment`
   - Build Command: (leave empty)
   - Publish Directory: `.`

### Cost

The free tier on Render.com includes:
- 100 GB bandwidth/month
- Automatic SSL
- Unlimited static sites

This is more than sufficient for a tactical whiteboard app.

### Support

For Render.com support:
- Documentation: https://render.com/docs/static-sites
- Community: https://community.render.com

---

**Happy Coaching! 🏀**
