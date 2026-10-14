# AlphaGo, la IA que aprendió a jugar sola (y venció al campeón del mundo) — guion v1 (ElevenLabs v3)

**Tema**: qué es el juego Go (origen milenario en China, reglas simples pero un número de
partidas posibles mayor que átomos hay en el universo observable, sin cifra inventada, solo la
comparación cualitativa), por qué durante décadas se consideró imposible de resolver para un
ordenador a diferencia del ajedrez (no se puede fuerza bruta, hace falta "intuición"); marzo de
2016, el match AlphaGo contra Lee Sedol, campeón mundial surcoreano, en Seúl; la jugada 37 de la
partida 2, el movimiento que ningún humano habría hecho y que los comentaristas no supieron
explicar en el momento (el "mano de dios"); cómo funcionaba AlphaGo por dentro, en términos
cualitativos y honestos: primero entrenado viendo miles de partidas de jugadores humanos
profesionales (aprendizaje supervisado) para tener una base; después mejorado jugando contra
versiones de sí mismo, millones de partidas, un proceso de prueba y error llamado aprendizaje
por refuerzo, donde gana puntos por ganar partidas y ajusta su comportamiento futuro; dos redes
neuronales trabajando juntas, una que propone qué movimientos probar y otra que valora qué tan
buena es una posición del tablero, combinadas con una búsqueda que explora varias partidas
posibles por adelantado antes de decidir; la secuela AlphaGo Zero, publicada en 2017, que ya ni
siquiera miró partidas humanas de entrada, aprendió el juego solo jugando contra sí misma desde
cero, partiendo de movimientos aleatorios, y en pocos días de entrenamiento superó a la versión
que había vencido a Lee Sedol; por qué esto importó mucho más allá de un juego de mesa: la misma
idea de "aprender jugando contra uno mismo, sin que un humano le enseñe la respuesta correcta" se
convirtió en la base de sistemas posteriores, incluido AlphaFold (predicción de la forma de
proteínas) del mismo laboratorio, DeepMind; cierre honesto sobre los límites: AlphaGo es
inteligencia artificial estrecha, solo sabe jugar Go y nada más, no es una inteligencia general,
no "piensa" ni "entiende" el mundo como una persona, pero el principio de aprender por ensayo y
error contra sí misma sigue usándose hoy en otros sistemas de IA.
**Canal**: tecno
**Formato**: explicativo evergreen con historia real como hilo conductor ("qué es AlphaGo", "IA
que jugó Go", "Lee Sedol AlphaGo", "cómo aprende una IA sola", "aprendizaje por refuerzo
explicado fácil")
**Duración estimada**: 7-8 min
**Prueba de demanda**: backlog tema #14. Hito real y muy documentado en la historia de la IA,
con un "villano/héroe" humano real (Lee Sedol) y un momento icónico y verificable (la jugada 37)
que funciona igual de bien como gancho de vídeo largo y de Short.
**Ángulo diferenciado**: no es un vídeo de "cómo funciona el Go", es la historia de un momento
real contada con honestidad técnica real detrás: qué aprendizaje por refuerzo significa de
verdad, sin tecnicismos innecesarios, y por qué ese momento de 2016 sigue explicando cómo se
entrena la IA de hoy.
**Hilo conductor**: la pregunta "¿cómo le enseñas a una máquina algo que ni los expertos humanos
saben explicar del todo?" abre el vídeo con la jugada 37 y se resuelve explicando aprendizaje
por refuerzo y autojuego.
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).
Las negaciones clave van siempre con un verbo al lado (no existe, no tiene, nunca consigue) o con
palabras fuertes (ningún, ninguna), nunca con un "sin" o un "no" sueltos de los que dependa el
hecho importante.

---

[tense] Marzo de 2016, en un hotel de Seúl, un ordenador hace un movimiento que deja en silencio a toda la sala.
[tense] Los comentaristas, maestros de Go con décadas de experiencia, no saben qué está pasando.
[curious] Uno de ellos dice, en directo, que cree que es un error del programa.
[tense] No lo era.
[serious] Esa jugada, hoy conocida simplemente como la jugada 37, cambió para siempre cómo entendemos la inteligencia artificial.
[confident] Hoy vas a entender qué pasó realmente esos días en Seúl.
[serious] Vas a entender por qué el Go se consideraba, hasta ese momento, imposible para una máquina.
[serious] Vas a entender cómo aprende de verdad una IA cuando nadie le da las respuestas.
[confident] Empecemos por el juego que todos daban por imposible de resolver.

[serious] El Go es un juego de mesa con más de dos mil años de historia, nacido en China.
[serious] Sus reglas son de una sencillez casi infantil.
[serious] Dos jugadores colocan piedras, negras y blancas, sobre un tablero cuadriculado, turno tras turno.
[emphatic] Rodea el territorio de tu rival, y esas piedras pasan a ser tuyas.
[tense] Pero de esa sencillez nace una complejidad descomunal.
[emphatic] El número de partidas distintas que se pueden jugar en un tablero de Go es mayor que el número de átomos que hay en todo el universo observable.
[serious] En ajedrez, un ordenador potente podía ya ganar a los mejores humanos calculando por fuerza bruta, probando muchísimas jugadas por adelantado.
[tense] En Go, esa fuerza bruta no sirve de nada.
[serious] Hay demasiadas partidas posibles para calcularlas todas, ni con el ordenador más potente del planeta.
[curious] Un jugador humano experto no gana calculando cada opción.
[serious] Gana con algo parecido a la intuición, una sensación entrenada durante años sobre qué forma de jugar "se ve bien" en el tablero.
[tense] Durante décadas, enseñarle esa intuición a una máquina pareció, sencillamente, imposible.

