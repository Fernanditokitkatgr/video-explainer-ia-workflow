# Análisis del enfoque narrativo de Ecomonos (3-nov-2026)

> Prueba de concepto: tomar **solo la forma de explicar** de @ecomonos y pasarla al motor del mono stick
> cutre de Tecnomono. Nada de su aspecto, sus personajes, su nombre, sus frases ni sus guiones.
> Complementa `agentic-channel-analytics/reference/ecomonos-viral-dna.md` (ese análisis va de su léxico y su
> voz; este, de la **estructura narrativa** y de qué es trasladable).

## Fuentes del análisis

- `yt-dlp` sobre los 115 vídeos del canal (25-may-2025 → 1-nov-2026), metadatos completos por vídeo.
- Vistos a fondo (subtítulos automáticos + fotogramas a 360p, 1 cada 2,5 s + detección de cortes con ffmpeg):
  - «La burbuja inmobiliaria está a punto de explotar» (831.000 vistas, 11:42)
  - «La economía se dirige a algo que no puede parar» (568.000, 11:31)
  - «Qué pasaría si la burbuja de la IA explota» (539.000, 11:49), el más cercano a nuestro nicho.
- El material descargado está en el scratchpad de la sesión (no va al repo).

## Números del canal

| Dato | Valor |
|---|---|
| Mediana de vistas (115 vídeos) | ~288.000 |
| Duración mediana | ~10 min (top 10: 10,7 min) |
| Los más vistos | «Comprar coche vs leasing» 1,34 M · «Un crash histórico se acerca» 1,25 M · «Cómo la IA ya es más cara que los trabajadores que reemplazó» 1,20 M · «La burbuja de la IA» 1,18 M |
| Formato corto «Qué es X» (3,5-4 min) | 5 vídeos, mediana ~233.000 (hipoteca 405.000, banco, criptomoneda, impuestos) |
| Título | casi siempre «<tesis o pregunta>, explicado con plátanos» |
| Ritmo de cortes | 168 cortes duros en 709 s (uno cada ~4,2 s) y además, dentro de cada plano, algo se mueve o aparece cada 1,5-2 s (bocadillo, objeto, cartel) |
| Ritmo de voz | ~1.000 caracteres por minuto: frases muy cortas, sin pausas largas |

Dos temas de IA están entre sus cuatro vídeos más vistos. Su público quiere ver **la IA explicada por
sus costes y consecuencias**, no por sus noticias. Eso cuadra con nuestro dato propio (lo evergreen gana).

## Cómo explican (lo que hace que funcione)

1. **Gancho dentro de la historia, sin presentación.** El vídeo arranca con el protagonista corriente en
   una situación cotidiana concreta (llega a la oficina y falta la cafetera; va al banco y le cambian el
   interés) y una **paradoja** («los compradores desaparecen y el precio sigue subiendo: no debería
   funcionar así»). Nunca «hola, hoy os explico».
2. **Mapa del vídeo en 10 s.** «Hoy verás por qué X. Después, Y. Luego, Z. Y al final, W.» Promete
   cuatro cosas y cumple las cuatro: es su manera de retener.
3. **Cuatro capítulos con título propio** («Capítulo 1. Todos quieren construir cerebros»), en tarjeta
   blanca. Cada capítulo acaba con una pregunta que abre el siguiente.
4. **Una historia con reparto fijo** en vez de una lista: un protagonista corriente (el espectador), un
   emprendedor que toma decisiones, un banco, un jefe. El mecanismo económico se cuenta como **una
   cadena de consecuencias**: la decisión de uno es el problema del siguiente («el pedido que cancela
   era el ingreso de otra empresa»). El mundo **crece** delante de ti: de una oficina a la bolsa, a los
   bancos, a toda la economía.
5. **El concepto se nombra DESPUÉS de entenderlo.** «…Eso se llama déficit.» «Eso se llama bono del
   tesoro.» Primero lo ves pasar en la historia y luego te dan la palabra técnica. Es lo más didáctico del canal.
