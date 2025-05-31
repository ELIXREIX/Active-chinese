# 🚀 GitHub Pages Deployment Guide

## Quick Deploy Steps

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New" repository
3. Name it `Chinese-word` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### 2. Push Your Code
```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit: Chinese Word Learning Game"

# Add GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Chinese-word.git

# Push to GitHub
git push -u origin main
```

### 3. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Source", select **GitHub Actions**

### 4. Add Environment Secrets
1. In your repository, go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add these secrets:
   - **Name**: `VITE_GOOGLE_SHEETS_API_KEY`
   - **Value**: `your_google_api_key_here`
   
4. Add second secret:
   - **Name**: `VITE_GOOGLE_SHEET_ID`
   - **Value**: `1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ`

### 5. Deploy!
- The GitHub Action will automatically trigger when you push code
- Your site will be available at: `https://YOUR_USERNAME.github.io/Chinese-word/`
- Each push to the `main` branch will automatically redeploy

## 🔧 What's Already Set Up

✅ **GitHub Actions Workflow**: `.github/workflows/deploy.yml`
✅ **Vite Configuration**: Updated for GitHub Pages base path
✅ **Dependencies**: Node.js types installed for build
✅ **Git Ignore**: Test files and build artifacts excluded

## 🧪 Testing Your Deployment

After deployment, test these features:
- [ ] Book selection screen loads
- [ ] Google Sheets data fetches correctly
- [ ] All 4 game modes work
- [ ] Progress saves and restores
- [ ] Mobile responsive design
- [ ] Achievement system functions

## 🔄 Making Updates

To update your deployed app:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: describe your changes"
   git push
   ```
3. GitHub Actions will automatically rebuild and deploy

## 🎯 Your App Features

Your deployed Chinese Word Learning Game includes:
- **1,221 Chinese words** from Google Sheets
- **Book selection**: เล่ม 1 (581 words) & เล่ม 2 (640 words)
- **4 game modes**: Chinese↔Meaning, Chinese↔Pinyin
- **Progress tracking** with local storage
- **Achievement system**
- **Mobile-responsive design**

---

**Ready to deploy? Follow the steps above to get your app live on GitHub Pages! 🎉**
