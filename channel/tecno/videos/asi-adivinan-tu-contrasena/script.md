# Así adivinan tu contraseña en segundos — guion v1 (ElevenLabs v3)

**Tema**: cómo se atacan las contraseñas a nivel conceptual, para que el espectador se proteja:
las webs no guardan tu contraseña sino su hash (huella), filtraciones (RockYou 2009), fuerza
bruta con la intuición combinatoria (PIN de 4 cifras = 10.000), tarjetas gráficas y hashes
rápidos vs lentos (bcrypt) + sal, ataques de diccionario (123456), por qué las sustituciones
tipo P@ssw0rd no sirven, relleno de credenciales (reutilizar contraseñas), phishing, y qué te
protege: frases de contraseña, gestor, verificación en dos pasos, llaves de acceso (passkeys),
y cómo comprobar si te han filtrado (Have I Been Pwned).
**Canal**: tecno
**Formato**: evergreen explicativo buscable ("cómo hackean contraseñas", "contraseña segura")
**Duración estimada**: 6-7 min
**Prueba de demanda**: ≈ tema clásico de NetworkChuck / Computerphile. Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: divulgativo y DEFENSIVO. Se explica el concepto de cada ataque (sin
herramientas, comandos ni pasos) para que se entienda por qué funcionan los consejos de seguridad.
**Hilo conductor**: la contraseña de ejemplo "Sara2024" (parece segura: mayúscula + números) se
pone a prueba en cada parada. Frase recurrente: "nadie la adivina, la prueban". Analogía de
apoyo: el hash es la huella dactilar de tu contraseña (de la huella no se puede fabricar el dedo).
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).

---

[curious] Pongamos que tu contraseña es Sara2024.
[confident] Tiene una mayúscula. Tiene números. Parece bastante segura.
[tense] Pues un ordenador normal podría adivinarla en segundos.
[serious] Y no necesita conocerte. Ni espiarte. Ni tener suerte.
[emphatic] Hoy vas a ver cómo lo hacen. Y cómo evitar que te pase a ti.
[curious] La web donde te registras ni siquiera conoce tu contraseña.

[serious] Cuando creas una cuenta, una web bien hecha no guarda lo que escribes.
[confident] Guarda otra cosa. Algo que se llama hash.
[curious] Un hash es como la huella dactilar de tu contraseña.
[serious] Una fórmula matemática coge tu contraseña y la convierte en una ristra de letras y números.
[confident] La misma contraseña da siempre la misma huella.
[tense] Pero cambia una sola letra y la huella sale completamente distinta.
[curious] Con la contraseña sacas la huella en un instante. Con la huella no puedes reconstruir la contraseña.
[confident] Igual que nadie puede fabricar tu dedo a partir de tu huella.
[serious] Así que cuando inicias sesión la web no compara contraseñas.
[confident] Calcula la huella de lo que acabas de escribir. Y mira si coincide con la que tiene guardada.
[emphatic] Si coincide, entras. Tu contraseña real no está guardada en ningún sitio.
[tense] ¿Entonces cómo consiguen adivinarla?
[serious] Todo empieza el día en que alguien roba esas huellas.

[serious] Las webs sufren robos de datos constantemente. Se les llama filtraciones.
[serious] En 2009 hackearon una empresa llamada RockYou. Hacía aplicaciones para redes sociales.
[tense] Guardaba las contraseñas tal cual. Sin huella. En texto normal.
[emphatic] Se filtraron unos 32 millones de contraseñas. Escritas por personas reales.
[curious] Y esa lista se convirtió en algo que nadie esperaba. En un manual de cómo elige contraseña la gente.
[serious] Hoy lo normal es que se roben huellas.
[confident] Como la huella no se puede dar la vuelta, el atacante hace justo lo contrario.
[curious] Coge una contraseña posible. Calcula su huella. Y la compara con las robadas.
[serious] Si no coincide, prueba con otra. Y otra. Y otra.
[emphatic] Nadie adivina tu contraseña. La prueban. Millones de veces.

[serious] La forma más bruta de probar se llama literalmente fuerza bruta.
[curious] Probar todas las combinaciones. Una detrás de otra.
[confident] Piensa en el PIN de cuatro cifras de tu tarjeta.
[serious] Cada cifra puede ir del cero al nueve. Son diez opciones.
[confident] Diez por diez por diez por diez. Salen diez mil combinaciones.
[serious] Por eso el cajero te bloquea la tarjeta tras unos pocos fallos. No te deja probar las diez mil.
[curious] Pero con las huellas robadas en su ordenador nadie bloquea al atacante.
[serious] Ahora cambia las cifras por letras minúsculas. Cada hueco tiene veintiséis opciones.
[confident] Y aquí está la magia. Cada carácter que añades multiplica todas las combinaciones.
[curious] Con una letra hay veintiséis. Con dos ya hay seiscientas setenta y seis.
[tense] Con ocho letras minúsculas pasas de doscientos mil millones de combinaciones.
[confident] Y si mezclas mayúsculas y números y símbolos, cada hueco tiene casi cien opciones.
[serious] Suena a muchísimo. Pero para una máquina moderna no lo es tanto.

[serious] Aquí entran las tarjetas gráficas. Las mismas que se usan para jugar.
[curious] Están pensadas para hacer millones de cálculos pequeños a la vez.
[tense] Con algunas fórmulas de huella antiguas y rápidas, una sola tarjeta puede probar miles de millones de contraseñas por segundo.
[serious] A ese ritmo esas ocho letras minúsculas caen en cuestión de minutos.
[confident] Las webs serias usan fórmulas lentas a propósito. Una de las más conocidas se llama bcrypt.
[serious] Para ti no se nota. Entrar en tu cuenta tarda una fracción de segundo más.
[tense] Pero para el atacante sí se nota. Sus miles de millones de intentos por segundo se desploman.
[confident] Y además mezclan cada contraseña con un ingrediente distinto. Se llama sal.
[serious] Gracias a la sal dos personas con la misma contraseña tienen huellas distintas.
[emphatic] El problema es que no todas las webs lo hacen bien. Y tú no puedes saber cuál lo hace.

