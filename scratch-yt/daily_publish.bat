@echo off
rem Tarea diaria 09:35 (la cuota de YouTube ya se ha renovado): sube lo que quedó pendiente.
rem Si existe pending_long.txt (un slug por línea), publica primero esos vídeos largos y sus Shorts.
cd /d "%~dp0"
echo ===== %date% %time% >> daily_publish.log
if exist pending_long.txt (
  for /f "usebackq delims=" %%v in ("pending_long.txt") do (
    "C:\Python313\python.exe" publish_from_recipe.py --video %%v >> daily_publish.log 2>&1
    "C:\Python313\python.exe" publish_shorts.py --video %%v >> daily_publish.log 2>&1
  )
  del pending_long.txt
)
"C:\Python313\python.exe" publish_shorts.py --pending >> daily_publish.log 2>&1
