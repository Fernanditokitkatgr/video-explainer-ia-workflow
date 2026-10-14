# Cómo funcionan los deepfakes (y cómo detectarlos) — guion v1 (ElevenLabs v3)

**Tema**: qué es de verdad un deepfake (síntesis de cara y/o voz generada o intercambiada por IA,
no edición de vídeo tradicional); la técnica detrás, la GAN, explicada con la analogía de un
falsificador y un experto de arte compitiendo y mejorando entre ellos; qué hace falta hoy para
generar uno (mucho menos dato y cálculo que hace unos años, unas pocas fotos o vídeos públicos
como punto de partida, dicho en términos cualitativos); clonación de voz con muy poco audio de
referencia; historia honesta (el término nace sobre 2017, casos conocidos de vídeos falsos de
políticos y de famosos, mencionados en general sin acusar a nadie); señales de detección
evergreen (parpadeo, luz y sombras inconsistentes, bordes borrosos, desajuste audio-labios, piel
demasiado lisa, reflejos que no cuadran, comprobar la fuente en otro medio verificado); la IA de
detección existe pero libra una carrera constante contra la de generación, ningún truco es
infalible; consejo práctico (verificar la fuente original, desconfiar de lo urgente/emocional que
pide dinero o acción, comprobar si medios serios cuentan lo mismo); y un cierre honesto con usos
legítimos (doblaje, accesibilidad, restauración de cine) para no quedarse solo en el miedo.
**Canal**: tecno
**Formato**: explicativo evergreen buscable ("qué es un deepfake", "cómo funcionan los
deepfakes", "cómo detectar un deepfake", "cómo saber si un vídeo es falso")
**Duración estimada**: 6-7 min
**Prueba de demanda**: backlog tema #12. Familia "Así funciona X", el patrón evergreen que mejor
funciona en el canal (1.009 vistas el explicativo más visto). Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: explica el mecanismo real (dos redes compitiendo) con una analogía
sencilla en vez de quedarse en "la IA hace trampas", y cierra con señales de detección prácticas
y evergreen en vez de nombrar una app o servicio concreto que quedará desactualizado en meses.
**Hilo conductor**: el vídeo del político/famoso que dice algo que nunca dijo abre el vídeo; la
frase recurrente "Ver ya no es creer" aparece en la apertura y se resuelve en el cierre junto con
el callback literal a ese mismo vídeo de apertura, ya explicado paso a paso.
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).
Las negaciones clave van siempre con un verbo al lado (no es, nunca dijo, jamás grabó, no
coinciden) o con palabras fuertes (ningún, nadie, jamás), nunca con un "sin" o un "no" sueltos de
los que dependa el hecho importante.

---

[curious] Imagina un vídeo de un político anunciando algo gravísimo.
[serious] Habla con su voz de siempre. Mueve la boca con total naturalidad.
[tense] Pero esa persona jamás dijo esas palabras.
[tense] Ese vídeo lo generó una inteligencia artificial, de principio a fin.
[serious] Y a simple vista resulta casi imposible notar la diferencia.
[tense] Hace unos años esto solo se veía en estudios de cine con presupuestos enormes.
[confident] Eso es un deepfake.
[emphatic] Ver ya no es creer.
[serious] Hoy vas a entender cómo se fabrica un vídeo así.
[serious] Qué hace falta de verdad para crearlo.
[serious] Y qué señales delatan a un deepfake aunque parezca perfecto.
[confident] Empecemos por lo básico.

[serious] Un deepfake no es un vídeo editado a mano, fotograma a fotograma, como un montaje clásico.
[serious] Es una cara, o una voz, generada o intercambiada por una inteligencia artificial.
[confident] El nombre mezcla dos palabras en inglés. "Deep learning", aprendizaje profundo. Y "fake", falso.
[curious] La IA aprende cómo se mueve una cara real. Cómo gesticula. Cómo parpadea. Cómo encaja la luz sobre la piel.
[curious] Y luego construye una versión nueva, sintética, que imita ese movimiento con mucho detalle.
[tense] No es pegar una cara encima de otra como en una foto de broma de toda la vida.
[emphatic] Es generar una cara entera, píxel a píxel, que nunca existió de esa forma exacta.

