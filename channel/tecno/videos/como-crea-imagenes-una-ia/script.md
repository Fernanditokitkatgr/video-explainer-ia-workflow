# Cómo crea imágenes una IA (y por qué falla con las manos) — guion v1 (ElevenLabs v3)

**Tema**: cómo genera imágenes una IA de texto a imagen con modelos de difusión. Primero se
desmonta el mito (la IA no busca la imagen en internet ni pega trozos de fotos: fabrica cada
píxel); entrenamiento explicado al revés (se destruye una foto real añadiendo ruido paso a paso y
la IA aprende a adivinar qué parte es ruido; el nombre "difusión" viene de la física, como una
gota de tinta que se difumina en agua); generación (se parte de ruido puro al azar y la IA lo
limpia en unas decenas de pasadas, de manchas a silueta a detalle, analogía del escultor); la
semilla de ruido explica por qué la misma frase da imágenes distintas; muchos modelos trabajan en
una versión comprimida de la imagen y otra pieza la amplía al final; cómo guía el texto (una
parte del sistema traduce la frase a números tras aprender de fotos con su descripción, y esos
números acompañan cada pasada como un imán, con un ajuste de fuerza de guiado); por qué fallan
las manos (la IA aprende patrones, nunca anatomía; en las fotos las manos salen tapadas, de lado
y ocupan poco; una cara es estable y una mano cambia en cada foto) y el texto dentro de la imagen
(ve las letras como formas, no como palabras); de dónde salen los datos (miles de millones de
imágenes de internet con su texto al lado, pie de foto o texto alternativo) y el debate de
derechos de autor contado con equilibrio: postura de artistas y fotógrafos, postura de las
empresas, demandas abiertas sin dar veredictos, y cambios reales (en Europa los autores pueden
pedir que sus obras queden fuera del entrenamiento; modelos entrenados con imágenes con licencia).
**Canal**: tecno
**Formato**: explicativo evergreen buscable ("cómo crea imágenes una IA", "cómo funciona la IA que
genera imágenes", "qué es un modelo de difusión", "por qué la IA dibuja mal las manos", "IA
imágenes derechos de autor")
**Duración estimada**: 6-7 min
**Prueba de demanda**: datos reales de YouTube Analytics (sept-oct 2026): los largos que más horas
de visualización dan son los explicativos "cómo funciona X de la IA" ("Así funciona REALMENTE la
Inteligencia Artificial": 2.174 min y 49% de retención; red neuronal; LLM). Familia "Así funciona
X". Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: explica la difusión al revés (primero destruir la imagen, luego aprender a
reconstruirla) y usa ESE mismo mecanismo para responder las dos preguntas que todo el mundo se
hace (manos de seis dedos y letras raras) y para llegar al debate de los datos. No repite el vídeo
de deepfakes (que explica las GAN, dos redes compitiendo, y señales para detectar caras falsas):
aquí la técnica es otra (difusión) y no hay sección de detección.
**Hilo conductor**: la pregunta "¿de dónde sale una imagen que nunca ha existido?" abre el vídeo
con el gato astronauta sobre Madrid y se resuelve literalmente en el cierre ("Sale del ruido"),
volviendo al mismo gato.
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).
Las negaciones clave van siempre con un verbo al lado (no busca, no lee, no sabe contar, no copia,
nunca estudió) o con palabras fuertes (nadie, ningún), nunca con un "sin" o un "no" sueltos de los
que dependa el hecho importante. Cifras siempre con letras.

---

[curious] Escribes una frase en una aplicación de inteligencia artificial.
[curious] Un gato astronauta flotando sobre Madrid al atardecer.
[serious] Pulsas un botón y esperas unos segundos.
[confident] Y aparece la imagen. Con su casco. Con sus bigotes. Con el cielo naranja detrás.
[tense] Esa imagen no existía hace un minuto.
[tense] Nadie la ha dibujado. Nadie la ha fotografiado jamás.
[curious] Entonces ¿de dónde sale una imagen que nunca ha existido?
[serious] Hoy vas a entenderlo paso a paso.
[serious] Vas a ver cómo una IA convierte ruido en un dibujo.
[serious] Vas a ver cómo tus palabras guían todo ese proceso.
[serious] Vas a entender por qué le cuestan tanto las manos y las letras.
[serious] Y vas a ver de dónde sacó todo lo que sabe. Que es justo donde empieza la polémica.
[confident] Empecemos por algo que parece una tontería. La nieve de una tele vieja.

