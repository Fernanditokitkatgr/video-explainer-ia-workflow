# El truco sucio que nadie te cuenta sobre las redes neuronales — Guion

**Tema**: Qué aprendió realmente la red del vídeo anterior — visualización de pesos, exceso de
confianza ante ruido aleatorio, y el experimento real de etiquetas revueltas (memorización vs.
estructura). Parte 3 de la serie (segunda mitad del contenido de "Gradient descent, how neural
networks learn" de 3Blue1Brown).
**Canal**: Tecno (misma serie que "Cómo funciona una red neuronal (por dentro)" y "Así aprende
de verdad una red neuronal")
**Fuente**: guion original de 3Blue1Brown, condensado a ~4 min, reescrito en frases cortas,
ganchudas, ritmo constante (estilo YouTube/TikTok).
**Estado**: Borrador — mismo estilo visual whiteboard doodle que `red-neuronal-explicada.mp4` y
`red-neuronal-aprende`, pipeline completo pendiente de ejecutar.

---

[tono intrigante] En el vídeo pasado, entrenamos una red para reconocer dígitos.
96% de aciertos.
Con ajustes, hasta 98%.
Deberíamos estar celebrando.
Pero hay un problema.
La red no aprendió lo que creíamos que había aprendido.
Te explico.
La esperanza original era bonita.
Que una capa detectara bordes sueltos.
Que otra los juntara en círculos y líneas.
Y que la última combinara esos patrones en dígitos completos.
Así que fuimos a comprobarlo.
Visualizamos los pesos de esas neuronas ocultas.
Literalmente convertimos los números en una imagen.
Y lo que vimos... no fueron bordes limpios.
Fue casi puro ruido.
Con, como mucho, un par de patrones vagos en el medio.
En un espacio de 13.000 dimensiones posibles...
...la red encontró un valle cualquiera.
Uno que clasifica bien los dígitos...
...pero sin entender ni un solo patrón real.
[tono cómico] Y la prueba definitiva es todavía más incómoda.
Dale a esta red una imagen de puro ruido aleatorio.
Ni siquiera se parece a un número.
Una red que "entendiera" dudaría.
La nuestra no.
Te dice, con total confianza, que ese ruido es un 5.
Tan segura como si fuera un 5 de verdad.
¿Por qué pasa esto?
Porque nunca le dimos motivos para dudar.
Su universo entero son dígitos perfectos en una cuadrícula pequeña.
Nadie le enseñó lo que es "no lo sé".
Aquí hay un experimento real que lo deja aún más claro.
Unos investigadores cogieron una red así de buena reconociendo imágenes.
Y antes de entrenarla...
...revolvieron todas las etiquetas.
Perro pasó a ser gato.
Gato pasó a ser avión.
Puro caos, a propósito.
¿Resultado?
La red igual consiguió memorizar el desastre entero.
Misma precisión final que con etiquetas correctas.
Osea, con suficientes pesos, una red puede memorizar cualquier cosa.
Aunque no tenga ningún sentido.
La pregunta incómoda es esta.
¿La red encuentra patrones reales?
¿O solo memoriza?
Aquí está el dato que lo aclara un poco.
Con etiquetas revueltas, aprender es lentísimo.
La curva de precisión baja casi en línea recta.
Con etiquetas reales y datos con estructura...
...cuesta al principio, pero luego cae rápido.
Como si la estructura real fuera más fácil de encontrar.
Que memorizar caos puro.
Así que no, la red no es tan lista como pensábamos.
Pero tampoco es solo un loro memorizando al azar.
Es algo intermedio.
Y honestamente, esta red de aquí es tecnología de los años 80 y 90.
El punto de partida, no la meta final.
[tono cálido] Aun así, que reconozca dígitos que nunca ha visto...
...sigue siendo una pasada.
Todavía queda una pregunta enorme sin responder.
¿Cómo, exactamente, calculas ese gradiente de 13.000 números?
Eso se llama propagación hacia atrás.
Y es el tema del próximo vídeo.
Suscríbete para no perdértelo.
