@echo off
echo.
echo ============================================
echo   GitHub Pages Deployment Setup
echo ============================================
echo.
echo 1. Create a new repository on GitHub.com:
echo    - Name: Chinese-word
echo    - Visibility: Public
echo    - Don't initialize with README
echo.
echo 2. Copy this command and replace YOUR_USERNAME:
echo    git remote add origin https://github.com/YOUR_USERNAME/Chinese-word.git
echo.
echo 3. Then run:
echo    git push -u origin main
echo.
echo 4. Go to GitHub Settings ^> Pages ^> Source: GitHub Actions
echo.
echo 5. Add these secrets in Settings ^> Secrets and variables ^> Actions:
echo    VITE_GOOGLE_SHEETS_API_KEY = your_google_api_key_here
echo    VITE_GOOGLE_SHEET_ID = 1REVTJHA3opjk-sJol24Q98cRjiB99o3orZK5leb6kdQ
echo.
echo Your app will be live at: https://YOUR_USERNAME.github.io/Chinese-word/
echo.
pause
