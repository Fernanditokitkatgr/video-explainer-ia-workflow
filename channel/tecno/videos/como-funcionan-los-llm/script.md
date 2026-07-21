# Así funcionan de verdad los modelos de lenguaje (LLM) — Guion

**Tema**: Qué es un LLM, pre-entrenamiento, RLHF, y por qué el transformer (atención) cambió
todo. Parte 5 de la serie (condensado de "Large Language Models explained briefly" de
3Blue1Brown).
**Canal**: Tecno (misma serie whiteboard doodle que las 4 partes anteriores sobre redes neuronales).
**Duración objetivo**: 6-7 min.
**Fuente**: guion original de 3Blue1Brown, condensado y reescrito en frases cortas, ganchudas,
ritmo constante (estilo YouTube/TikTok), con estilo visual whiteboard doodle vía Gemini/Vertex AI.
**Estado**: Borrador — pipeline completo pendiente de ejecutar con el motor nuevo.

---

[tono susurrante e intrigante] Imagina que encuentras el guion de un cortometraje.
Una escena entre una persona y su asistente de inteligencia artificial.
Ves la pregunta.
Pero la respuesta ha desaparecido.
[tono curioso] Ahora imagina que tienes una máquina mágica que predice la siguiente palabra de cualquier texto.
Podrías meter el guion en esa máquina.
Predecir la primera palabra de la respuesta.
Y repetir, palabra por palabra, hasta completar el diálogo.
[tono cómplice] Cuando hablas con un chatbot, es literalmente esto lo que pasa.
Un modelo de lenguaje, un LLM, es una función matemática gigante.
Solo hace una cosa: predecir la siguiente palabra.
[tono cercano] Pero no predice una palabra con certeza.
Le asigna una probabilidad a cada palabra posible del idioma.
Para montar un chatbot, le das un texto que simula una conversación entre un usuario y una IA.
Añades lo que escribe el usuario real.
Y haces que el modelo prediga, una y otra vez, qué diría la IA.
[tono cómico] El resultado suena mucho más natural si dejas que el modelo elija, a veces, palabras menos probables al azar.
Por eso la misma pregunta te da respuestas distintas cada vez, aunque el modelo sea determinista.
[tono asombrado] ¿Y cómo aprende a predecir? Leyendo cantidades brutales de texto de internet.
Para leer todo el texto que entrenó a GPT-3, un humano tardaría más de 2.600 años, sin dormir.
Los modelos actuales entrenan con muchísimo más.
[tono cercano] Piensa en el entrenamiento como girar millones de diales de una máquina enorme.
Esos diales se llaman parámetros, o pesos.
Cambia los diales, y cambian las probabilidades que predice el modelo.
[tono curioso] Lo que hace "grande" a un LLM es tener cientos de miles de millones de esos parámetros.
Y nadie los diseña a mano.
Empiezan totalmente al azar.
Al principio, el modelo solo escupe letras sin sentido.
[tono cómplice] Se afina con ejemplos reales de texto.
Metes todas las palabras de un ejemplo, menos la última.
Comparas la predicción del modelo con la palabra real.
Y usas retropropagación para ajustar los parámetros.
Para que la próxima vez acierte un poco más esa última palabra.
[tono asombrado] Repite esto billones de veces, y el modelo no solo mejora en sus ejemplos de entrenamiento.
Empieza a predecir razonablemente textos que nunca ha visto.
[tono cómico] La cantidad de cálculo para entrenar esto es una locura.
Imagina que puedes hacer mil millones de operaciones por segundo.
¿Cuánto tardarías en entrenar el modelo más grande? ¿Un año? ¿Diez mil años?
[tono muy exagerado, casi gritando] La respuesta real: ¡más de cien millones de años!
[tono cercano] Pero esto es solo la mitad de la historia. Se llama pre-entrenamiento.
Autocompletar texto de internet no es lo mismo que ser un buen asistente.
Por eso viene una segunda fase, igual de importante: aprendizaje por refuerzo con retroalimentación humana.
Personas señalan qué respuestas son inútiles o problemáticas.
Y esas correcciones afinan aún más los parámetros del modelo.
[tono cómplice] Todo este cálculo solo es posible gracias a chips diseñados para hacer muchísimas operaciones en paralelo: las GPU.
Pero no todos los modelos se pueden paralelizar bien.
Antes de 2017, casi todos procesaban el texto palabra por palabra, en fila.
[tono muy entusiasmado] Entonces un equipo de Google presentó un modelo nuevo: ¡el transformer!
Los transformers no leen de principio a fin.
Absorben todo el texto de golpe, en paralelo.
[tono cercano] El primer paso: convertir cada palabra en una lista larga de números.
Porque el entrenamiento solo entiende números, no letras.
Esa lista de números codifica el significado de la palabra.
[tono curioso] Lo que hace único al transformer es una operación especial: la atención.
La atención deja que todas esas listas de números hablen entre sí.
Y afinen su significado según el contexto, todo en paralelo.
[tono cómico] Por ejemplo, la palabra "banco" cambia sus números según el contexto.
Puede pasar de significar entidad financiera a significar la orilla de un río.
[tono cercano] Los transformers también tienen otra pieza: una red neuronal normal y corriente.
Le da al modelo espacio extra para guardar patrones aprendidos en el entrenamiento.
[tono asombrado] Todo esto se repite muchas veces, capa tras capa.
Cada lista de números se enriquece un poco más en cada pasada.
Hasta acumular toda la información necesaria para predecir bien la siguiente palabra.
[tono cómplice] Al final, se usa el último de esos vectores, ya cargado de contexto, para hacer la predicción final.
Una probabilidad para cada palabra posible del idioma.
[tono cercano] Los investigadores diseñan cada paso del proceso.
Pero lo que el modelo aprende dentro es un fenómeno emergente.
Depende de miles de millones de parámetros ajustados solo, sin que nadie los programe a mano.
[tono intrigante] Por eso es tan difícil saber exactamente por qué el modelo predice lo que predice.
[tono cálido] Lo que sí puedes ver es el resultado: texto sorprendentemente fluido, coherente, y a veces genuinamente útil.
Y así, palabra por palabra, es como funciona de verdad un modelo de lenguaje.
Suscríbete si quieres que sigamos abriendo la caja negra de la IA.
