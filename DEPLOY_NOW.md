# 🚀 Quick Manual Deployment Guide

## ✅ Your Build is Ready!

The production build has been successfully created in the `dist/` folder.

## 🎯 Fastest Deployment Options

### **Option 1: Drag & Drop (30 seconds)**
1. Go to **[netlify.com/drop](https://netlify.com/drop)**
2. Drag your `dist` folder from Windows Explorer
3. Drop it on the webpage
4. Get your live URL instantly! 🎉

### **Option 2: Vercel (2 minutes)**
1. Go to **[vercel.com](https://vercel.com)**
2. Sign up with GitHub
3. Click "Import Project"
4. Upload your project folder
5. Add environment variables:
   - `VITE_GOOGLE_SHEETS_API_KEY`
   - `VITE_GOOGLE_SHEET_ID`
6. Deploy! 🚀

### **Option 3: GitHub Pages (5 minutes)**
1. Create new repository on GitHub
2. Upload your project files
3. Go to Settings → Pages
4. Enable Pages from main branch
5. Your app will be live at `username.github.io/repo-name` 🌐

## 🔧 Environment Variables

**⚠️ Important**: For any cloud deployment, add these environment variables:

```
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyCCaKQOOSKJqVOOtpIeZWSOI9f5_YOUR_KEY
VITE_GOOGLE_SHEET_ID=1BZ5rVKgvBl_4c6RwUy0yAOZ_YOUR_SHEET_ID
```

## 🧪 Test Locally First

**Option A**: Run the batch file:
```
deploy-local.bat
```

**Option B**: Manual commands:
```cmd
npm install -g serve
serve -s dist -l 3000
```

Then open: `http://localhost:3000`

## 📱 What You Get

✅ **Full Chinese Word Learning Game**
✅ **Book Selection** (เล่ม 1 & เล่ม 2)
✅ **1,221 Chinese Words** from Google Sheets
✅ **4 Game Modes** (Chinese↔Meaning, Chinese↔Pinyin)
✅ **Mobile Responsive** design
✅ **Progress Tracking** and statistics

## 🎉 Ready to Deploy!

Your production build is clean, optimized, and ready for the world!
Choose your preferred deployment method above and share your educational app! 🇨🇳📚