[curious] ¿Y cómo aprende una IA a generar algo tan parecido a lo real?
[serious] Ahí entra una técnica con nombre propio.
[confident] Se llama GAN. Red generativa antagónica.
[curious] Imagina dos personas compitiendo entre ellas, una contra otra, durante mucho tiempo.
[curious] Una es un falsificador. Su trabajo es pintar un cuadro falso que parezca auténtico.
[curious] La otra es un experto en arte. Su trabajo es detectar cuál cuadro es la falsificación.
[serious] El falsificador pinta un cuadro. El experto lo mira y dice "esto es falso, aquí se nota el fallo".
[serious] El falsificador corrige ese fallo exacto y pinta otro cuadro, mejor que el anterior.
[tense] El experto vuelve a fallarlo. Y vuelve a explicar, con detalle, qué lo delató esta vez.
[confident] Esa competición se repite miles y miles de veces, una ronda tras otra.
[emphatic] Al final el falsificador pinta cuadros que el experto ya confunde con los reales.
[serious] Un deepfake se entrena exactamente así, pero con dos redes neuronales en vez de dos personas.
[serious] Una genera caras falsas. La otra intenta adivinar cuáles son falsas.
[confident] Compitiendo entre ellas, las dos mejoran a la vez. Y la generadora acaba produciendo caras casi perfectas.
[tense] Ninguna de las dos redes "entiende" una cara como la entiendes tú. Solo compiten, una contra otra, millón de rondas tras millón de rondas.
[emphatic] Y de esa competición mecánica sale, al final, algo que a tus ojos parece real.

[serious] Hace unos años, entrenar algo así exigía muchísimos datos y muchísima potencia de cálculo.
[serious] Un equipo técnico entero, muchas horas de vídeo de la persona, y ordenadores muy potentes dedicados solo a eso.
[serious] Hoy hace falta bastante menos de las dos cosas.
[tense] Unas pocas fotos públicas, o un vídeo corto de alguien, el tipo de material que cualquiera cuelga en redes, puede bastar como punto de partida.
[serious] Esa es la parte que de verdad ha cambiado en los últimos años.
[emphatic] Lo que antes exigía un estudio especializado, hoy lo facilitan herramientas mucho más accesibles para cualquiera.
[tense] Cuanta más foto y vídeo público existe de una persona, más fácil resulta entrenar una versión convincente de su cara.
[serious] Por eso quien más expuesto está en redes y en vídeo público es, también, quien más fácil resulta imitar.

[curious] La misma lógica se aplica también a la voz.
[serious] Con muy pocos segundos de audio real de una persona, un sistema moderno puede imitar su tono, su ritmo, hasta sus muletillas.
[tense] Esa voz clonada puede leer cualquier texto nuevo. Un texto que la persona real jamás grabó.
[emphatic] Cara y voz sintéticas juntas son las que hacen que un deepfake resulte tan convincente.

[serious] El término "deepfake" apareció alrededor de 2017.
[serious] Nació de una comunidad de internet que intercambiaba este tipo de vídeos generados entre ellos.
[curious] Desde entonces ha habido casos conocidos y bien documentados.
[serious] Vídeos falsos de figuras políticas diciendo cosas que nunca dijeron.
[serious] Caras de actores y famosos intercambiadas en vídeos que se volvieron virales.
[tense] En los primeros años, esos vídeos se delataban con facilidad. Un parpadeo raro, un borde que temblaba.
[tense] Hoy la calidad ha mejorado tanto que distinguirlos a simple vista cuesta mucho más.
[tense] Casos así generaron alarma real sobre dónde queda el límite entre lo real y lo fabricado.
[serious] Y cuanto más circula un vídeo así antes de desmentirse, más gente se queda con la versión falsa en la cabeza.
[confident] Por eso cada vez más gente busca aprender a detectar un deepfake por su cuenta.

