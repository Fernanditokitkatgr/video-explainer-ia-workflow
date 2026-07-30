# Hackear la IA: la profesión que no existía hace tres años y ya paga más que el pentesting — guion de voz (ElevenLabs v3)

**Tema**: Ha nacido un tipo nuevo de hacker: el AI red teamer. Qué significa atacar un modelo de IA (prompt injection, jailbreaks, envenenamiento de datos, extracción del prompt de sistema, ataques indirectos), por qué no se parchea como un bug normal, casos reales, programas de bug bounty de IA y cuánto se gana.
**Canal**: tecno
**Estado**: Borrador v1
**Duración estimada**: 6,5-7 min

---

[ominous] Existe un hacker que no escribe una sola línea de código para entrar.
[tense] Solo escribe una frase.
Y esa frase vale hasta treinta mil dólares.
[curious] Hace tres años esta profesión no existía. Ni el nombre existía.
[confident] Hoy paga más que el pentesting clásico, y casi nadie la sabe hacer.
Al final del vídeo vas a saber exactamente cuánto se cobra y por qué está tan vacío este hueco.

[serious] Capítulo uno: qué significa hackear una inteligencia artificial.
[curious] Hackear software normal es buscar un error del programador.
Encuentras el fallo, avisas, alguien cambia el código, y se acabó.
[emphatic] Hackear un modelo de lenguaje es otra cosa completamente distinta.
Aquí no hay una línea de código con el fallo dentro.
[tense] El fallo está en el comportamiento del modelo.
En lo que decide hacer cuando le dices algo que nadie previó.
Un modelo no ejecuta instrucciones. Un modelo interpreta lenguaje.
[emphatic] Y todo lo que interpreta lenguaje se puede convencer.
[ominous] Y eso rompe casi todo el manual de seguridad que teníamos escrito.

[serious] Capítulo dos: las armas del nuevo hacker.
[confident] Arma número uno: la inyección de instrucciones. Prompt injection.
Le cuelas al modelo una orden disfrazada de dato normal.
[curious] El modelo no distingue entre la orden de su dueño y el texto que está leyendo.
[emphatic] Simon Willison le puso nombre a esto en septiembre de 2022. Sigue sin estar resuelto.
[serious] Arma número dos: el jailbreak.
Convencer al modelo de que salte sus propias normas de seguridad.
[curious] En 2023 el truco famoso se llamaba DAN, de "Do Anything Now".
[tense] Hubo otra versión aún más absurda: pedirle que hiciera de abuela contando un cuento.
[emphatic] Suena a chiste. Fue un problema de seguridad real en el producto más usado del mundo.
[serious] Arma número tres: extraer el prompt de sistema.
Todo asistente de IA lleva instrucciones ocultas escritas por la empresa.
[tense] En febrero de 2023, un estudiante de Stanford llamado Kevin Liu se las sacó al chat de Bing.
Y dentro había un nombre en clave que Microsoft nunca había hecho público: Sydney.
[serious] Arma número cuatro, y la más peligrosa de todas: la inyección indirecta.
[ominous] Aquí ya no hace falta que la víctima escriba nada.
[emphatic] Y el asistente obedece a tu texto, no a su dueño.
[serious] Junio de 2025. Investigadores de Aim Security publican EchoLeak.
Un fallo en Microsoft 365 Copilot que permitía sacar datos internos sin que el usuario hiciera un solo clic.
[ominous] Cero clics. Solo un correo que el asistente había leído por su cuenta.
[serious] Arma número cinco: envenenar los datos de entrenamiento.
[curious] Un modelo aprende de textos e imágenes descargados de internet.
Si controlas una parte diminuta de esos datos, puedes plantar una puerta trasera.
[tense] Nicholas Carlini y su equipo demostraron en 2023 que era práctico y barato.
[emphatic] Por unos sesenta dólares podían cambiar lo que iba a aprender el modelo.
[serious] Y en octubre de 2025, Anthropic publicó algo todavía más incómodo.
[tense] Con unos doscientos cincuenta documentos envenenados basta para meter una puerta trasera.
[ominous] No necesitas envenenar el uno por ciento. Necesitas doscientos cincuenta archivos.

[serious] Capítulo tres: por qué esto no se parchea.
Cuando arreglas un bug clásico, el bug desaparece. Punto final.
[tense] Cuando arreglas un jailbreak, no desaparece nada.
[emphatic] Pero hay infinitas formas de pedir lo mismo.
[confident] En julio de 2023, un equipo de Carnegie Mellon lo dejó por escrito.
[tense] Y lo peor: la misma cadena funcionaba en varios modelos distintos a la vez.
[emphatic] Eso significa que el ataque no era un fallo de una empresa. Era una propiedad de la tecnología.
[ominous] Y una defensa que funciona el noventa y nueve por ciento de las veces, a escala de millones de mensajes, falla miles de veces al día.
[confident] Por eso hizo falta gente nueva. Gente que piensa en lenguaje, no en memoria.

[serious] Capítulo cuatro: y esto te afecta a ti.
[curious] Vale, muy bonito, pero tú no entrenas modelos. ¿Por qué te importa?
[tense] Porque tú ya le has dado permisos a una IA sin darte cuenta.
[emphatic] Cada vez que un asistente puede leer y además actuar, tienes esta superficie de ataque en casa.
[serious] Diciembre de 2023. Un concesionario de Chevrolet en Estados Unidos pone un chatbot en su web.
[curious] Un usuario le convence, con un par de frases, de aceptar venderle un coche por un dólar.
[tense] Febrero de 2024. Air Canada pierde ante un tribunal en Canadá.
[emphatic] El tribunal decidió que la aerolínea era responsable de lo que había dicho su bot.
[ominous] Traducción: lo que tu IA promete, lo pagas tú.
[confident] OWASP, la referencia mundial en seguridad de aplicaciones, publicó en 2023 su top diez de riesgos para aplicaciones con modelos de lenguaje.
[emphatic] El número uno de la lista es la inyección de instrucciones. El primero. Por encima de todo lo demás.

