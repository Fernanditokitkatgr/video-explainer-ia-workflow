# Así funciona el reconocimiento facial de tu móvil — guion v1 (ElevenLabs v3)

**Tema**: cómo funciona de verdad el desbloqueo facial de un móvil moderno: no es una foto, es un
mapa en tres dimensiones construido con un proyector de puntos infrarrojos y una cámara infrarroja
que lee cómo se deforma esa red de puntos sobre el relieve de la cara; por qué eso es distinto del
viejo "desbloqueo facial" con cámara frontal normal, que una foto impresa o un vídeo en pantalla
podían engañar; dónde se guarda el mapa (cifrado, dentro de un chip de seguridad del propio móvil,
nunca subido como foto a un servidor); detección de vida (parpadeo, micro-movimientos de cabeza)
para pillar una máscara estática; límites honestos (gemelos idénticos, máscaras 3D muy detalladas
en pruebas controladas); por qué la huella sigue existiendo como alternativa (mascarilla, mala luz,
tumbado); otros usos (puertas de control de pasaporte en aeropuertos, apps de banco, accesos de
oficina); y la distinción entre desbloquear tu propio móvil (decides tú) y la vigilancia facial
masiva en espacios públicos (no decides tú).
**Canal**: tecno
**Formato**: explicativo evergreen buscable ("cómo funciona el reconocimiento facial", "face id
cómo funciona", "es seguro el desbloqueo facial")
**Duración estimada**: 6-7 min
**Prueba de demanda**: backlog tema #10, familia "Así funciona X" (el vídeo más visto del canal,
1.009 vistas, es de ese mismo patrón). Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: desmontar el mito de "le hace una foto y la compara" explicando que es un
mapa de profundidad, no una imagen — y separar con honestidad el desbloqueo voluntario de tu móvil
de la vigilancia facial masiva, dos problemas distintos que se suelen mezclar.
**Hilo conductor**: el momento del gancho (miras el móvil y se abre solo) se resuelve en el cierre
con la misma imagen, ya explicada paso a paso. Frase recurrente "Tu cara no es una foto. Es un
mapa." aparece en la apertura y se repite, ampliada, en el cierre.
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).
Las negaciones clave van siempre con un verbo al lado (no tiene, no es, nunca sale, no dio, no
funciona) o con palabras fuertes (ningún, nadie, jamás), nunca con un "sin" o un "no" sueltos de
los que dependa el hecho importante.

---

[curious] Miras tu móvil. Y la pantalla se abre sola.
[confident] Ni siquiera tocas un botón.
[serious] En menos de medio segundo el teléfono te ha mirado.
[serious] Y ha decidido que eres tú.
[curious] Mucha gente cree que la cámara simplemente te hace una foto.
[curious] Y la compara con otra que ya tenía guardada.
[tense] Eso sería fácil de engañar.
[tense] Bastaría con una foto impresa en papel. O con la pantalla de otro móvil.
[confident] Lo que de verdad pasa ahí dentro es muy distinto.
[emphatic] Tu cara no es una foto. Es un mapa.
[serious] Hoy vas a entender cómo se construye ese mapa.
[serious] Qué pasa con tus datos después.
[serious] Y hasta dónde llegan de verdad sus límites.
[confident] Empecemos por el principio.

[serious] Antes de la cara, la manera más normal de bloquear un móvil era un código. Cuatro o seis números que tecleabas a mano cada vez.
[confident] Funciona bien. Pero es lento. Y lo repites decenas de veces al día.
[curious] La promesa del desbloqueo facial era quitarte ese paso de en medio. Y mantener la misma seguridad, o más.

