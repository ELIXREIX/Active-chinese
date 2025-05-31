@echo off
echo ========================================
echo Chinese Word Learning Game - Production Deployment
echo ========================================
echo.

echo [1/3] Building production version...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✅ Build successful!
echo.

echo [2/3] Installing serve package...
call npm install -g serve
echo ✅ Serve package installed!
echo.

echo [3/3] Starting production server...
echo.
echo 🚀 Your app will be available at: http://localhost:3000
echo 📱 Mobile-friendly and ready for production!
echo.
echo Press Ctrl+C to stop the server
echo.
cd dist
call serve -s . -l 3000
