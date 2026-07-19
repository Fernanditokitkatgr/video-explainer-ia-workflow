# El truco sucio que nadie te cuenta sobre las redes neuronales — SEO / metadata de YouTube

**Nota de originalidad**: guion condensado y reescrito a partir del vídeo "Gradient descent, how
neural networks learn" de 3Blue1Brown (segunda mitad: qué aprendió realmente la red, el
experimento de las etiquetas revueltas) — mismo ejemplo pedagógico (red MNIST) pero guion, ritmo,
estilo visual (whiteboard doodle) y narración propios. Parte 3 de una serie de 3 vídeos. Búsqueda
de títulos similares realizada antes de titular: no se encontró ningún vídeo español con un título
casi idéntico.

## Título (elegir uno, o A/B test nativo con las 3)
1. **El truco sucio que nadie te cuenta sobre las redes neuronales** ← recomendado
2. Tu red neuronal no aprendió lo que tú crees
3. Le dimos ruido puro a una IA... y dijo que era un 5

## Descripción

```
En el vídeo pasado entrenamos una red para reconocer dígitos: 96% de aciertos, hasta 98% con ajustes. Deberíamos estar celebrando. Pero hay un problema: la red no aprendió lo que creíamos que había aprendido.

Visualizamos los pesos de sus neuronas ocultas esperando ver bordes limpios... y lo que vimos fue casi puro ruido. Peor todavía: si le das a esta red una imagen de ruido aleatorio, que ni siquiera se parece a un número, te dice con total confianza que es un 5. Un experimento real con etiquetas revueltas a propósito deja aún más claro qué está pasando de verdad dentro de la caja negra.

📌 Capítulos:
0:00 96-98% de aciertos... pero hay un problema
0:09 La red no aprendió lo que creíamos
0:23 Fuimos a comprobarlo (visualizamos los pesos)
0:33 Lo que vimos: casi puro ruido
0:49 La prueba definitiva: ruido aleatorio
1:02 ¿Por qué pasa esto?
1:12 El experimento real de las etiquetas revueltas
1:27 La red memorizó el desastre entero
1:39 ¿Patrones reales o solo memoriza?
2:01 Tecnología de los años 80 y 90
2:15 La pregunta enorme que queda sin responder

Todavía queda una pregunta gigante: ¿cómo calculas exactamente el gradiente de 13.000 números a la vez? Eso se llama propagación hacia atrás (backpropagation) y es el tema del próximo vídeo. Suscríbete para no perdértelo.

#RedesNeuronales #InteligenciaArtificial #DeepLearning
```

**Nota sobre los capítulos**: calculados desde los `startSec` reales de `frames.json` divididos
entre `PLAYBACK_RATE` (1.1), no a ojo. Verificar que sigan cuadrando si se vuelve a renderizar
el vídeo con cambios de guion/timing.

## Tags
```
redes neuronales, inteligencia artificial, como funciona una red neuronal, overfitting, memorizacion vs generalizacion, machine learning explicado, deep learning, mnist, etiquetas revueltas, red neuronal engañada, ruido aleatorio ia, backpropagation, ia explicada, caja negra ia, redes neuronales para principiantes
```

## Miniatura (thumbnail)
Definitiva (v2, tras feedback "no me han encantado"): `thumbnail.jpg` (en esta misma carpeta).
Robot/IA con checkmark confiado señalando un cuadro de ruido/estática, texto "NO APRENDIÓ LO QUE
CREES" (título alternativo #2) — un único elemento dominante, muy legible a tamaño pequeño.
Sustituye a la v1 (cerebro estilo anatómico) tras nueva ronda de variantes.

## Canal
Tecno (misma serie que "Cómo funciona una red neuronal por dentro" y "Así aprende de verdad...").
Tercera y última parte de la trilogía sobre redes neuronales con el mismo estilo whiteboard doodle.
