# Cómo funciona una red neuronal (por dentro) — Guion

**Tema**: Qué es una red neuronal a nivel estructural (neuronas, capas, pesos, sesgos) —
condensado del vídeo "But what is a neural network?" de 3Blue1Brown (~18.5 min originales),
sin entrar en el entrenamiento (eso sería un vídeo 2, como en la fuente original).
**Canal**: Tecno (mismo canal que "Cómo funciona la Inteligencia Artificial")
**Fuente**: guion original de 3Blue1Brown, condensado a ~4-5 min, reescrito en frases
cortas, ganchudas, ritmo constante (estilo YouTube/TikTok) en vez de la charla pausada del original.
**Estado**: Borrador para aprobar — pendiente de imágenes (Higgsfield MCP desconectado en esta
sesión; hay que probar estilo cartoon marcador vs. estilo "FOCUS" cinematográfico en cuanto
se reconecte).

---

[tono curioso] Esto es un 3.
Escrito sin ningún cuidado.
Reducido a una imagen minúscula, de solo 28 por 28 píxeles.
Y aun así, tu cerebro lo reconoce al instante.
Sin esfuerzo.
Este también es un 3.
Y este.
Y este.
Aunque cada píxel sea completamente diferente de un dibujo a otro.
Para tus ojos, esto es trivial.
Para un ordenador, es casi una tortura.
Pídele a alguien que programe esto a mano...
[tono cómico] ...y en cinco segundos pasa de "fácil" a "quiero llorar".
Este es el mismo truco detrás de un coche que se conduce solo.
De una app que reconoce tu cara para desbloquear el móvil.
De un chatbot que entiende lo que le escribes.
Todo eso tiene el mismo nombre.
[tono decidido] Redes neuronales.
Hoy vas a entender de verdad qué son.
No palabras raras.
No fingir que lo entiendes en una fiesta.
Vamos a construir, pieza a pieza, una red que aprende a leer números escritos a mano.
Ojo, hoy solo vemos la estructura, el esqueleto.
Cómo "aprende" esa estructura te lo cuento en el próximo vídeo.
Empecemos por lo más simple posible.
Una neurona no es más que una caja.
Una caja que guarda un número.
Entre 0 y 1.
Nada más, nada de ciencia ficción.
Nuestra red arranca con 784 de esas cajas.
Una por cada píxel de la imagen.
28 por 28, 784 en total.
Cada una guarda cuánto de blanco o de negro es su píxel.
Eso es toda la primera capa.
En el otro extremo hay una última capa.
Con solo 10 neuronas.
Una por cada número posible, del 0 al 9.
Cuanto más brillante esté una de esas 10...
...más convencida está la red de que ese es el dígito correcto.
¿Y en medio?
Un par de capas ocultas.
Que, de momento, son un enorme signo de interrogación.
[tono misterioso] Ahí es donde se supone que ocurre la magia.
La idea es esta.
Cuando tú reconoces un 9, tu cerebro junta piezas sueltas.
Un círculo arriba, una línea a la derecha.
Un 8 junta dos círculos.
La esperanza es que la red haga exactamente lo mismo.
Que una capa detecte bordes sueltos.
Que la siguiente junte esos bordes en círculos y líneas.
Y que la última junte esas piezas en un dígito completo.
Píxeles, a bordes, a patrones, a números.
Como un cerebro junta sonidos, en sílabas, en palabras, en frases.
Pero, ¿cómo decide una sola neurona si está viendo un borde?
[tono cómplice] Aquí está el truco real.
Piensa en cada neurona como alguien que escucha 784 opiniones a la vez.
Cada conexión entre dos neuronas tiene asignado un peso.
Y un peso es solo eso, un número que dice cuánto importa esa opinión.
Si el peso es alto, esa entrada pesa mucho en la decisión final.
Si es bajo, o negativo, casi no cuenta, o incluso resta.
La neurona multiplica cada entrada por su peso, y lo suma todo.
Si los pesos son altos justo donde debería haber un borde...
...y bajos, o negativos, alrededor...
...esa suma se dispara solo cuando el borde existe de verdad, y se queda plana cuando no.
Pero hay un problema, esa suma puede dar cualquier número, gigante, o gigante en negativo.
Así que le sumamos otro número más, el sesgo.
El sesgo es como el umbral de exigencia de la neurona.
Un sesgo muy negativo hace que le cueste mucho activarse.
Uno positivo se lo pone fácil.
Y al final, aplastamos ese resultado con una función que se llama sigmoide.
[tono asombrado] La sigmoide agarra cualquier número, por gigante que sea, y lo comprime entre 0 y 1.
Así todas las neuronas de la red hablan el mismo idioma.
Eso es todo lo que hace una neurona.
Multiplicar. Sumar. Comprimir.
El problema es la escala.
Solo entre la primera y la segunda capa hay 784 por 16 pesos distintos.
[tono asombrado] Toda la red junta acumula casi 13.000 números.
13.000 diales que hay que calibrar bien para distinguir un 3 de un 8.
Imagina sentarte tú, a mano, a mover esos 13.000 diales uno por uno.
[tono cómico] Ni con cinco cafés de por medio.
Por suerte, no hace falta hacerlo a mano.
Eso, precisamente, es lo que la red aprende a hacer sola.
Y cómo una máquina calibra sola 13.000 números sin que nadie se los diga...
...es la parte más alucinante de todo esto.
Te la cuento en el próximo vídeo.
Por ahora, quédate con esto.
Una red neuronal no es magia.
Ni conciencia.
Ni un cerebro digital pensando como tú.
Es una función.
Larguísima, sí.
Con miles de números, sí.
Pero solo una función.
Que convierte 784 píxeles en 10 probabilidades.
Y aun con solo esto, ya reconoce números escritos a mano casi tan bien como tú.
[tono entusiasta] ¿Te está volando un poco la cabeza?
[tono cálido] Suscríbete, que la segunda parte, cómo aprende de verdad una red neuronal, viene pronto.

---

## SEO / Metadata (ver `seo.md` para el detalle completo)

**Título recomendado**: Así es una red neuronal por dentro (sin matemáticas raras)

**Descripción corta**: Qué es de verdad una red neuronal — neuronas, capas, pesos, sesgos y los
casi 13.000 parámetros que hay que calibrar — sin entrar en cómo aprende (eso es la parte 2).

**Tags**: redes neuronales, red neuronal explicada, machine learning explicado, deep learning,
neurona artificial, pesos y sesgos, funcion sigmoide, mnist, ia explicada.

**Miniatura**: `thumbnail.jpg` — red neuronal con la neurona central iluminada, "ASÍ ES POR DENTRO".