[serious] Antes muchos móviles ya traían un "desbloqueo facial".
[serious] Pero usaba solo la cámara frontal normal. La misma que usas para hacerte un selfi.
[confident] Esa cámara capta una imagen plana. Dos dimensiones. Alto y ancho.
[curious] Y a una imagen plana le basta con otra imagen plana para confundirla.
[tense] Una foto impresa engañaba a muchos de esos sistemas antiguos.
[tense] Incluso un vídeo de tu cara reproducido en una pantalla colaba en algunos casos.
[serious] Por eso los fabricantes buscaron otra manera de leer tu cara.
[serious] Una que no dependiera de una sola imagen plana.
[emphatic] Ahí entra el mapa en tres dimensiones.

[curious] Para construir ese mapa el móvil usa dos piezas que no ves a simple vista.
[confident] La primera es un proyector infrarrojo.
[confident] Un emisor diminuto, escondido cerca del altavoz de llamadas.
[serious] Ese proyector lanza sobre tu cara decenas de miles de puntos de luz infrarroja.
[serious] Invisibles para tus ojos. Por eso funcionan igual con la luz apagada.
[curious] Ese patrón de puntos tiene un nombre técnico. Luz estructurada.
[tense] Los puntos caen sobre tu frente. Tu nariz. Tus cuencas de los ojos. Tus pómulos.
[confident] Cada relieve de tu cara desvía esos puntos de una forma distinta.
[serious] La segunda pieza es una cámara infrarroja especial.
[serious] Esa cámara mira cómo se deforma la red de puntos sobre el relieve de tu cara.
[tense] Un hueco profundo, como la cuenca del ojo, separa los puntos de una manera.
[tense] Un relieve alto, como la punta de la nariz, los junta de otra.
[emphatic] Con esa deformación el móvil calcula la distancia exacta de cada zona de tu cara.
[confident] Y construye un mapa en tres dimensiones.
[confident] No es una fotografía. Es una forma.

[curious] Esa misma cámara de profundidad no sirve solo para desbloquear el móvil.
[serious] Muchos teléfonos la aprovechan también en las fotos de retrato. Para calcular qué queda cerca y qué queda lejos y desenfocar el fondo.

[tense] Y aquí está la diferencia que de verdad importa.
[confident] Una foto impresa es completamente plana. No tiene relieve que deformar.
[serious] Cuando el proyector lanza sus puntos sobre un papel esos puntos caen todos a la misma distancia.
[serious] Lo mismo pasa con la pantalla de otro móvil.
[tense] El mapa que sale es plano.
[tense] Y un mapa plano queda descartado al instante.
[emphatic] Por eso este sistema distingue tu cara real de cualquier imagen de tu cara.
[emphatic] Sea una foto en papel o un vídeo en una pantalla.

[serious] Ahora el otro lado de la historia. Qué pasa con ese mapa una vez calculado.
[confident] En muchos móviles modernos ese mapa se guarda cifrado.
[confident] Encerrado dentro de un chip de seguridad aparte, separado del resto del procesador.
[tense] Ese chip está pensado solo para guardar datos sensibles. Tu huella, tu mapa facial, tus claves.
[confident] El mapa se queda dentro de ese chip.
[confident] Nunca sale hacia un servidor de ninguna empresa como si fuera una foto tuya.
[serious] Cada vez que miras el móvil, el chip compara el mapa nuevo contra el guardado.
[serious] Y devuelve un único resultado. Acierta o falla.
[emphatic] Es una arquitectura pensada para que ni el propio fabricante llegue a ver tu cara convertida en imagen.

[curious] Pero un mapa en tres dimensiones tampoco basta por sí solo.
[curious] Hace falta una comprobación más.
[confident] Se llama detección de vida.
[serious] El sistema busca señales que solo da una persona despierta frente al móvil.
[serious] Un parpadeo. Un giro mínimo de la cabeza. Un gesto diminuto e involuntario.
[tense] Una máscara o un molde en tres dimensiones puede copiar la forma exacta de tu cara.
[tense] Pero se queda quieta. Congelada.
[serious] Una grabación tuya parpadeando en una pantalla tampoco cuela. Esa pantalla sigue siendo plana de todas formas.
[emphatic] Esa quietud delata al impostor.
[emphatic] Un objeto estático falla la prueba aunque su forma sea idéntica a la tuya.

