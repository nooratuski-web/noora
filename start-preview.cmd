@echo off
cd /d "%~dp0"
set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173 --strictPort
) else (
  "%PORTFOLIO_NODE%" node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173 --strictPort
)
pause
