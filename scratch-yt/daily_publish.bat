@echo off
rem Tarea diaria 09:35 (cuota de YouTube ya renovada): ver daily_publish.py.
cd /d "%~dp0"
echo ===== %date% %time% >> daily_publish.log
"C:\Python313\python.exe" daily_publish.py >> daily_publish.log 2>&1