[serious] Ahora toca la parte honesta. Porque ningún sistema biométrico es perfecto.
[tense] Los gemelos idénticos comparten una estructura facial tan parecida.
[tense] En algunos casos logran desbloquear el móvil del otro.
[serious] Y en pruebas controladas de laboratorio ha pasado algo parecido con máscaras.
[serious] Máscaras en tres dimensiones muy detalladas y caras de fabricar han conseguido engañar a algunos sistemas de reconocimiento facial.
[tense] Son casos puntuales. Con medios que una persona cualquiera raramente tiene en casa.
[confident] Cada nueva generación de sensores y de software corrige parte de esos fallos.
[confident] Pero el riesgo cero no existe en ninguna tecnología biométrica.
[serious] Y hay otro límite más aburrido, pero real. Dejarte barba, cambiar de peinado de forma radical o simplemente envejecer unos años a veces obliga a registrar la cara de nuevo.
[emphatic] Por eso casi ningún fabricante deja la cara como única llave.

[curious] Por eso tu móvil casi siempre conserva también el sensor de huella.
[serious] Hay momentos en los que la cara falla.
[serious] Llevas una mascarilla puesta.
[serious] La luz del sitio es muy mala o muy intensa.
[serious] Estás tumbado y el ángulo de la cámara te confunde con otra cosa.
[confident] En esos casos la huella resuelve en un segundo lo que la cara no logra.
[emphatic] Dos llaves biométricas distintas. Cada una cubriendo los huecos de la otra.

[serious] Esta misma tecnología de mapa facial no vive solo dentro de tu móvil.
[confident] Aeropuertos de varios países la usan en las puertas automáticas de control de pasaporte.
[confident] Para comparar tu cara con la foto guardada en el chip de tu propio documento.
[curious] Cada vez más aplicaciones de banca o de pago la piden también como paso extra.
[curious] Para confirmar que eres tú quien entra en la cuenta.
[serious] Algunas oficinas y edificios la usan incluso para abrir la puerta de entrada, en lugar de una tarjeta.
[confident] En todos esos casos se repite el mismo patrón.
[confident] Tu propio mapa facial, guardado para confirmarte solo a ti.

[tense] Y aquí conviene separar dos problemas que se parecen mucho. Pero no son el mismo.
[serious] Cuando desbloqueas tu móvil, tú eliges participar.
[serious] Tu mapa facial se queda guardado en tu propio chip, para confirmarte solo a ti.
[confident] Muy distinto es que una cámara en una plaza o en una calle escanee a cientos de personas que simplemente pasan por ahí.
[confident] Gente que jamás dio su consentimiento.
[tense] Ese segundo escenario es el que de verdad preocupa a expertos y reguladores en varios países.
[tense] Vigilancia masiva sobre gente que no dio permiso para nada.
[serious] En la Unión Europea, por ejemplo, los datos de tu cara se consideran datos especialmente sensibles. Y tienen una protección legal reforzada frente a otros datos personales.
[serious] Por eso algunas ciudades han llegado a prohibir el uso de cámaras de reconocimiento facial por parte de sus propias administraciones en espacios públicos.
[emphatic] Desbloquear tu propio móvil y vigilar una plaza entera parecen la misma tecnología.
[emphatic] Pero son dos decisiones completamente distintas sobre quién decide y quién vigila.

[serious] Así que volvamos a ese momento en el que miras el móvil y la pantalla se abre sola.
[confident] Ahora ya sabes lo que de verdad ocurre en ese medio segundo.
[confident] Decenas de miles de puntos de luz invisible. Una cámara leyendo el relieve de tu cara.
[serious] Un mapa en tres dimensiones comparado dentro de un chip que nadie más llega a abrir.
[emphatic] Tu cara no es una foto. Es un mapa.
[emphatic] Y ahora sabes cómo se construye, dónde se guarda y hasta dónde llegan sus límites.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