[serious] Pero los atacantes tienen un truco mucho más listo que probarlo todo.
[curious] Empiezan por lo que la gente usa de verdad.
[confident] Se llama ataque de diccionario. En vez de combinaciones al azar prueban listas de palabras y contraseñas reales.
[tense] Y aquí vuelve a aparecer la lista de RockYou. Y todas las filtraciones que vinieron después.
[curious] ¿Quieres saber cuál suele encabezar esas listas año tras año?
[emphatic] La reina de todas es 123456.
[serious] Justo detrás suelen aparecer password y qwerty.
[confident] Así no necesitan probar todas las combinaciones.
[tense] Y una parte enorme de las contraseñas cae en los primeros minutos.

[serious] Aquí mucha gente cree tener un truco. Cambiar letras por símbolos.
[curious] En vez de password escribes la a con una arroba. Y la o con un cero.
[tense] Parece imposible de adivinar. Pero los atacantes lo conocen desde hace años.
[confident] Sus programas aplican reglas automáticas a cada palabra de la lista.
[serious] Cambian la a por una arroba. La o por un cero. La e por un tres.
[confident] Ponen la primera letra en mayúscula. Añaden un año al final. O un signo de exclamación.
[curious] Y ahora volvamos a Sara2024.
[tense] Es un nombre con la primera letra en mayúscula. Y un año al final.
[serious] Es exactamente el patrón que esas reglas prueban primero.
[emphatic] Si la web usó una fórmula rápida, Sara2024 cae en segundos.

[serious] Pero hay algo todavía más peligroso. Y no tiene nada que ver con adivinar.
[curious] Imagina que usas la misma contraseña en tu correo. Y en esa tienda online donde compraste una vez.
[tense] Un día hackean la tienda. Y tu correo y tu contraseña acaban en una filtración.
[serious] Los atacantes cogen esa pareja de correo y contraseña. Y la prueban automáticamente en cientos de webs.
[confident] Se llama relleno de credenciales. En inglés, credential stuffing.
[tense] No les hace falta romper nada. Tu contraseña ya se la diste tú a otra web.
[emphatic] Si la repites, entrar en tu correo es como abrir con la llave original.
[serious] Por eso el peligro real no es tener una contraseña regular. Es tener la misma en todas partes.

[serious] Y queda la forma más fácil de todas. La que más se usa.
[curious] No adivinan tu contraseña. Te la piden.
[tense] Te llega un mensaje de tu banco. O de una empresa de paquetería. Con prisa y con miedo.
[serious] Tu cuenta se va a bloquear. Tienes un paquete retenido. Pulsa aquí.
[confident] El enlace te lleva a una página idéntica a la real. Mismo logo. Mismos colores.
[tense] Escribes tu contraseña. Y se la acabas de entregar directamente a ellos.
[serious] Esto se llama phishing. Y aquí da igual lo larga que sea tu contraseña.
[friendly] La regla es sencilla. Nunca entres desde el enlace de un mensaje. Abre tú la web o la aplicación oficial.

[serious] Vale. Ahora lo importante. Cómo protegerte.
[confident] Lo primero es la longitud. Cada carácter extra multiplica el trabajo del atacante.
[curious] Y la forma más fácil de ganar longitud es usar una frase de contraseña.
[confident] Cuatro o cinco palabras al azar que no tengan nada que ver entre sí.
[friendly] Algo como jirafa tostadora nube bicicleta. Larguísima. Rara. Y fácil de recordar.
[tense] Pero ojo. Al azar de verdad. Nada de frases famosas ni canciones.
[serious] Lo segundo es no repetir nunca una contraseña. Una distinta para cada web.
[curious] Y como nadie recuerda cien contraseñas existe el gestor de contraseñas.
[confident] Es como una caja fuerte digital. Crea contraseñas largas y únicas y las recuerda por ti.
[friendly] Tú solo recuerdas una. La llave de la caja fuerte.
[serious] Lo tercero es la verificación en dos pasos.
[confident] Además de la contraseña te pide un código del móvil. O una confirmación en una aplicación.
[emphatic] Así aunque roben tu contraseña les sigue faltando la segunda llave.
[curious] Y lo más nuevo son las llaves de acceso. En inglés, passkeys.
[confident] Con ellas no hay contraseña que robar. Tu móvil guarda una llave secreta que nunca sale de él.
[serious] Entras con tu dedo o tu cara. Y esa llave no funciona en una web falsa.
[friendly] Si una web te ofrece llaves de acceso, actívalas.

[serious] Y por último. ¿Cómo sabes si ya te han filtrado?
[curious] Existe un servicio gratuito y muy conocido que se llama Have I Been Pwned.
[confident] Escribes tu correo y te dice en qué filtraciones conocidas ha aparecido.
[tense] Si sale alguna, cambia esa contraseña. Y en cualquier web donde la repitieras.

[serious] Así que volvamos al principio. A Sara2024.
[curious] La web no conocía esa contraseña. Solo guardaba su huella.
[confident] Pero alguien robó las huellas. Y una tarjeta gráfica empezó a probar las más comunes.
[tense] Un nombre con mayúscula. Un año al final. Y la huella coincidió en segundos.
[emphatic] Nadie la adivinó. La probaron. Y estaba entre las primeras de la lista.
[friendly] Con una frase larga y única esa lista ya no sirve contra ti. Y con la verificación en dos pasos ni acertar les basta.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
