# Qué pasa de verdad cuando escribes en ChatGPT — guion v1 (ElevenLabs v3)

**Tema**: el viaje literal de UN mensaje en ChatGPT, desde que pulsas Enter hasta que la
respuesta aparece palabra a palabra: viaje al centro de datos, tokens (ejemplo de corte),
tokens convertidos en números, predicción de la siguiente pieza (por qué sale palabra a
palabra), probabilidad y temperatura, ventana de contexto (por qué "olvida" en chats largos),
sin memoria entre chats salvo función de memoria, alucinaciones, cómo aprendió
(preentrenamiento + valoraciones humanas), miles de tarjetas gráficas, energía y agua (cualitativo).
**Canal**: tecno
**Formato**: evergreen explicativo buscable ("cómo funciona chatgpt", "qué es un token")
**Duración estimada**: 6-7 min
**Prueba de demanda**: ✅ el explicativo "cómo funciona la IA" es el más visto del canal (1.009).
Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: NO es "qué es la IA" ni "cómo funcionan los LLM" en abstracto. Es el
viaje de un solo mensaje concreto, paso a paso, como un viaje de ida y vuelta.
**Hilo conductor**: el mensaje de ejemplo ("¿Cómo se hace una tortilla de patatas?") viaja y se
transforma en cada parada. Frase recurrente: "una pieza cada vez". Analogía de apoyo: ChatGPT es
el autocompletado del móvil llevado al extremo; nadie al otro lado está escribiendo.

---

[curious] Cuando ChatGPT te responde, las palabras van apareciendo una a una. Como si alguien estuviera tecleando al otro lado.
[tense] Pero al otro lado no hay nadie. Y lo más raro es que ni la propia máquina sabe cómo va a terminar su frase.
[confident] Va decidiendo sobre la marcha. Una pieza cada vez.
[emphatic] Hoy vamos a seguir el viaje de un solo mensaje. Desde que pulsas Enter hasta que aparece la última palabra.

[serious] Empecemos con un mensaje sencillo. Escribes en ChatGPT: ¿cómo se hace una tortilla de patatas?
[curious] Y pulsas Enter. En ese instante, tu mensaje sale de tu móvil.
[confident] Porque ChatGPT no vive en tu móvil. Vive en un centro de datos, una nave enorme llena de ordenadores, que puede estar a miles de kilómetros.
[serious] Tu pregunta viaja por internet, igual que cualquier otra web, y llega a una de esas máquinas.
[tense] Pero allí nadie la lee como la lees tú. La máquina no entiende letras. Solo entiende números.

[serious] Así que lo primero que pasa es algo curioso. Tu mensaje se corta en trocitos.
[curious] A esos trocitos se les llama tokens. Un token puede ser una palabra entera, un trozo de palabra o incluso un signo de puntuación.
[confident] Las palabras cortas y muy usadas suelen ser un solo token. Las largas o raras se parten en varios.
[serious] Por ejemplo, una palabra como increíblemente podría cortarse en algo así como incre, íble y mente.
[curious] Y la interrogación, o el espacio antes de una palabra, también cuentan como parte de las piezas.
[confident] El modelo tiene un catálogo fijo de decenas de miles de piezas. Y cualquier texto del mundo se puede montar combinándolas, como si fueran piezas de Lego.
[serious] Por eso los límites de estos modelos no se miden en palabras. Se miden en tokens.
[emphatic] Tu pregunta sobre la tortilla ya no es una frase. Es una fila de piezas.

[serious] Siguiente parada. Cada pieza se cambia por un número. Su número de catálogo.
[curious] Pero un número solo no dice nada. Así que cada pieza se convierte en una lista larguísima de números. Miles de ellos.
[confident] Esa lista funciona como unas coordenadas. Como la posición de un punto en un mapa.
[serious] En ese mapa, las piezas con significado parecido quedan cerca unas de otras. Patata queda cerca de cebolla. Sartén, cerca de cocina.
[curious] Nadie dibujó ese mapa a mano. La máquina lo fue ajustando sola mientras aprendía.
[emphatic] Tu pregunta ya no es texto. Es un montón de puntos en un mapa de significados.

[serious] Ahora llegamos al corazón de todo. El modelo de lenguaje.
[curious] Por dentro es una red gigantesca de operaciones matemáticas. Las siglas GPT vienen de su nombre técnico en inglés: transformador generativo preentrenado.
[confident] Su gran truco se llama atención. Le permite mirar todas las piezas a la vez y decidir cuáles importan más para entender cada una.
[serious] Así sabe que, en tu frase, patatas va con tortilla. Y que lo que pides es una receta, no una historia.
[tense] Y después de todo ese cálculo, el modelo solo responde a una pregunta. Una sola.
[emphatic] ¿Cuál es la siguiente pieza más probable?

[serious] Y esta es la clave de todo el vídeo. ChatGPT no escribe la respuesta entera y luego te la enseña.
[curious] Calcula una pieza. La añade al texto. Y vuelve a empezar desde el principio, ahora con esa pieza nueva incluida.
[confident] Otra pieza. Otra vuelta completa. Y así cientos de veces seguidas.
[serious] Por eso ves la respuesta aparecer palabra a palabra. No es un efecto bonito para darle emoción. Es literalmente cómo se está fabricando.
[curious] Es como el autocompletado del teclado de tu móvil. Pero llevado a un extremo absurdo.
[serious] Algunos modelos, antes de contestar, escriben primero un borrador de razonamiento que no siempre ves. Pero ese borrador se fabrica exactamente igual.
[emphatic] Una pieza cada vez. Sin plan previo. Sin saber cómo termina la frase.