[serious] Ahí entra DeepMind, un laboratorio de inteligencia artificial, con un programa llamado AlphaGo.
[serious] Y ahí entra Lee Sedol, uno de los mejores jugadores de Go del mundo, campeón de múltiples títulos internacionales.
[confident] Antes del partido, casi nadie esperaba que AlphaGo tuviera una sola oportunidad real.
[tense] El propio Lee Sedol predijo que ganaría la serie entera, sin perder ni una sola partida.
[tense] Perdió la primera partida.
[tense] Y la segunda.
[tense] En esa segunda partida llegó la jugada 37.

[serious] Una jugada que ningún jugador humano de nivel alto habría elegido jamás en esa posición.
[curious] Rompía con siglos de forma de jugar aceptada, con lo que todo buen jugador "sabe" que no se hace.
[tense] Los comentaristas tardaron minutos en encontrarle sentido.
[emphatic] Y esa jugada, la que parecía un error, terminó siendo clave para ganar esa partida.
[serious] AlphaGo terminó ganando la serie completa, cuatro partidas a una.
[emphatic] Fue la primera vez que una máquina venció al campeón humano en un juego que, hasta ese mismo día, se consideraba territorio exclusivo de la intuición humana.

[curious] ¿Pero cómo aprende de verdad una máquina a jugar así?
[serious] No le programaron las reglas de "qué jugada es buena".
[serious] Nadie le dio una lista de trucos ganadores.
[serious] AlphaGo aprendió en dos fases.

[serious] En la primera fase, el sistema observó cientos de miles de partidas jugadas por jugadores humanos profesionales, ya almacenadas de torneos reales.
[serious] De ahí sacó una primera idea de qué movimientos suelen funcionar en según qué situaciones.
[serious] Esta parte se llama aprendizaje supervisado, el sistema aprende imitando ejemplos que ya existen.
[tense] Pero imitar a humanos solo le permitía llegar hasta el nivel de un buen jugador humano, no más allá.

[serious] La segunda fase es la que de verdad cambió las reglas del juego.
[serious] AlphaGo empezó a jugar millones de partidas contra versiones de sí mismo.
[serious] Cada partida terminaba en victoria o derrota, y ese resultado final servía para ajustar su comportamiento futuro.
[emphatic] Si una forma de jugar le llevaba a ganar más veces, el sistema reforzaba esa forma de jugar.
[emphatic] Si le llevaba a perder, la abandonaba poco a poco.
[serious] Este proceso de prueba, error y ajuste constante se llama aprendizaje por refuerzo.
[confident] Nadie le dijo nunca "esta jugada es buena".
[confident] Lo descubrió jugando contra sí mismo, millones de veces, más partidas de las que un humano juega en toda una vida entera.

[serious] Por dentro, dos piezas trabajaban juntas en cada turno.
[serious] Una red neuronal, encargada de proponer qué movimientos merece la pena probar en esa posición concreta del tablero.
[serious] Y otra red neuronal distinta, encargada de valorar qué tan buena es esa posición para ganar la partida.
[serious] Con esas dos valoraciones, el sistema exploraba por adelantado varias partidas posibles antes de decidir su siguiente movimiento real.
[serious] Así combinaba algo parecido a la intuición, de la primera red, con algo parecido al cálculo, de esa búsqueda por adelantado.

[confident] Un año después, en 2017, DeepMind presentó una versión todavía más sorprendente, llamada AlphaGo Zero.
[tense] Esta nueva versión ni siquiera miró una sola partida humana al empezar.
[emphatic] Partió de movimientos completamente aleatorios, sin ninguna idea previa de cómo jugar bien.
[serious] Aprendió jugando contra sí misma desde cero, pura prueba y error, generación tras generación.
[emphatic] En solo tres días de entrenamiento, superó a la versión original que había vencido a Lee Sedol.
[tense] Partiendo de cero absoluto, sin ni un solo ejemplo humano de por medio.

[curious] ¿Por qué un juego de mesa debería importarte a ti?
[serious] Porque la idea central detrás de todo esto, aprender por ensayo y error contra uno mismo, sin que un humano dé la respuesta correcta de antemano, no se quedó encerrada en un tablero de Go.
[serious] El mismo equipo de DeepMind usó principios parecidos para construir AlphaFold, un sistema capaz de predecir la forma en que se pliegan las proteínas, un problema que la biología llevaba décadas intentando resolver.
[emphatic] Una idea nacida para ganar a un campeón de Go terminó ayudando a avanzar la investigación médica real.

[serious] Ahora, la parte honesta.
[serious] AlphaGo es lo que se llama inteligencia artificial estrecha.
[tense] Sabe jugar Go, y solo Go, a un nivel sobrehumano.
[tense] No entiende el lenguaje, no reconoce caras, no sabe conducir un coche, no "piensa" ni "comprende" el mundo como lo hace una persona.
[serious] Fuera de ese tablero, es completamente inútil.
[emphatic] Lo que sí dejó fue un principio, aprender jugando contra uno mismo, que hoy sigue usándose para entrenar otros sistemas de inteligencia artificial muy distintos.

[serious] Aquella jugada 37 sigue estudiándose hoy en clubs de Go de todo el mundo.
[serious] Jugadores humanos la analizan, la discuten, e incluso algunos reconocen que les cambió su forma de entender el propio juego.
[confident] Una máquina entrenada jugando sola, millones de veces, le enseñó algo nuevo a los mejores jugadores humanos del planeta.
[emphatic] Esa, quizás, sea la mejor forma de resumir lo que pasó en Seúl aquel marzo de 2016.
[friendly] Si te gusta entender los momentos reales que cambiaron la historia de la tecnología, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