6. **Datos reales y exactos metidos en el mundo inventado** (12,9 % al año, 2.487 por m², 5,6 frente a 7,4
   billones), en pizarras de madera, gráficas de barras sencillas y móviles con cifras grandes.
7. **Humor de personificación**, no chistes sueltos: «la factura escucha el problema, le manda mucho
   ánimo y mantiene la fecha de vencimiento». Un chiste cada 20-30 s, siempre pegado a la explicación.
8. **Giro en el último tercio**: cuando todo parece hundido, alguien compra barato. «Si el sector se
   hunde, ¿por qué algunos compran justo ahora?»
9. **Bajada al bolsillo del espectador** («aunque nunca compraste acciones de IA, tu fondo indexado sí»).
10. **Cierre circular y matizado**: vuelve a la escena del principio (la reunión de 10 minutos), da una
    conclusión con matices (no todo se hunde) y deja una pregunta que lleva **a otro vídeo concreto suyo**.
11. **Tono**: cercano, irónico, de cuñado listo; sin dramatismo de noticiario. Patrocinador metido como
    personaje de la historia.

**Por qué se comparten**: el espectador sale con una explicación que puede repetir en una cena («es
como si…»), el tema le toca el bolsillo (vivienda, ahorros, sueldo), el miedo va con alivio final y el
dibujo feo quita la pose de experto. Las cifras exactas dan credibilidad para mandarlo a otro.

## Qué copiamos (solo la forma)

| Recurso | Cómo lo pasamos a Tecnomono |
|---|---|
| Gancho cotidiano + paradoja | El mono hace algo normal (pregunta algo a una IA) y salta la paradoja con una cifra |
| Mapa del vídeo | «Primero verás… Después… Y al final…» en llano, con un `flujo` de tres nodos |
| Capítulos con título | Rótulo `lista` «Capítulo N» + capítulo de YouTube en `seo.md` |
| Historia con reparto y cadena de consecuencias | Un **pueblo de monos que crece** (escena nueva `pueblo` en `EscenasMundo.tsx`): de una casa con una bombilla a una nave de ordenadores con central nuclear; cada paso lo provoca el anterior |
| «Eso se llama…» | El término técnico aparece después de la explicación, con un `sello` o un cartel |
| Datos reales dentro del mundo | Cifras verificadas (AIE, Google, CSO de Irlanda, Bloomberg) en `cifra`, `comparativa` y en el propio pueblo |
| Humor de personificación | Bocadillos (`dice`) de personajes y objetos, uno cada 20-30 s |
| Giro | «Una sola pregunta gasta casi nada. Entonces, ¿dónde está el problema?» → la escala |
| Bajada al bolsillo | La factura de la luz del vecino del pueblo |
| Cierre circular y CTA a un vídeo concreto | Vuelve la pregunta del principio y se manda a `por-que-nvidia-vale-tanto` |

## Qué NO copiamos

- Nada de su dibujo (gorilas de color, fondos pintados, oficinas, tarjetas blancas de capítulo): todo sale
  del motor, con el mono stick cutre, el fondo de rayos y nuestros personajes.
- Ni su léxico ni equivalentes calcados (plátanos, hojas verdes, jungla, platanófono, Plátanos Unidos…):
  hablamos de euros, vatios y kilovatios, y las empresas se llaman por su nombre.
- Ni su gramática sin artículos («Mono tiene miedo»): mantenemos nuestra voz natural de persona real.
- Ni sus personajes (Moncho, Don Banano, Monopolio, el mono espectador) ni sus nombres inventados.
- Ni la coletilla «explicado con plátanos» ni sus títulos o frases: el título es nuestro y buscable.
- Ni sus temas (burbuja de la IA, IA más cara que los trabajadores): el nuestro es la **energía** de la IA.
- Ni el patrocinio integrado.

## Duración elegida para la prueba

Sus largos rondan los 10-11 min; su formato corto «Qué es X» va en 3,5-4 min. Para la prueba: **unos 4 min**
(tope del encargo 3-5 min), estructura completa en pequeño: gancho → mapa → 3 capítulos → giro → bolsillo →
cierre circular con CTA.
