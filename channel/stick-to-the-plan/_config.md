# Stick to the Plan — Channel Config

## Identidad

- **Canal**: Stick to the Plan (antes @ecobananas, rebrand junio 2026)
- **Nicho**: longevidad — hábitos que alargan la vida, ciencia del envejecimiento, salud preventiva
- **Personaje**: Stick — stickman con pelo largo, cinta, gafas rojas; el protagonista recurrente de todos los vídeos
- **Referencia de benchmark**: @ecomonos (`agentic-channel-analytics/channels/ecomonos.md`)
- **Perfil del canal**: `agentic-channel-analytics/channels/stick-to-the-plan.md`

## Voz ElevenLabs

- **Voz**: Triline YouTube
- **Modelo**: ElevenLabs V3 (con emotion tags)
- **API key**: en `.env` → `ELEVENLABS_API_KEY` (no commitear)
- **Etiquetas de emoción habituales**: `[tono cercano]`, `[pausa dramática]`, `[tono directo]`, `[susurro]`

## Estilo visual

- **Motor**: Higgsfield AI — estilo stickman sobre fondo blanco
- **Naming de imágenes**: `seg_00.png`, `seg_01.png`, … (orden de segmento Whisper)
- **Resolución**: 1920×1080, render Remotion a 30fps

## Reglas de guion (pipeline-críticas)

- 1 frase = 1 imagen = 1 beat visual
- Target: ~63–70 frases para ~2,5 min
- Frases atómicas — si una frase no cabe en una imagen, dividir
- Lexicon del canal: construir moat propio, no copiar Ecomonos
- CTA encadenado al siguiente vídeo + like-bait in-universe ("Stick to the plan")

## Plantilla de thumbnail

- Fondo sólido de alto contraste (no blanco)
- Un Stick grande y expresivo (~40–60% del frame)
- Un solo elemento emocional (flecha, símbolo, expresión exagerada)
- ≤4 palabras de texto, si las hay
- Herramienta: `/thumbnail-creator` — modelo `nano_banana_pro`, 16:9, 4 variantes
