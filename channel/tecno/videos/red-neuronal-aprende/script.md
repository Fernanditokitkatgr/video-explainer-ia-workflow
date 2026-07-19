# Así aprende de verdad una red neuronal — Guion

**Tema**: Función de costo + descenso de gradiente — cómo "aprende" en la práctica la red
neuronal presentada en el vídeo anterior. Parte 2 de la serie (condensado del vídeo "Gradient
descent, how neural networks learn" de 3Blue1Brown, ~20 min originales), cubriendo la primera
mitad del contenido fuente.
**Canal**: Tecno (misma serie que "Cómo funciona una red neuronal (por dentro)")
**Fuente**: guion original de 3Blue1Brown, condensado a ~4-5 min, reescrito en frases cortas,
ganchudas, ritmo constante (estilo YouTube/TikTok).
**Estado**: Borrador — mismo estilo visual whiteboard doodle que
`red-neuronal-explicada.mp4`, pipeline completo pendiente de ejecutar.

---

[tono cómplice] En el vídeo anterior, viste la estructura de una red neuronal.
Neuronas, capas, pesos, sesgos.
Un esqueleto entero, listo para funcionar.
Pero le faltaba lo más importante.
Aprender.
Hoy te lo cuento.
Repaso relámpago, por si se te olvidó algo.
Nuestra red recibe 784 números, uno por píxel.
Los pasa por un par de capas ocultas.
Y escupe 10 números al final, uno por cada dígito posible.
El más brillante de esos 10, gana.
Toda la red no es más que una función gigante.
784 entradas, 10 salidas.
Y unos 13.000 pesos y sesgos que puedes mover como diales.
Al principio, esos 13.000 diales están puestos al azar.
Así que, como te imaginarás, la red es pésima.
Le enseñas la imagen de un 3...
...y la capa de salida responde con puro caos.
Aquí es donde entra la primera pieza clave.
La función de costo.
Es solo una forma de decirle a la máquina: "esto está mal, muy mal".
Compara lo que la red respondió con lo que debería haber respondido.
Cuanto más se parezcan, menor el costo.
Cuanto más la cague, mayor el costo.
Haces esto con decenas de miles de ejemplos.
Y sacas el promedio.
Eso es el costo total de la red.
Un solo número, gigante, que resume lo mala que es.
Ahora viene la pregunta importante.
¿Cómo bajas ese número?
Aquí entra la segunda pieza clave.
El descenso de gradiente.
Olvídate de 13.000 pesos por un segundo.
Imagina solo una función, con un número de entrada.
Quieres encontrar el valor que le da el resultado más bajo posible.
La táctica es simple.
Mira la pendiente donde estás.
Si sube hacia la derecha, muévete a la izquierda.
Si sube hacia la izquierda, muévete a la derecha.
Repite eso una y otra vez.
Es como una pelota rodando cuesta abajo.
Al final, cae en un valle.
Un mínimo local.
Ojo, no siempre el más bajo de todos los valles posibles.
Solo el más cercano a donde empezaste.
Ahora, en vez de un número, imagina 13.000.
Uno por cada peso y sesgo de la red.
La misma idea sigue funcionando.
Solo que ahora "la pendiente" se llama gradiente.
El gradiente negativo te dice dos cosas a la vez.
Hacia dónde moverte para bajar más rápido.
Y cuánto importa cada uno de esos 13.000 números.
Algunos pesos apenas mueven la aguja.
Otros lo cambian todo.
El gradiente te dice cuáles son cuáles.
Así que el algoritmo entero es esto.
Calcula el gradiente.
Da un paso pequeño cuesta abajo.
Repite.
Miles y miles de veces.
Eso, literalmente, es aprender.
No hay magia, no hay conciencia.
Solo una bola rodando por una montaña de 13.000 dimensiones.
Y funciona sorprendentemente bien.
La red que construimos clasifica bien el 96% de dígitos que nunca ha visto.
Con algunos ajustes, sube al 98%.
Nada mal para un puñado de matemáticas de los años 80.
[tono misterioso] Pero aquí viene la parte incómoda.
¿La red realmente aprendió a reconocer bordes y patrones, como esperábamos?
Eso te lo cuento en el próximo vídeo.
Porque la respuesta te va a sorprender.
Suscríbete si quieres verlo.
