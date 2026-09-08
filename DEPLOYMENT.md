# Deployment Guide

This guide covers deploying Deutsch Chunks to various platforms.

---

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/deutsch-chunks)

**Manual deploy:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
# - Set up project: Yes
# - Project name: deutsch-chunks
# - Directory: ./
# - Override settings: No

# Deploy to production
vercel --prod
```

**Configuration:**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Option 2: Netlify

**One-click deploy:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/deutsch-chunks)

**Manual deploy:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Configuration:**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Setup:**

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/deutsch-chunks/', // Your repo name
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages:
   - Go to repository Settings
   - Pages section
   - Source: Deploy from branch
   - Branch: gh-pages / root

---

### Option 4: Cloudflare Pages

**Setup:**

1. Push code to GitHub
2. Go to Cloudflare Dashboard
3. Pages → Create a project
4. Connect to GitHub repository
5. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy

---

## 📱 PWA Configuration

### Manifest

Update `public/manifest.webmanifest`:

```json
{
  "name": "Deutsch Chunks",
  "short_name": "Deutsch Chunks",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e40af",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Icons

Generate PWA icons:
- 192x192 PNG
- 512x512 PNG
- Place in `public/` directory

### Service Worker

Already configured in `public/sw.js`

---

## 🔧 Environment Variables

Create `.env` for local development:

```bash
# No environment variables needed for basic version
# Future: Add API keys for backend services
```

For production, set environment variables in your hosting platform's dashboard.

---

## 📊 Analytics (Optional)

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-friendly)

Add to `index.html`:

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🎵 Audio Hosting

### Option 1: Same Server (Simple)

Audio files served from same domain:
```
/audio/a1/a1_001.mp3
```

**Pros:** Simple setup
**Cons:** Large bandwidth usage

### Option 2: CDN (Recommended for Production)

Upload audio to CDN:
- Cloudflare R2
- AWS S3 + CloudFront
- Google Cloud Storage

Update audio paths in phrase data:
```typescript
audio: 'https://cdn.yourdomain.com/audio/a1/a1_001.mp3'
```

### Option 3: Separate Audio Server

Host audio on separate subdomain:
```
audio.yourdomain.com/audio/a1/a1_001.mp3
```

---

## 🔒 Security

### HTTPS

All production deployments should use HTTPS (most platforms provide this automatically).

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               media-src 'self' https://cdn.yourdomain.com;">
```

### API Keys

**Never commit API keys to repository!**

Use environment variables:
```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
```

---

## 📈 Performance Optimization

### Build Optimization

Already configured in `vite.config.js`:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Additional Optimizations

1. **Image optimization:**
   ```bash
   npm install -D sharp
   ```

2. **Audio optimization:**
   - Compress audio files
   - Use appropriate bitrates (128-192 kbps for MP3)
   - Consider WebM/OGG formats

3. **Caching:**
   Configure cache headers on your hosting platform:
   ```
   Cache-Control: public, max-age=31536000
   ```

---

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] Build succeeds locally
- [ ] All routes work
- [ ] PWA manifest valid
- [ ] Service worker registers
- [ ] Audio files accessible
- [ ] Dark mode works
- [ ] RTL support works
- [ ] Mobile responsive
- [ ] No console errors

### Post-deployment Testing

1. Test on multiple devices
2. Test offline functionality
3. Test PWA installation
4. Check analytics
5. Monitor error logs

---

## 🔄 CI/CD

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Vercel/Netlify

Automatic deployment on push to main branch (configure in platform dashboard).

---

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test locally first
4. Open an issue on GitHub

---

**Happy deploying! 🚀**