[serious] Capítulo cinco: cuánto se gana con esto.
[confident] Un pentester junior en España empieza cerca de los treinta mil euros al año.
Un red teamer clásico con experiencia se mueve por encima de los setenta mil.
[emphatic] Un especialista en seguridad de modelos de IA juega en otra liga.
[excited] Las ofertas de AI red teamer en Estados Unidos se publican entre ciento ochenta mil y trescientos mil dólares.
[tense] Y no porque el trabajo sea más difícil. Porque hay muy poquísima gente que sepa hacerlo.
[serious] Además está la vía del bug bounty, y ahí ya no hay nómina, hay recompensas.
[confident] OpenAI abrió su programa en abril de 2023, a través de Bugcrowd.
Anthropic paga hasta quince mil dólares por un jailbreak universal en sus sistemas más protegidos.
[excited] Y Google lanzó en octubre de 2025 un programa dedicado solo a IA, con premios de hasta treinta mil dólares por hallazgo.
[emphatic] Fíjate en el detalle que importa: aquí el hallazgo no es un exploit de veinte kilobytes.
[tense] Muchas veces es un párrafo bien escrito.
[confident] En HackerOne, la mayor plataforma de bug bounty del mundo, los informes relacionados con IA se dispararon más de un ciento setenta por ciento en un año.
[serious] Y en agosto de 2023, en la DEF CON de Las Vegas, hubo un red team público de modelos generativos.
[excited] Más de dos mil personas atacando modelos a la vez, con apoyo de la Casa Blanca.
[emphatic] Cuando un gobierno organiza el ataque, es que el ataque ya es una profesión.

[serious] Capítulo seis: la ventana.
[curious] Y aquí llega la parte que te prometí al principio.
[confident] Este hueco está vacío. Y está vacío por un motivo muy concreto.
[serious] Para hacer esto bien necesitas dos cosas que casi nunca van juntas en la misma persona.
[tense] La gente de seguridad clásica sabe lo primero, pero no lo segundo.
La gente de machine learning sabe lo segundo, pero nunca ha pensado como un atacante.
[emphatic] Quien junta las dos cosas hoy no tiene competencia. Literalmente no la tiene.
[confident] Y la puerta de entrada es gratis y legal.
Hay laboratorios abiertos hechos para esto: Gandalf, de Lakera, y el clásico Prompt Airlines.
[curious] Añade la lista de OWASP para modelos de lenguaje y ya tienes el temario ordenado, gratis y en abierto.
[serious] Ahora, la parte honesta, porque no te voy a vender humo.
[tense] Los sueldos de trescientos mil dólares son de Estados Unidos y de las empresas punteras, no la media global.
[emphatic] Y esta ventana no va a estar abierta para siempre. Ninguna lo está.
[serious] Y algo importante: todo esto se hace con permiso, en laboratorios o en programas oficiales.
[tense] Atacar un modelo en producción sin autorización es un delito, exactamente igual que atacar cualquier otro sistema.
[curious] Lo que hace que esto se pague no es el ataque. Es el informe que llega antes de que lo haga alguien con malas intenciones.
[confident] Así que volvamos a la frase del principio.
[emphatic] Sí, hay un hacker que entra escribiendo solo una frase.
Y esa frase se cotiza a treinta mil dólares porque el fallo no está en el código, está en el comportamiento.
[ominous] No hay parche que lo cierre. Solo hay gente que lo busca.
[confident] Y ahora mismo, esa gente cabe en un ascensor.
[friendly] Si esto te ha volado la cabeza, suscríbete. Se viene más de este mundo.

---

## Notas de producción

- Longitud objetivo cumplida: ~8.000 caracteres de narración (6-7 min a playback 1.1).
- Una sola voz narradora, sin diálogo con atribución. Los casos (Chevrolet, Air Canada, Bing/Sydney) se cuentan en tercera persona narrada, nunca como intercambio de réplicas.
- Hook ("una frase que vale treinta mil dólares") resuelto literalmente en el capítulo seis, con eco del lenguaje de apertura.
- Pivote "esto te afecta a ti" en el capítulo cuatro (permisos que ya le has dado a un asistente).
- Nuance/credibilidad al cierre: los sueldos altos son de EEUU y empresas punteras, no la media; se avisa de que atacar sin permiso es delito; laboratorios legales citados como vía de entrada.
- CTA final genérico, sin nombrar ningún vídeo concreto.
- Datos a verificar en pantalla con rótulo en ESPAÑOL: 2022 (prompt injection), feb 2023 (Sydney), jul 2023 (Carnegie Mellon), ago 2023 (DEF CON), dic 2023 (Chevrolet), feb 2024 (Air Canada), jun 2025 (EchoLeak), oct 2025 (Anthropic 250 documentos / Google AI VRP).
- Sugerencia visual: reusar los personajes hacker bueno/malo de `channel/tecno/style.json` respetando las TRES señales (color, capucha, placa) en las escenas donde salgan los dos.
- SFX candidatos: teclazo seco en cada "arma número N", whoosh de transición en cada cabecera de capítulo, campanita/caja registradora en las cifras de dinero, tono grave en los bloques [ominous].