[serious] Lo primero es quitarse una idea de la cabeza.
[serious] La IA no busca tu imagen en internet.
[serious] Tampoco recorta trozos de fotos ya hechas para pegarlos como un collage.
[emphatic] Fabrica cada píxel desde cero.
[serious] Y lo hace partiendo de algo que parece lo contrario de una imagen.
[curious] ¿Te acuerdas de la nieve que salía en las teles antiguas cuando se perdía la señal?
[serious] Puntos de colores repartidos al azar. Ruido puro.
[emphatic] Ahí empieza todo. En el ruido.

[serious] Para entender cómo sale una imagen del ruido hay que mirar primero cómo se entrena esta IA.
[serious] Y el entrenamiento hace justo lo contrario. Destruye imágenes.
[serious] Coges una foto real. Por ejemplo la de un perro en la playa.
[serious] Le añades un poco de ruido. Unos puntitos de colores por encima.
[serious] El perro todavía se ve perfectamente.
[serious] Le añades otro poco. Y otro más.
[tense] Después de muchos pasos el perro desaparece del todo.
[tense] Solo queda nieve. La misma nieve de la tele vieja.
[confident] Ahora viene el truco.
[serious] A la IA se le enseña a recorrer ese camino al revés.
[serious] Se le da una imagen con algo de ruido y se le hace una pregunta muy concreta.
[curious] ¿Qué parte de todo esto es ruido?
[serious] Al principio falla muchísimo.
[serious] Cada vez que falla se ajustan un poco sus conexiones internas para que la siguiente vez acierte algo más.
[serious] Y eso se repite con muchísimas imágenes. Millones y millones de veces.
[emphatic] Al final la IA se vuelve experta en una sola cosa. Quitar ruido.
[serious] Por eso a esta técnica se la llama difusión.
[serious] El nombre viene de la física. Piensa en una gota de tinta que se difumina en un vaso de agua.
[emphatic] La IA aprende a deshacer esa mezcla. A devolver la tinta a su gota.

[curious] ¿Y qué pasa cuando le pides tu gato astronauta?
[serious] La IA arranca desde ruido puro. Un ruido que se genera al azar en ese mismo momento.
[serious] Ahí dentro todavía no existe ningún gato.
[serious] Pero la IA hace lo único que sabe hacer. Intenta quitar un poco de ruido.
[serious] Y para quitarlo tiene que adivinar qué imagen podría esconderse debajo.
[serious] En la primera pasada solo salen manchas borrosas. Una zona más clara arriba. Una más oscura abajo.
[serious] En la siguiente pasada esas manchas empiezan a tener forma.
[serious] Unas pasadas después ya se adivina una silueta. Luego unas orejas. Luego el brillo del casco.
[emphatic] Es como un escultor que quita piedra hasta que aparece la figura.
[serious] Solo que aquí la piedra es ruido. Y el escultor quita un poco en cada pasada.
[serious] Normalmente son unas decenas de pasadas. Y en cada una la imagen gana detalle.
[curious] Y aquí va un detalle que sorprende a mucha gente.
[serious] Si cambias el ruido del principio sale otro gato distinto con la misma frase.
[serious] Por eso pides lo mismo dos veces y te salen dos imágenes diferentes.
[emphatic] Ese punto de partida al azar es lo que hace única cada imagen.
[serious] Hay un truco más para que todo esto vaya rápido.
[serious] Muchas de estas IAs trabajan sobre una versión pequeña y comprimida de la imagen.
[serious] Al terminar otra pieza la amplía hasta su tamaño real con todo su detalle.

[curious] Vale. Pero si empieza desde ruido al azar ¿cómo sabe que tiene que salir un gato y no una tostadora?
[serious] Aquí entra tu frase.
[serious] Antes de empezar otra parte del sistema traduce tus palabras a números.
[serious] Esa parte aprendió mirando muchísimas fotos junto a su descripción.
[serious] Así aprendió que la palabra gato va con orejas puntiagudas y bigotes.
[serious] Y que la palabra atardecer va con cielos naranjas y sombras largas.
[serious] Esos números acompañan a la IA en cada pasada de limpieza.
[emphatic] En cada pasada la IA busca qué ruido quitar para que aquello se parezca más a un gato astronauta.
[serious] Tu frase funciona como un imán. Va tirando de la imagen hacia lo que describes.
[serious] Hay incluso un ajuste para decidir con cuánta fuerza tira ese imán.
[serious] Si tira poco la IA se toma libertades. Si tira demasiado la imagen sale forzada y con colores exagerados.
[confident] Por eso escribir bien la frase cambia tanto el resultado.

