# Propagación hacia atrás: así aprende de verdad una red neuronal — Guion

**Tema**: Backpropagation — el algoritmo que calcula cómo un solo ejemplo de entrenamiento quiere
ajustar cada peso y sesgo de la red, explicado de forma intuitiva (sin fórmulas). Parte 4 de la
serie (condensado de "What is backpropagation really doing?" de 3Blue1Brown).
**Canal**: Tecno (misma serie que "Cómo funciona una red neuronal", "Así aprende de verdad..." y
"El truco sucio...").
**Duración objetivo**: 5.5-6 min (más largo que las 3 partes anteriores, a petición explícita:
las anteriores se quedaron cortas para explicar bien el concepto — aquí se prioriza claridad
manteniendo el ritmo dinámico de frases cortas).
**Fuente**: guion original de 3Blue1Brown, condensado y reescrito en frases cortas, ganchudas,
ritmo constante (estilo YouTube/TikTok), con más espacio para respirar en las partes clave.
**Estado**: Borrador — mismo estilo visual whiteboard doodle que el resto de la serie, pipeline
completo pendiente de ejecutar.

---

[tono intrigante] Hoy hablamos del algoritmo más importante de todo esto: la propagación hacia atrás.
Es el motor real de cómo aprende una red neuronal.
[tono cercano] Repaso relámpago antes de empezar.
Ya sabes qué es una red neuronal.
Ya sabes cómo propaga información hacia adelante.
Y ya viste el descenso de gradiente: mover 13.000 diales para bajar el costo lo más rápido posible.
[tono curioso] Pues bien, la retropropagación es el algoritmo que calcula exactamente ese movimiento.
Cómo mover esos 13.000 números, uno por uno.
[tono cómico] Y sí, pensar en 13.000 dimensiones a la vez es imposible para un cerebro humano.
Por suerte hay otra forma de pensarlo.
Cada número de esa gradiente te dice una cosa muy simple: qué tan sensible es el costo a ESE peso en concreto.
[tono cercano] Un ejemplo rápido.
Imagina que calculas la gradiente y un peso te da 3.2.
Otro peso, en cambio, te da 0.1.
Eso significa que el costo es 32 veces más sensible al primer peso que al segundo.
Mover el primero un poco cambia mucho el resultado.
Mover el segundo, casi nada.
[tono cómplice] Vale, con eso claro, vamos al mecanismo real, paso a paso.
[tono cercano] Nos olvidamos de la notación matemática por completo.
Solo vamos a razonar con un único ejemplo de entrenamiento: la imagen de un 2.
La red, sin entrenar todavía, escupe resultados casi aleatorios.
Algo como 0.5, 0.8, 0.2... puro ruido.
No podemos tocar esas activaciones directamente.
Solo controlamos los pesos y los sesgos.
Pero sí podemos anotar qué cambios NOS GUSTARÍA ver en esa última capa.
[tono cercano] Como queremos que la red diga "2", el valor de esa neurona debería subir.
Y todos los demás deberían bajar.
Cuanto más lejos esté un valor de donde debería estar, más importante es corregirlo.
[tono curioso] Centrémonos solo en la neurona del 2.
¿Cómo aumentamos su activación?
Recuerda: activación es una suma ponderada de la capa anterior, más un sesgo, metida en una función de apachurramiento.
Así que hay tres palancas disponibles.
Subir el sesgo.
Subir los pesos.
O cambiar las activaciones de la capa anterior.
[tono cercano] Vamos con los pesos primero.
No todos los pesos pesan igual, nunca mejor dicho.
Las conexiones con neuronas ya muy brillantes en la capa anterior tienen más impacto.
Subir ESE peso mueve más la aguja que subir un peso conectado a una neurona apagada.
[tono asombrado] Dato curioso: esto se parece a una idea real de neurociencia.
La teoría hebbiana: "las neuronas que se activan juntas, se conectan juntas".
Aquí pasa algo parecido: las neuronas más activas y las que queremos activar más se refuerzan entre sí.
[tono cercano] Ojo, esto es solo una analogía, no una prueba de que las redes artificiales funcionen como el cerebro real.
Pero mola señalarlo.
[tono cercano] La tercera palanca: cambiar las activaciones de la capa anterior.
Si todo lo conectado con peso positivo se vuelve más brillante, y lo conectado con peso negativo se apaga,
esa neurona del 2 se activa más.
Y otra vez: los cambios más eficientes son proporcionales al tamaño de esos pesos.
[tono cercano] El problema es que tampoco controlamos esas activaciones directamente.
Solo anotamos qué querríamos que pasara ahí.
[tono intrigante] Pero espera, hay más.
Eso es solo lo que quiere la neurona del 2.
Las otras nueve neuronas de salida TAMBIÉN tienen sus propias exigencias para esa misma capa anterior.
[tono cómplice] Aquí es exactamente donde aparece la propagación hacia atrás.
Sumas todos esos deseos, de las diez neuronas de salida a la vez.
Y el resultado es una lista de ajustes deseados para toda la penúltima capa.
[tono curioso] ¿Y ahora qué?
Repites exactamente el mismo proceso.
Pero una capa más atrás.
Y otra vez.
Y otra.
Retrocediendo por toda la red, capa por capa.
[tono cercano] Eso es literalmente "propagar hacia atrás": empujar los ajustes deseados desde la salida hasta la entrada.
[tono cómico] Pero espera, todavía falta una pieza.
Si solo escucháramos a este único 2, la red se obsesionaría con clasificar TODO como un 2.
Así que repites este mismo proceso para cada ejemplo de entrenamiento.
Miles y miles de dígitos distintos.
Cada uno con su propia opinión sobre cómo mover los pesos.
Y al final promedias todos esos deseos.
[tono asombrado] Ese promedio de ajustes es, básicamente, el negativo de la gradiente que veníamos persiguiendo.
Si entendiste por qué unos cambios pesan más que otros, y cómo se suman entre capas, ya entiendes la mecánica real de la retropropagación.
[tono cercano] Ahora, un problema práctico.
Sumar la influencia de decenas de miles de ejemplos, en cada paso, es carísimo computacionalmente.
[tono cómplice] Así que en la práctica se hace un truquito.
Revuelves todos tus datos.
Los divides en mini lotes, digamos de 100 ejemplos cada uno.
Calculas un paso de descenso usando solo ese mini lote.
[tono cómico] No es la gradiente perfecta, pero es una MUY buena aproximación.
Y muchísimo más rápida.
[tono curioso] Si dibujaras el camino que sigue la red por la superficie de costo con este método,
parecería un borracho tambaleándose cuesta abajo.
Pasos rápidos, dirección no perfecta.
En vez de alguien calculando milimétricamente cada paso antes de moverse.
[tono cercano] Esta técnica tiene nombre: descenso de gradiente estocástico.
Es literalmente cómo se entrena casi cualquier red neuronal moderna.
[tono cómplice] Repasemos todo, porque han pasado muchas cosas.
La retropropagación calcula cómo UN ejemplo de entrenamiento quiere mover cada peso y sesgo.
No solo si debe subir o bajar, sino cuánto, en proporción, para bajar el costo lo más rápido posible.
Un paso de descenso de gradiente real promediaría esto sobre todos tus ejemplos.
Pero por eficiencia, usamos mini lotes al azar, uno por paso.
[tono asombrado] Repitiendo esto una y otra vez, la red converge hacia un mínimo local del costo.
Y termina haciendo un buen trabajo con los ejemplos que ha visto.
[tono cercano] Con todo esto, cada línea de código detrás de la retropropagación corresponde a algo que ya entiendes, aunque sea de forma intuitiva.
[tono cómico] Pero una cosa es entender las matemáticas, y otra muy distinta es programarlas sin liarte con la notación.
Ahí es donde de verdad se complica todo.
[tono intrigante] Para quien quiera ir más profundo, el próximo vídeo entra en el cálculo real detrás de todo esto.
Las mismas ideas, pero con las fórmulas completas.
[tono cercano] Antes de cerrar, una cosa importante que aplica a todo el aprendizaje automático, no solo a redes neuronales.
Nada de esto funciona sin muchísimos datos de entrenamiento.
[tono curioso] Los dígitos escritos a mano son un ejemplo perfecto porque existe MNIST: miles de ejemplos ya etiquetados por humanos.
[tono cómplice] En cualquier proyecto real de IA, conseguir datos etiquetados de calidad suele ser el reto más grande de todos.
[tono cálido] Y así es, paso a paso, cómo una red neuronal aprende de verdad.
Suscríbete si quieres ver las matemáticas completas en el próximo vídeo.
