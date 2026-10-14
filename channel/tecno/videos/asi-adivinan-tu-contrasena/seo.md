# SEO — Así adivinan tu contraseña en segundos

## Título (elegido: opción 1 — keyword de búsqueda primero, ≤60 chars)

1. **Cómo hackean tu contraseña (y cómo evitarlo)** ← recomendado
2. Así adivinan tu contraseña en segundos
3. Cómo hackean contraseñas: fuerza bruta, filtraciones y más

Keywords de búsqueda: "cómo hackean contraseñas", "contraseña segura", "cómo crear una contraseña
segura", "fuerza bruta contraseña", "qué es un hash", "ataque de diccionario", "credential
stuffing", "gestor de contraseñas", "have i been pwned", "passkeys".
Prueba de demanda: ≈ tema clásico de NetworkChuck / Computerphile. Ver channel/tecno/topic_backlog.md.

## Descripción

```
Pongamos que tu contraseña es Sara2024. Tiene una mayúscula y tiene números. Parece segura. Pues un ordenador normal podría adivinarla en segundos, sin conocerte y sin espiarte. En este vídeo te explico cómo lo hacen y, sobre todo, cómo evitar que te pase a ti.

En este vídeo te explico, sin tecnicismos, cómo hackean las contraseñas de verdad:
- Por qué una web bien hecha no guarda tu contraseña, sino su hash (su huella)
- Las filtraciones de datos y el famoso caso RockYou (2009)
- Fuerza bruta: por qué cada carácter extra multiplica las combinaciones
- Cómo las tarjetas gráficas prueban contraseñas a toda velocidad
- Por qué las webs serias usan fórmulas lentas (como bcrypt) y "sal"
- Ataques de diccionario: por qué 123456 sigue encabezando las listas
- Por qué cambiar letras por símbolos (P@ssw0rd) no te protege
- Relleno de credenciales: el peligro real de repetir la misma contraseña
- Phishing: cuando no la adivinan, te la piden
- Qué te protege de verdad: frases de contraseña, gestor de contraseñas, verificación en dos pasos y llaves de acceso (passkeys)
- Cómo comprobar gratis si tu correo ha aparecido en una filtración (Have I Been Pwned)

Este vídeo es divulgativo y está pensado para que te protejas: explica cómo funcionan los ataques a nivel general, no cómo hacerlos.

Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete: cada semana, una máquina, un invento o una idea explicada fácil.

#Ciberseguridad #Contraseñas #Tecnologia
```

## Capítulos

0:00 Sara2024: una contraseña que parece segura
0:19 Qué es un hash
1:05 Filtraciones: el caso RockYou
1:48 Ataque de fuerza bruta
3:24 Ataque de diccionario
3:55 Por qué cambiar letras por símbolos no sirve
4:33 El peligro de repetir contraseña
5:09 Phishing: no la adivinan, te la piden
5:43 Cómo proteger tus contraseñas

## Tags

```
como hackean contraseñas, contraseña segura, como crear una contraseña segura, hackear contraseñas, fuerza bruta, ataque de fuerza bruta, que es un hash, hash contraseña, ataque de diccionario, rockyou, 123456, credential stuffing, relleno de credenciales, phishing, gestor de contraseñas, verificacion en dos pasos, passkeys, llaves de acceso, have i been pwned, ciberseguridad explicada
```

## Miniatura
texto: TU CONTRASEÑA|EN SEGUNDOS
resaltar: SEGUNDOS
posicion: left

## Shorts
- titulo: Tu contraseña "segura" cae en segundos (y no es por adivinar) | gancho: TU CONTRASEÑA/CAE EN SEGUNDOS | desde: 4_25 | hasta: 5_27
- titulo: El error con tus contraseñas que usa casi todo el mundo | gancho: EL ERROR QUE/COMETE TODO EL MUNDO | desde: 5_27 | hasta: 6_11

## Notas

