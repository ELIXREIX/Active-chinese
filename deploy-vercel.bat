@echo off
echo ========================================
echo Chinese Word Learning Game - Vercel Deployment
echo ========================================
echo.

echo [1/4] Building production version...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✅ Build successful!
echo.

echo [2/4] Installing Vercel CLI...
call npm install -g vercel
echo ✅ Vercel CLI installed!
echo.

echo [3/4] Deploying to Vercel...
echo.
echo 📝 You will be prompted to:
echo    - Login to Vercel (GitHub/Email)
echo    - Set up your project
echo    - Configure environment variables
echo.
echo 🔧 Don't forget to add these environment variables in Vercel dashboard:
echo    VITE_GOOGLE_SHEETS_API_KEY
echo    VITE_GOOGLE_SHEET_ID
echo.
pause
echo.

echo [4/4] Starting deployment...
call vercel --prod

echo.
echo 🎉 Deployment complete!
echo 🌐 Your app is now live on the internet!
echo 📱 Share the URL with students and teachers!
echo.
pause
