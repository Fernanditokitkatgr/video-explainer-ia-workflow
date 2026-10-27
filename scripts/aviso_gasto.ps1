# Aviso diario del gasto de imágenes de Google (tarea programada "Tecnomono aviso gasto").
# Muestra una ventana con el resumen de scripts/gasto.py. Tope de producción: 250 €.
$repo = Split-Path -Parent $PSScriptRoot
$env:PYTHONIOENCODING = "utf-8"
$texto = & python "$repo\scripts\gasto.py" 2>&1 | Out-String
$texto = $texto.Trim() + "`n`nCifra real: console.cloud.google.com -> Facturación -> Créditos (cuenta viniluar32)."
Add-Content -Path "$repo\gasto_avisos.log" -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm') $texto" -Encoding UTF8
$shell = New-Object -ComObject WScript.Shell
$null = $shell.Popup($texto, 0, "Tecnomono - gasto de imágenes", 64)
