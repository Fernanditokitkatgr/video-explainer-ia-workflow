@echo off
REM Lanza la produccion en una ventana APARTE, desligada del asistente.
REM
REM Las tandas largas se morian a mitad porque colgaban de la sesion de Claude Code:
REM cuando ese proceso se recicla, se lleva por delante lo que tenga debajo. Lanzado
REM asi, la produccion sobrevive aunque el asistente se reinicie o se cierre.
REM
REM Uso:
REM   produce.bat hackear-la-ia
REM   produce.bat hackear-la-ia te-han-hackeado-y-no-lo-sabes que-hacen-con-tu-dni-robado
REM
REM Se puede relanzar las veces que haga falta: cada etapa ya hecha se salta, asi que
REM no duplica trabajo ni gasta creditos de mas.

cd /d "%~dp0"

if "%~1"=="" (
  echo Indica al menos un video. Ejemplo:
  echo    produce.bat hackear-la-ia
  echo.
  echo Videos disponibles:
  python -c "import sys,json; sys.path.insert(0,'scripts'); import config; print('   ' + '\n   '.join(config.load_videos()))"
  exit /b 1
)

start "Produccion de videos" cmd /k python -u scripts\produce.py --videos %*
echo.
echo Produccion lanzada en una ventana aparte.
echo Puedes cerrar esta sin problema: la otra sigue.
echo El progreso tambien se guarda en channel\...\.produce.log
