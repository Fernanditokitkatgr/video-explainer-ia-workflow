@echo off
rem Lo lanza el Programador de tareas de Windows a las 13:30 y 21:30 (30 min tras cada Short de YouTube).
cd /d "%~dp0"
echo ===== %date% %time% >> tiktok_cron.log
"C:\Python313\python.exe" tiktok_api.py next >> tiktok_cron.log 2>&1
