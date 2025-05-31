# Google Sheets API Setup Guide

## Current Issue
The Google Sheets API is returning 403 errors because the sheet is not publicly accessible via the API.

## Solution Steps

### 1. Make the Google Sheet Publicly Accessible
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ/edit
2. Click the "Share" button (top right)
3. Click "Change to anyone with the link"
4. Set permission to "Viewer"
5. Click "Copy link" and "Done"

### 2. Verify API Key Permissions
Your API key needs to have the Google Sheets API enabled:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Library"
4. Search for "Google Sheets API"
5. Make sure it's enabled

### 3. Alternative: Use Service Account (Recommended for Production)
For better security, consider using a service account:
1. Create a service account in Google Cloud Console
2. Download the JSON credentials file
3. Share the Google Sheet with the service account email
4. Use the service account credentials instead of API key

## Current Status
- ✅ API Key: [SECURE - Set in environment variables]
- ✅ Sheet ID: 1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ
- ❌ Sheet Access: 403 Forbidden (needs public access)

## Test URLs (Replace YOUR_API_KEY with your actual key)
- Metadata: https://sheets.googleapis.com/v4/spreadsheets/1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ?key=YOUR_API_KEY
- Data: https://sheets.googleapis.com/v4/spreadsheets/1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ/values/Sheet1!A1:D10?key=YOUR_API_KEY
