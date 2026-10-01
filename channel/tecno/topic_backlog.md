# Backlog de temas — Tecnomono (actualizado 2026-09-29)

Regla de selección, basada en datos REALES del canal (API de YouTube, 26-sep-2026):

| Tipo | Ejemplo nuestro | Vistas |
|---|---|---|
| Explicativo buscable "Así funciona X" | Así funciona REALMENTE la Inteligencia Artificial (en 4 min) | **1.009** |
| Explicativo técnico | Así es una red neuronal por dentro / cómo funcionan los LLM | 225 / 126 |
| Hoja de ruta / carrera | De hacker novato a nivel dios | 129 |
| Noticia de seguridad IA (sep-2026) | o1 mintió, Anthropic dimite, 700 expertos… | **0–15** |

**Conclusión:** con 34 suscriptores casi nadie nos ve en "Inicio"; vivimos de la BÚSQUEDA y de
"Sugeridos". Lo que se busca es evergreen ("cómo funciona", "qué es", "cuánto cobra").
Las noticias caducan en días y nadie teclea su título. Mezcla objetivo por semana:
**4 evergreen buscables + 2 empleo/sueldo + 1 historia/noticia** (la noticia, solo si es enorme).

Leyenda de prueba: ✅ verificado con fuente · ≈ tema clásico de canales grandes, cifra sin verificar.

## Próximos vídeos (orden de producción)

1. **La máquina más importante del mundo (sin ella no hay IA)** — ASML y la litografía EUV.
   - Búsqueda: "cómo se fabrica un chip", "asml", "máquina más importante del mundo"
   - Prueba: ✅ Veritasium, *The Ridiculous Engineering Of The World's Most Important Machine* —
     11,3 M vistas en 7 días (ene-2026), el vídeo más visto de la historia del canal.
   - Ángulo: cada chip de NVIDIA para IA depende de UNA empresa holandesa y de una máquina de
     ~400 M$ que dispara estaño con láser 50.000 veces por segundo.
   - Short: "Solo UNA empresa en el mundo puede fabricar esto… y sin ella no existiría ChatGPT."
2. **Así funciona un procesador por dentro (en 6 minutos)** — de transistores a instrucciones.
   - Búsqueda: "cómo funciona un procesador", "cómo funciona una cpu"
   - Prueba: ≈ Branch Education *How do CPUs work?* (uno de sus vídeos insignia).
   - Short: "Tu móvil tiene 15.000 millones de interruptores… y cada uno se enciende mil millones de veces por segundo."
3. **Por qué NVIDIA vale más que países enteros** — GPUs y por qué la IA las necesita.
   - Búsqueda: "por qué nvidia", "qué es una gpu", "gpu vs cpu"
   - Prueba: ≈ tema recurrente de ColdFusion/Asianometry con vídeos de alto rendimiento.
4. **Así funciona internet de verdad (cables bajo el mar)**
   - Búsqueda: "cómo funciona internet", "cables submarinos"
   - Prueba: ≈ Wendover / Johnny Harris / Vox han hecho versiones con millones de vistas.
5. **Qué pasa de verdad cuando escribes en ChatGPT** — tokens, predicción de palabras.
   - Búsqueda: "cómo funciona chatgpt"
   - Prueba: ✅ nuestro propio "cómo funciona la IA" es el más visto del canal (1.009).
6. **Así adivinan tu contraseña en segundos** — fuerza bruta, diccionarios, filtraciones.
   - Búsqueda: "cómo hackean contraseñas", "contraseña segura"
   - Prueba: ≈ tema clásico de NetworkChuck / Computerphile.
7. **Cuánto cobra un programador en España en 2026 (junior, mid, senior)**
   - Búsqueda: "sueldo programador españa"
   - Prueba: ✅ en nuestros Shorts/vídeos de empleo el bloque de sueldo es el gancho más claro.
8. **Así funciona el GPS (y por qué necesita la relatividad de Einstein)**
   - Búsqueda: "cómo funciona el gps"
   - Prueba: ≈ Veritasium / Branch Education.
9. **El virus que tumbó medio mundo en un fin de semana (WannaCry)**
   - Búsqueda: "wannacry", "virus más peligroso de la historia"
   - Prueba: ≈ historias de hacks tipo Darknet Diaries / Lemmino.
10. **Así funciona el reconocimiento facial de tu móvil**
11. **Qué es la computación cuántica (sin humo)** — ✅ el vídeo más visto de QuantumFracture
    (>6 M) es de mecánica cuántica: el tema tiene demanda enorme en español.
12. **Cómo funcionan los deepfakes (y cómo detectarlos)**
13. **Por qué los aviones no usan el Wi-Fi como tu casa / cómo funciona el Wi-Fi**
14. **La IA que aprendió a jugar sola: AlphaGo** — historia + explicación.
15. **De cero a programador: hoja de ruta real en 2026** (clon del formato que ya funcionó: 129).

## Patrones de título y miniatura que aplicamos a partir de ahora

- Título **≤60 caracteres**, la **palabra que se busca primero** ("Qué hace un…", "Así funciona…",
  "Cuánto cobra…"), y un giro de curiosidad entre paréntesis.
- Miniatura: **2-4 palabras** enormes (Impact, blanco + 1 palabra en amarillo, contorno negro),
  puestas por código (`scripts/thumbnail_text.py`), nunca por la IA de imagen. Sara con cara de
  reacción en el lado opuesto al texto. Mejor fondo de color que blanco.
- Nunca repetir en la miniatura las mismas palabras del título: se complementan.
- Una cifra concreta rinde más que un adjetivo ("80.000 €", "3.700 IAs", "11 millones").

## Qué NO hacer (según nuestros datos)

- Títulos-frase de 90-100 caracteres (se cortan en móvil a los ~50).
- Noticias que nadie busca con nombres propios desconocidos (Mythos 5, AISI…).
- Series que dependen de haber visto el vídeo anterior ("Llevamos dos vídeos hablando de…"):
  el espectador de búsqueda llega sin contexto. Cada vídeo debe funcionar solo.
