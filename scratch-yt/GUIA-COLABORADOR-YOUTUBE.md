# Guía para tu compañero — subir vídeos de "Stick to the Plan" con este pipeline

## Respuesta corta a "¿puedo usar la configuración de Pizarrita?"

**No.** El proyecto de Google Cloud que configuramos hoy (`youtube-automation-503117`) está
ligado a la cuenta `lapizarricatech@gmail.com` como único "usuario de prueba" autorizado — la
app OAuth está en modo **Testing**, así que solo esa cuenta puede completar el login, y
`client_secret.json`/`token.json` no se suben a git (son locales y gitignored a propósito, ver
`.gitignore`).

Tu compañero necesita **su propio proyecto de Google Cloud** ligado a la cuenta de Google que
sea dueña del canal "Stick to the Plan". Es exactamente el mismo proceso que hicimos hoy, ~10
minutos siguiendo estos pasos.

## Paso a paso

1. Entra en **[console.cloud.google.com](https://console.cloud.google.com)** con la cuenta de
   Google que es dueña del canal "Stick to the Plan".
2. **Crear un proyecto nuevo**: menú → "Crear proyecto" → nómbralo algo como
   `youtube-stick-to-plan` → Crear.
3. Con ese proyecto seleccionado, ve a **APIs y servicios → Biblioteca**, busca
   **"YouTube Data API v3"** → **Habilitar**.
4. Ve a **APIs y servicios → Pantalla de consentimiento de OAuth** (puede aparecer como
   "Google Auth Platform" en la interfaz nueva):
   - **Comenzar** → Nombre de la app: algo como `YT Auto Stick to Plan`.
   - Correo de asistencia: su propio email.
   - Tipo de público: **Externo**.
   - Datos de contacto del desarrollador: su propio email.
   - Acepta y crea.
5. En **"Público"** (o "Audience"), confirma que su propia cuenta aparece como usuario de
   prueba (en modo Testing solo esas cuentas pueden autorizar el login).
6. Ve a **"Clientes"** → **Crear cliente de OAuth**:
   - Tipo de aplicación: **Aplicación de escritorio**.
   - Nombre: `YT Auto Stick to Plan Desktop`.
   - Crear → **Descargar JSON inmediatamente** (el secreto solo se muestra una vez).
7. Renombra el archivo descargado a **`client_secret.json`** y colócalo en:
   `scratch-yt/client_secret.json` (en su copia local del repo, tras hacer `git pull`).

## Primera subida

```bash
cd scratch-yt
# opcional: crear su propio entorno si no lo tiene
python3 -m venv .venv && ./.venv/bin/pip install google-api-python-client google-auth-oauthlib google-auth-httplib2

python upload_youtube.py ../remotion/output/<slug>.mp4 \
  --title "Título" \
  --description "Descripción..." \
  --tags tag1,tag2,tag3 \
  --thumbnail ../ruta/a/miniatura.jpg \
  --privacy public
```

- La primera vez abrirá el navegador para el login — debe entrar con la cuenta del canal
  "Stick to the Plan", no con la de Pizarrita.
- Para programar la publicación a una hora futura en vez de subir directo a público, usa
  `--publish-at 2026-07-22T17:00:00Z` (ISO 8601 en UTC) en vez de `--privacy public` — sube
  privado y YouTube lo hace público solo a esa hora, sin que nadie tenga que estar conectado.
- Para subtítulos (`.srt`), hace falta el scope `youtube.force-ssl` además de `youtube` — ya
  está añadido en `SCOPES` dentro de `upload_youtube.py`, así que el login le pedirá permiso
  para ambos automáticamente.

## Gotchas que nos encontramos hoy (para que no le pasen a él)

- **El token de modo Testing caduca a los 7 días** — si `token.json` falla con `invalid_grant`,
  hay que borrarlo y volver a ejecutar para reautorizar.
- **`publishAt` debe estar en el futuro** en el momento de subir — si tarda mucho configurando
  todo esto y la hora planeada ya pasó, hay que recalcular o subir directo a `public`.
- Los scripts `publish_queue.py` / `publish_from_recipe.py` (cola de publicación diaria, un
  vídeo por día a una hora fija) están pensados para usarse igual desde su propia copia del
  repo — cada persona tiene su propio `scratch-yt/publish_queue.json` (gitignored, no se
  comparte), así que las colas de cada canal no interfieren entre sí.
