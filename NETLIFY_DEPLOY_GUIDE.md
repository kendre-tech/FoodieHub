# HoodiHub - Netlify Deployment Guide
**Creator:** Dhanashri Kendre  
**Default City:** Latur, Maharashtra, India (413512)  
**Database:** Supabase (`eqvocjukksgtqmgdbjog`)

This project is completely configured and ready to deploy to Netlify!

---

## 🚀 Option 1: Automatic Deployment via GitHub (Recommended)

1. **Push your code to GitHub:**
   - Initialize git repo if not already done:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of HoodiHub with Supabase & Netlify setup"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/hoodihub.git
     git push -u origin main
     ```

2. **Connect to Netlify:**
   - Go to [Netlify App](https://app.netlify.com)
   - Click **"Add new site"** > **"Import an existing project"**
   - Select **GitHub** and choose your `hoodihub` repository.

3. **Verify Build Settings (Auto-detected via `netlify.toml`):**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** *(Leave blank)*

4. **Environment Variables in Netlify (Optional, defaults already bundled):**
   In Netlify dashboard under **Site configuration > Environment variables**, you can verify:
   - `VITE_SUPABASE_URL` = `https://eqvocjukksgtqmgdbjog.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_V2REwz8klxohRj5As7SWhg_6w2jZI5J`

5. Click **"Deploy HoodiHub"**! Within 1-2 minutes, Netlify gives you a live `https://<site-name>.netlify.app` link.

---

## 📦 Option 2: Instant Drag & Drop Deploy (No Git required)

1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the generated `dist` folder into the Netlify drop zone.
4. Your site will immediately go live with a custom `.netlify.app` URL!

---

## ⚙️ Configuration Files Added

- `netlify.toml`: Controls build commands, Node 20 environment, Supabase environment variables, SPA routing redirect to `/index.html`, and caching headers.
- `public/_redirects`: Guarantees seamless client-side page routing (preventing 404 on page refresh).

---

## 🔗 Live Application URLs

- **Current Dev Preview:** `https://ais-dev-tsxpaopreyoo3xjlw6fzrb-10993727974.asia-east1.run.app`
- **Current Permanent Preview:** `https://ais-pre-tsxpaopreyoo3xjlw6fzrb-10993727974.asia-east1.run.app`
- **Supabase Project:** `https://supabase.com/dashboard/project/eqvocjukksgtqmgdbjog`
