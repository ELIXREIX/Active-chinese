# GitHub Secrets Setup Guide

## Issue: Production site shows "All 10 Questions" instead of all available words

The problem is that the Google Sheets API credentials are not configured in GitHub Pages deployment.

## Solution: Set up GitHub Repository Secrets

### Step 1: Get Your Google Sheets Information

1. **Get your Google Sheets API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google Sheets API
   - Create credentials (API Key)
   - Copy the API key

2. **Get your Sheet ID:**
   - Open your Google Sheet
   - Look at the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Copy the SHEET_ID part

### Step 2: Add Secrets to GitHub Repository

1. Go to your GitHub repository: https://github.com/ELIXREIX/Active-chinese
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

Add these two secrets:

**Secret 1:**
- Name: `VITE_GOOGLE_SHEETS_API_KEY`
- Value: Your Google Sheets API key

**Secret 2:**
- Name: `VITE_GOOGLE_SHEET_ID`
- Value: Your Google Sheet ID

### Step 3: Trigger a New Deployment

After adding the secrets:
1. Make any small change to your repository (like updating README.md)
2. Commit and push the change
3. This will trigger a new GitHub Actions deployment with the secrets

### Step 4: Verify the Fix

1. Wait for the deployment to complete
2. Visit your site: https://elixreix.github.io/Active-chinese/
3. Select a book and check if it shows the correct number of questions

## Alternative Quick Fix (For Testing)

If you want to test immediately without setting up Google Sheets API, you can temporarily add more sample words to the fallback data:

1. Edit `src/data/words.ts`
2. Add more words to the `sampleWords` array
3. Commit and push

This will give you more than 10 questions while you set up the proper Google Sheets integration.

## Expected Result

Once properly configured, you should see:
- "All 25 Questions" (or however many words you have in your sheet)
- No more "Google Sheets API key or Sheet ID not configured" error in console
