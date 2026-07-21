# El error de cómo construimos los ordenadores para la IA — Guion

**Tema**: Historia del Perceptrón, los dos inviernos de la IA, AlexNet, y por qué la
computación analógica podría ser el futuro de las redes neuronales. Basado en "We're Building
Computers Wrong (for Artificial Intelligence)" de Veritasium.
**Canal**: Tecno (misma serie whiteboard doodle, parte 6).
**Duración objetivo**: 6-7 min.
**Fuente**: condensado y reescrito en frases cortas, guion y narración propios, mismo estilo
visual whiteboard doodle vía Gemini/Vertex AI.

---

[tono intrigante] Durante siglos, las computadoras más poderosas del mundo no tenían ni un solo cero ni un uno.
[tono curioso] Predecían eclipses, mareas, y guiaban cañones antiaéreos, todo con electricidad pura.
Luego llegaron los transistores, y las computadoras digitales las barrieron del mapa.
[tono cercano] Hoy casi todo lo que usas es digital. Pero una tormenta perfecta está a punto de traer de vuelta lo analógico.
[tono asombrado] Y todo empieza con un error, un experimento fallido, y un hombre que se ahogó antes de ver si tenía razón.
[tono curioso] Una computadora analógica no calcula con ceros y unos. Calcula con voltaje puro, subiendo y bajando como una masa en un resorte.
El circuito eléctrico ES el problema físico. Solo que ocurre mucho más rápido.
[tono asombrado] Con esto puedes simular el clima, el caos, cualquier ecuación diferencial, solo cambiando cables de sitio.
[tono cercano] Y es rapidísima. Para sumar dos números, una computadora digital necesita unos 50 transistores.
Una analógica solo necesita conectar dos cables.
Para multiplicar, lo digital necesita mil transistores.
[tono curioso] Lo analógico solo necesita una resistencia. Voltaje entre resistencia, y ya tienes la multiplicación gratis.
[tono cómico] Pero lo analógico tiene un problema serio: no sirve para propósitos generales.
No vas a escribir un documento de Word en una de estas.
[tono cercano] Y como todo es continuo, nunca obtienes el mismo resultado dos veces. Siempre hay un margen de error del uno por ciento.
[tono intrigante] Por eso lo digital ganó la guerra en cuanto se hizo viable. Fin de la historia, durante setenta años.
[tono asombrado] Hasta que llegó la inteligencia artificial, y todo volvió a estar en juego.
[tono cercano] En 1958, un psicólogo llamado Frank Rosenblatt construyó una máquina para imitar neuronas.
La llamó el Perceptrón.
[tono curioso] Una neurona artificial hace algo muy simple: recibe señales, las multiplica por un peso, y las suma todas.
Si la suma supera cierto umbral, la neurona se dispara. Si no, se queda callada.
[tono cercano] El Perceptrón de Rosenblatt tenía 400 células fotosensibles, como una imagen de 20 por 20 píxeles.
Todas conectadas a una única neurona de salida, cada una con su propio peso ajustable.
[tono asombrado] El objetivo era simple: distinguir un círculo de un rectángulo.
Al principio, todos los pesos empezaban en cero. La máquina no sabía nada.
[tono curioso] Le enseñaban círculos y rectángulos, uno tras otro, y cada vez que se equivocaba, ajustaba sus propios pesos un poquito.
Y funcionó. Aprendió solo, a base de errores corregidos.
[tono intrigante] Los medios enloquecieron. El New York Times escribió que la Marina esperaba una máquina capaz de caminar, hablar, ver, escribir, reproducirse, y ser consciente de su propia existencia.
[tono cómico] Un ordenador de los años 50, del tamaño de un armario, del que se esperaba que tuviera alma.
[tono cercano] La realidad fue más humilde: el Perceptrón ni siquiera podía distinguir un perro de un gato.
[tono intrigante] En 1969, dos investigadores del MIT publicaron un libro destrozando sus límites matemáticos.
Fue el primer invierno de la inteligencia artificial. La financiación se congeló de la noche a la mañana.
[tono cálido] Rosenblatt no llegó a verlo. Murió ahogado navegando, el día de su cumpleaños número cuarenta y tres.
[tono asombrado] Pero su idea no murió con él. Volvió en los años 80, dentro de un camión.
[tono curioso] Investigadores de Carnegie Mellon construyeron ALVINN, un camión que conducía solo, guiado por una red neuronal con una capa oculta de neuronas entre la entrada y la salida.
Un humano conducía primero, enseñándole el ángulo de giro correcto para cada imagen del camino.
[tono cómico] La velocidad máxima del camión autónomo era de dos kilómetros por hora. El cuello de botella no era la inteligencia, era la velocidad de cálculo.
[tono cercano] En los 90 llegó otro invierno. Nadie sabía si el problema era el software, o simplemente que faltaba hardware.
[tono intrigante] A mediados de los 2000, una investigadora llamada Fei-Fei Li tuvo una idea distinta: quizás el problema nunca fue el algoritmo. Quizás faltaban datos.
[tono asombrado] Entre 2006 y 2009 construyó ImageNet: una base de datos con un millón doscientas mil imágenes, etiquetadas a mano.
[tono cercano] Con eso, organizó una competición anual para clasificar imágenes en mil categorías distintas.
En 2010, la mejor red se equivocaba casi un tercio de las veces.
[tono curioso] En 2011, mejoró un poco. Pero en 2012, todo cambió de golpe.
[tono intrigante] Una red llamada AlexNet arrasó la competición, con una tasa de error de solo el dieciséis por ciento.
[tono asombrado] Tenía ocho capas, quinientas mil neuronas, y sesenta millones de pesos que ajustar. Y se entrenó usando tarjetas gráficas, no procesadores normales.
Su artículo se ha citado más de cien mil veces. Fue el pistoletazo de salida de la IA moderna.
[tono cómico] Para 2015, una red de cien capas ya clasificaba imágenes mejor que un humano.
[tono cercano] Pero ese éxito trajo un problema nuevo, y muy caro.
[tono intrigante] Entrenar una sola red neuronal grande puede gastar tanta electricidad como tres casas en un año entero.
[tono curioso] Y la mayor parte de esa energía no se gasta calculando. Se gasta moviendo datos de la memoria al procesador, una y otra vez.
[tono asombrado] Además, los transistores ya casi tienen el tamaño de un átomo. No queda mucho margen para encogerlos más.
[tono intrigante] Digital llegando a su límite físico, redes neuronales cada vez más grandes, y casi todo su trabajo reducido a una sola operación: multiplicar y sumar.
[tono cálido] Esa es la tormenta perfecta que puede traer de vuelta lo analógico.
[tono cómico] Y aquí está el giro final: a una red neuronal no le importa ser un poco imprecisa.
[tono cercano] Si está noventa y siete por ciento segura de que ve una gallina, sigue siendo una gallina.
[tono asombrado] Justo el error que hundió a las computadoras analógicas hace setenta años, a la inteligencia artificial no le molesta en absoluto.
[tono curioso] Hoy existen chips analógicos reales para redes neuronales. Reutilizan memoria flash corriente, pero de una forma ingeniosa.
[tono cercano] En vez de guardar solo un cero o un uno, guardan una cantidad exacta de electrones, como una resistencia variable.
[tono asombrado] Aplicas un voltaje, y la corriente resultante ya es, literalmente, la multiplicación hecha por la física misma.
[tono intrigante] Uno de estos chips hace veinticinco billones de operaciones por segundo, usando solo tres vatios de energía.
[tono cómico] Un chip digital equivalente necesita decenas de vatios, y cuesta miles de dólares.
[tono cercano] Ya se usan para cámaras de seguridad, inspección en fábricas, y para que un altavoz inteligente reconozca su palabra de activación gastando casi nada de batería.
[tono curioso] Todavía tienen un límite: la señal analógica se distorsiona si encadenas demasiadas operaciones seguidas.
Así que los chips actuales alternan: analógico, digital, analógico otra vez, para no perder la señal por el camino.
[tono asombrado] Hay algo casi poético en todo esto: para construir su Perceptrón original, Rosenblatt no tenía suficiente potencia digital.
[tono cálido] Así que construyó su propia computadora analógica a mano, con resistencias variables y pequeños motores.
[tono intrigante] Su idea sobre las redes neuronales resultó ser correcta. Puede que su instinto analógico también lo fuera.
[tono cercano] Nuestro propio cerebro es digital, en el sentido de que una neurona se dispara o no.
[tono cálido] Pero también es profundamente analógico: el pensamiento ocurre en todas partes a la vez.
Quizás para lograr una inteligencia artificial de verdad, hace falta algo del poder de lo analógico.
Suscríbete si quieres que sigamos abriendo la caja negra de la IA.