[serious] Pero, ¿cómo elige cada pieza? Con probabilidades.
[curious] Para la siguiente palabra, el modelo no tiene una única respuesta. Tiene una lista de candidatas, cada una con su porcentaje.
[confident] Después de para hacer una tortilla necesitas, la palabra huevos tendrá muchísima probabilidad. Patatas, también. Chocolate, casi ninguna.
[serious] Y aquí entra un ajuste que se llama temperatura.
[curious] Con la temperatura baja, el modelo escoge casi siempre la opción más probable. Es predecible, casi aburrido.
[confident] Con la temperatura más alta, se atreve a escoger opciones menos probables. Es más creativo, pero también más raro.
[friendly] Por eso, si le haces la misma pregunta dos veces, casi nunca te contesta exactamente igual. Hay un poco de dado en cada palabra.

[serious] Ahora, algo que seguramente te ha pasado. Tienes un chat larguísimo, y de repente parece que se ha olvidado de lo que le dijiste al principio.
[curious] No es un despiste. Es un límite físico. Se llama ventana de contexto.
[confident] Cada vez que envías un mensaje, el modelo vuelve a leer la conversación entera desde el principio. Todas las piezas.
[serious] Pero solo cabe un número máximo de piezas a la vez. Es como una mesa de trabajo con un tamaño fijo.
[tense] Cuando la conversación no cabe, lo más antiguo se queda fuera de la mesa. O se atiende peor. Y para el modelo, lo que no está en la mesa, no existe.

[serious] Y hay algo todavía más sorprendente. El modelo no tiene memoria entre conversaciones.
[curious] Cuando abres un chat nuevo, empieza de cero. No sabe quién eres ni de qué hablasteis ayer.
[confident] Salvo que tengas activada una función de memoria. En ese caso, la aplicación guarda algunas notas sobre ti y se las añade a escondidas al principio de cada chat.
[emphatic] Pero el modelo en sí no recuerda nada. Solo lee lo que le ponen delante en ese momento.

[serious] Y aquí viene el problema más famoso. A veces ChatGPT se inventa cosas.
[curious] Un dato que no existe. Un libro que nadie ha escrito. Una cita que nadie dijo. Y te lo cuenta con total seguridad.
[tense] A eso se le llama alucinación. Y tiene una explicación muy sencilla.
[confident] El modelo no busca la verdad en una base de datos. Predice qué texto suena más probable.
[serious] Casi siempre, lo más probable coincide con lo verdadero. Pero no siempre.
[tense] Si no sabe algo, no se queda callado. Sigue haciendo lo único que sabe hacer. Poner la siguiente pieza que suena bien.
[friendly] Por eso, para cualquier dato importante, compruébalo siempre en una fuente fiable.

[serious] Vale. ¿Y cómo aprendió a predecir tan bien? Leyendo. Muchísimo.
[curious] Primero, lo que se llama preentrenamiento. Le dieron cantidades enormes de texto: páginas web, libros, artículos, código.
[confident] Y le pusieron un único ejercicio, repetido miles de millones de veces. Leer un trozo de texto y adivinar la palabra siguiente.
[serious] Al principio, fallaba siempre. Cada fallo ajustaba un poquito sus números internos. Y poco a poco, fue acertando más.
[curious] Para adivinar bien la siguiente palabra de una receta, tiene que captar cómo son las recetas. Y lo mismo con la historia, las matemáticas o los chistes.
[tense] Pero un modelo así solo sabe continuar textos. No sabe conversar ni ayudarte.
[confident] Así que hay un segundo paso. Personas reales leen muchas respuestas del modelo y puntúan cuáles son mejores. Más útiles, más claras, más prudentes.
[emphatic] Con esas notas, el modelo se reajusta para parecerse a un asistente. Por eso responde como alguien amable que quiere ayudarte.

[serious] Volvamos a tu tortilla. Mientras todo esto pasa, ¿qué máquinas están haciendo el trabajo?
[curious] No son ordenadores normales. Son tarjetas gráficas, las mismas que nacieron para los videojuegos.
[confident] Son perfectas para esto porque hacen millones de multiplicaciones pequeñas a la vez. Y un modelo de lenguaje, en el fondo, es eso. Multiplicaciones.
[serious] Para atender a cientos de millones de personas, hacen falta decenas de miles de estas tarjetas trabajando a la vez.
[tense] Y todo eso tiene un precio. Esas naves consumen muchísima electricidad. Y como las máquinas se calientan, muchas usan agua para refrigerarse.
[serious] Cada respuesta cuesta poca energía por separado. Pero multiplicada por millones de preguntas al día, se convierte en una factura enorme para el planeta.

[serious] Así que la próxima vez que escribas en ChatGPT, piensa en el viaje que acaba de hacer tu mensaje.
[curious] Ha cruzado internet hasta un centro de datos. Se ha cortado en piezas. Cada pieza se ha convertido en un punto en un mapa de significados.
[confident] Miles de tarjetas gráficas han calculado cuál era la pieza más probable. Y después la siguiente. Y la siguiente.
[emphatic] Al otro lado no hay nadie escribiendo. Solo una máquina que adivina tu respuesta. Una pieza cada vez.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