[curious] Y ahora la pregunta que todo el mundo se ha hecho alguna vez.
[curious] ¿Por qué estas IAs dibujaban manos con seis dedos?
[serious] La respuesta tiene que ver con cómo aprenden.
[serious] La IA nunca estudió anatomía. Nadie le explicó que una mano tiene cinco dedos.
[serious] Solo aprendió patrones a base de ver muchísimas fotos.
[serious] Y en las fotos las manos son un lío.
[serious] Salen cogiendo cosas. Medio tapadas. De lado. Entrelazadas con otras manos.
[serious] Muchas veces se ven solo tres dedos. O dos. O ninguno.
[tense] Además ocupan un trozo pequeñísimo de la foto.
[emphatic] La IA aprende que una mano es un montón de dedos juntos. Pero no sabe contar.
[serious] Una cara tiene casi siempre la misma estructura. Dos ojos. Una nariz. Una boca.
[serious] Una mano cambia de forma en cada foto.
[serious] Por eso las caras salían bien mucho antes que las manos.
[confident] Los modelos más recientes han mejorado muchísimo en esto. Han visto más datos y mejor descritos.
[serious] Aun así cuando una mano hace algo raro todavía puede colarse algún dedo de más.

[curious] Con las letras dentro de la imagen pasaba algo parecido.
[serious] Pedías un cartel que dijera panadería y salía una palabra rara que parecía de un idioma inventado.
[serious] El motivo es el mismo.
[serious] La IA no lee las letras. Las ve como formas.
[serious] Sabe que un cartel lleva rayitas y curvas negras con un aspecto concreto.
[serious] Pero colocar cada letra en su orden exacto es algo que al principio se le escapaba.
[serious] Una mancha mal puesta en el cielo pasa desapercibida. Una sola letra mal se nota enseguida.
[confident] Las versiones nuevas escriben bastante mejor. Se entrenaron con más ejemplos de texto y entienden mejor las palabras.
[serious] Aun así un texto largo dentro de una imagen sigue siendo de lo más difícil para ellas.

[serious] Ahora la parte más delicada.
[curious] ¿De dónde salieron todas esas fotos con su descripción?
[serious] Sobre todo de internet.
[serious] Las empresas recopilaron miles de millones de imágenes publicadas en la red.
[serious] Muchas venían con un texto al lado. El pie de foto. O la descripción que se escribe para personas ciegas.
[serious] Ese texto es lo que le enseñó a la IA qué hay en cada imagen.
[tense] Y ahí había de todo.
[tense] Fotos de bancos de imágenes. Cuadros de museos. Dibujos de artistas que viven de su trabajo.
[tense] A la mayoría de esos autores nadie les pidió permiso.
[serious] Aquí empieza un debate que todavía está abierto. Y conviene contarlo bien.

[serious] Por un lado están muchos artistas y fotógrafos.
[serious] Dicen que su trabajo se usó para crear una herramienta que ahora compite con ellos.
[serious] Y que la IA puede imitar el estilo de un artista concreto si escribes su nombre en la frase.
[serious] Por otro lado están las empresas que crean estas IAs.
[serious] Defienden que la IA aprende patrones. Igual que un estudiante de arte que mira miles de cuadros.
[serious] Y que la imagen final es nueva. Que no copia ninguna obra concreta.
[serious] Las dos posturas tienen argumentos serios. Por eso hay demandas abiertas en varios países.
[serious] Hay pleitos de artistas y de bancos de imágenes contra empresas de IA.
[serious] Y los jueces todavía están decidiendo dónde está el límite.
[serious] Mientras tanto ya hay cambios.
[serious] En Europa las normas permiten a los autores pedir que sus obras queden fuera del entrenamiento.
[serious] Algunas empresas ya entrenan solo con imágenes que tienen licencia o que les han cedido.
[emphatic] La tecnología va muchísimo más rápido que la ley. Y esa es la verdadera discusión.

[serious] Así que volvamos al gato astronauta del principio.
[curious] ¿De dónde sale una imagen que nunca ha existido?
[confident] Sale del ruido.
[serious] De un puñado de puntos al azar que la IA va limpiando pasada a pasada.
[serious] Con tus palabras tirando de ella como un imán.
[serious] Y con todo lo que aprendió mirando millones de imágenes hechas por personas.
[emphatic] Por eso hace maravillas. Y por eso a veces le salen seis dedos.
[emphatic] La IA no imagina. Recuerda patrones y los mezcla de una forma que nadie había visto antes.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