[serious] Vamos con las señales que de verdad ayudan a detectarlo.
[confident] Primera señal. El parpadeo.
[tense] Muchos sistemas generan caras que parpadean muy poco, o de forma rara y mecánica.
[serious] Fíjate si los ojos parpadean con naturalidad, al ritmo de una conversación normal.
[confident] Segunda señal. La luz y las sombras.
[tense] Comprueba si la iluminación de la cara coincide con la del resto de la escena.
[serious] Una sombra que cae en una dirección distinta a la del fondo es una pista sospechosa.
[serious] La IA genera la cara y el fondo casi por separado, y a veces se le nota la costura.
[confident] Tercera señal. Los bordes.
[tense] Mira el contorno de la cara. El nacimiento del pelo. Las orejas.
[serious] Ahí es donde más fallan estos sistemas. Bordes borrosos, deformados, mal pegados al fondo.
[tense] El pelo suelto, en concreto, cuesta mucho de generar bien hebra a hebra.
[confident] Cuarta señal. El audio y los labios.
[tense] Fíjate si el movimiento de la boca encaja con el sonido exacto de cada palabra.
[serious] Un desfase pequeño, pero constante durante todo el vídeo, es una pista fuerte.
[confident] Quinta señal. La piel.
[tense] Una piel demasiado lisa, casi de plástico, que apenas marca un poro o una arruga, delata un rostro generado.
[confident] Sexta señal. Los reflejos.
[tense] Mira los reflejos en los ojos, y en unas gafas si la persona las lleva puestas.
[serious] Esos reflejos deberían coincidir con el entorno real. Muchas veces no coinciden entre sí.
[confident] Y una última comprobación, la más fiable de todas.
[emphatic] Busca esa misma noticia en otra fuente verificada. Si es real, nunca aparece sola.
[serious] Ninguna señal sola es prueba definitiva. Pero varias juntas, sí dan una pista muy fiable.

[serious] Ya existen herramientas de inteligencia artificial pensadas justo para detectar deepfakes.
[tense] El problema es que la generación mejora al mismo ritmo que la detección.
[serious] Es una carrera constante entre quien genera y quien detecta, igual que el falsificador contra el experto de antes.
[tense] Un detector que funciona hoy puede quedarse corto dentro de unos meses, cuando la generación mejore un poco más.
[emphatic] Ningún truco aislado es infalible para siempre, así que conviene combinar varias señales a la vez.

[serious] Entonces, ¿qué puedes hacer tú de verdad frente a esto?
[confident] Primero. Verifica la fuente original antes de compartir nada.
[serious] Busca si un medio serio y verificado cuenta exactamente lo mismo.
[tense] Desconfía todavía más cuando el contenido pide una acción urgente o dinero, con tono de emergencia emocional.
[emphatic] Esa urgencia es, precisamente, la táctica favorita de quien quiere engañarte con esto.
[serious] Una llamada o un mensaje de voz clonado pidiendo una transferencia inmediata encaja justo en ese patrón.
[confident] Tómate un segundo antes de reaccionar. Ese segundo es tu mejor defensa real.
[serious] Y si puedes, confirma por otra vía distinta. Una llamada directa a esa persona, por ejemplo, nunca por el mismo canal donde llegó el mensaje.

[serious] No todo uso de esta tecnología busca engañar a nadie.
[confident] El mismo tipo de sistema dobla películas a otros idiomas moviendo los labios del actor de forma natural, sincronizados con la nueva lengua.
[confident] Ayuda también a recuperar la voz de personas que la perdieron por una enfermedad, usando grabaciones antiguas suyas como referencia.
[confident] Y restaura, en el cine, escenas antiguas o efectos visuales difíciles de lograr de otra forma, como rejuvenecer a un actor para una escena puntual.
[serious] La herramienta en sí misma no es buena ni mala. Depende por completo de quién la use y para qué.

[serious] Así que vuelve a ese vídeo del principio. El político que decía algo que nunca dijo.
[confident] Ahora ya sabes cómo se genera una cara así. Dos redes compitiendo entre ellas, una y otra vez.
[confident] Y ya sabes qué mirar la próxima vez. El parpadeo. La luz. Los bordes. El audio. La piel. Los reflejos.
[emphatic] Ver ya no es creer.
[emphatic] Pero ahora tú sabes mirar mejor que la mayoría.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