- Evergreen buscable del backlog (tema #6), no noticia. Se entiende solo, sin referencias a
  otros vídeos del canal.
- Enfoque DEFENSIVO/divulgativo: cada ataque se explica a nivel conceptual. Sin nombres de
  herramientas de cracking, sin comandos, sin pasos. Las únicas herramientas nombradas son
  defensivas (bcrypt como ejemplo de hash lento; Have I Been Pwned para comprobar filtraciones).
- Narración: 8.197 caracteres sin etiquetas de emoción (objetivo 7.800-8.300), 115 líneas.
- Ritmo: frases cortas y casi sin comas dentro de cada línea (15 comas en toda la narración,
  frente a 68 del vídeo de ChatGPT) para que whisper no genere micro-segmentos.
- Hilo conductor: la contraseña de ejemplo "Sara2024" (nombre de la mascota + año) se pone a
  prueba en el gancho, en el bloque de reglas de sustitución y en el cierre. Frase recurrente:
  "Nadie adivina tu contraseña. La prueban." Callback final: "Nadie la adivinó. La probaron."
- Cifras y hechos usados (todos conocidos y verificables; lo dudoso va en cualitativo):
  - Las webs bien hechas guardan un hash (función unidireccional), no la contraseña; la misma
    entrada da siempre el mismo hash y un cambio mínimo da un hash totalmente distinto.
  - RockYou, 2009: brecha que expuso ~32 millones de contraseñas guardadas en texto plano
    (empresa de aplicaciones para redes sociales). La lista se convirtió en referencia para
    estudiar contraseñas reales.
  - PIN de 4 cifras: 10^4 = 10.000 combinaciones.
  - 26 letras minúsculas: 1 letra = 26; 2 letras = 26^2 = 676; 8 letras = 26^8 ≈ 208.800
    millones ("pasas de doscientos mil millones").
  - "Casi cien opciones" por carácter mezclando mayúsculas, minúsculas, números y símbolos
    (95 caracteres ASCII imprimibles).
  - Cajeros/tarjetas bloquean el PIN tras unos pocos intentos fallidos (cualitativo; suele ser 3).
  - GPUs: "miles de millones de intentos por segundo" SOLO con hashes antiguos y rápidos (tipo
    MD5/NTLM en GPUs modernas, del orden de decenas de miles de millones/s); dicho de forma
    conservadora. Con eso 26^8 cae "en cuestión de minutos" (≈208.800 M / varios miles de
    millones por segundo ≈ minutos o menos).
  - bcrypt: hash lento a propósito con factor de coste; las tasas caen en varios órdenes de
    magnitud (cualitativo: "se desploman").
  - Sal: valor aleatorio distinto por contraseña; misma contraseña → hashes distintos.
  - "123456" encabeza casi todas las listas anuales de contraseñas más comunes (NordPass,
    SplashData); "password" y "qwerty" aparecen habitualmente en los primeros puestos.
  - Reglas de sustitución (a→@, o→0, e→3, mayúscula inicial, año o "!" al final): patrón
    conocido que los ataques de diccionario con reglas prueban primero (cualitativo).
  - "Una parte enorme de las contraseñas cae en los primeros minutos": cualitativo, sin %.
  - Gancho "un ordenador normal podría adivinarla en segundos": se matiza explícitamente en el
    guion ("si la web usó una fórmula rápida").
  - Credential stuffing: prueba automatizada de pares correo/contraseña filtrados en otras webs
    ("cientos de webs", cualitativo).
  - Phishing con suplantación de banco/paquetería: cualitativo.
  - Frase de contraseña de 4-5 palabras aleatorias (enfoque tipo Diceware / recomendación
    habitual de organismos de ciberseguridad); sin cifras de entropía.
  - Verificación en dos pasos y passkeys (estándar FIDO/WebAuthn: la clave privada no sale del
    dispositivo y está ligada al dominio real, por eso no funciona en una web falsa).
  - Have I Been Pwned: servicio gratuito y conocido (Troy Hunt) para comprobar si un correo
    aparece en filtraciones conocidas.
- Shorts: rellenar desde/hasta tras whisper. Short 1 = gancho (desde "Pongamos que tu contraseña
  es Sara2024" hasta "...ni siquiera conoce tu contraseña" o hasta el bloque del hash).
  Short 2 = bloque de relleno de credenciales (desde "Pero hay algo todavía más peligroso"
  hasta "...Es tener la misma en todas partes.").
- Miniatura: "EN SEGUNDOS" complementa (no repite) el título recomendado; "NADIE LA ADIVINA"
  apunta al giro central (no la adivinan, la prueban).
