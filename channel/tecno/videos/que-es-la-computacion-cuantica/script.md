# Qué es la computación cuántica (sin humo) — guion v1 (ElevenLabs v3)

**Tema**: qué es de verdad un ordenador cuántico, desmontando el humo: bits frente a qubits;
superposición explicada con honestidad (amplitudes, la medida da un único resultado) frente al
mito de "prueba todas las respuestas a la vez"; el truco real es la interferencia que refuerza la
respuesta buena y anula las malas; entrelazamiento como correlación que es incapaz de mandar
mensajes más rápido que la luz; decoherencia y por qué hace falta un frío mayor que el del espacio
(refrigeradores de dilución, cerca del cero absoluto); corrección de errores y qubits lógicos
frente a físicos; para qué sirve (simular moléculas y materiales, algo de optimización, el
algoritmo de Shor y RSA, criptografía post-cuántica); para qué es malo (portátil, juegos); la
"supremacía cuántica" de Google en 2019 y su polémica; máquinas actuales de decenas a alrededor de
mil qubits físicos; conclusión honesta: la máquina útil y grande aún está a años.
**Canal**: tecno
**Formato**: explicativo evergreen buscable ("qué es la computación cuántica", "qué es un qubit")
**Duración estimada**: 6-7 min
**Prueba de demanda**: el vídeo más visto de QuantumFracture (>6 M) es de mecánica cuántica. Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: "sin humo" — casi todo el mundo lo explica con el mito del laberinto
(prueba todos los caminos a la vez); aquí se desmonta y se explica el truco real (ondas que se
suman y se anulan), más lo que la máquina hace mal.
**Hilo conductor**: el laberinto del gancho (el mito) resuelto en el cierre con las ondas del
estanque, y la frase recurrente "Quitemos el humo." en cada punto donde aparece un mito
(superposición, entrelazamiento, número de qubits, supremacía, cierre). Doble promesa del gancho
(podría romper el candado de tus compras / tu portátil y tus juegos siguen igual) resuelta en los
bloques de RSA y de "para qué es malo" y repetida al cierre.
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).
Las negaciones clave van con verbo o con palabras largas (incapaz, imposible, nadie, falso) para
que la voz sintética no se las trague.

---

[curious] Seguro que alguna vez te lo han contado así. Un ordenador cuántico prueba todas las respuestas a la vez.
[emphatic] Un laberinto con un millón de caminos. Y la máquina los recorre todos en el mismo instante.
[serious] Suena increíble. Y es justo la explicación que más confunde.
[confident] Porque un ordenador cuántico funciona de una manera muy distinta.
[tense] Aun así esta máquina podría romper un día el candado que protege tus compras por internet.
[curious] Y al mismo tiempo tu portátil y tus juegos van a seguir exactamente igual.
[serious] Hoy vas a entender qué es de verdad la computación cuántica. Para qué sirve. Y qué parte es puro humo.
[emphatic] Quitemos el humo.

[serious] Empecemos por lo que ya conoces. Tu móvil. Tu portátil. Tu consola.
[confident] Por dentro todos hablan el mismo idioma. Ceros y unos.
[curious] Cada cero o cada uno se llama bit. Es como un interruptor que puede estar apagado o encendido.
[confident] Tu procesador tiene miles de millones de esos interruptores diminutos. Se llaman transistores.
[curious] Un ordenador cuántico cambia justo esa pieza. El interruptor.
[confident] En lugar de bits usa qubits. Bits cuánticos.

[serious] Y aquí es donde suele aparecer el humo.
[curious] Te dirán que un qubit es cero y uno a la vez.
[tense] Y de ahí saltan al laberinto. Si es todo a la vez entonces lo prueba todo a la vez.
[emphatic] Quitemos el humo.
[serious] Un qubit puede estar en una mezcla de cero y de uno. Eso se llama superposición.
[confident] Pero esa mezcla tiene sus proporciones. Un poco más de cero. O un poco más de uno.
[curious] Los físicos llaman amplitudes a esas proporciones. Piensa en ellas como el peso de cada opción.
[serious] Cuando miras el qubit la mezcla desaparece.
[tense] Medir un qubit siempre da un único resultado. O un cero. O un uno.
[confident] Cuál sale depende de esas amplitudes. Cuanto más peso tiene una opción más fácil es que salga.
[curious] Imagina una máquina que de verdad calculara todas las respuestas del laberinto a la vez.
[serious] Al mirarla te daría una sola respuesta al azar. Eso te serviría de muy poco.
[curious] Entonces ¿cuál es el truco de verdad?

[confident] El truco se llama interferencia.
[serious] Piensa en un estanque. Tiras dos piedras y cada una hace sus ondas.
[curious] Donde se juntan dos crestas el agua sube más. Las ondas se suman.
[serious] Y donde una cresta coincide con un valle el agua se queda plana. Las ondas se anulan.
[confident] Las amplitudes de los qubits hacen algo parecido. Se pueden sumar. Y se pueden anular.
[emphatic] Un algoritmo cuántico es una receta para organizar esas ondas.
[serious] Está diseñado para que los caminos que llevan a respuestas equivocadas se anulen entre sí.
[confident] Y para que los caminos hacia la respuesta correcta se sumen y se hagan más fuertes.
[curious] Así cuando por fin mides es muy probable que salga la buena.
[tense] Pero esa receta solo existe para algunos problemas muy concretos.
[emphatic] Por eso lo del laberinto es humo. La máquina juega con ondas para que gane la respuesta buena.

[curious] Hay otra palabra que siempre aparece. Entrelazamiento.
[serious] Dos qubits entrelazados quedan conectados. Hay que describirlos juntos.
[confident] Al medir uno ya sabes algo sobre el resultado del otro. Aunque estén muy separados.
[emphatic] Quitemos el humo.
[tense] El entrelazamiento es incapaz de enviar mensajes más rápido que la luz.
[serious] El resultado que te sale al medir es al azar. Nadie puede elegirlo.
[confident] Así que es imposible usarlo para mandar información a distancia.
[curious] ¿Para qué sirve entonces? Para que muchos qubits trabajen como una sola pieza.

[serious] Ahora viene el problema gordo.
[tense] Los qubits son increíblemente frágiles.
[curious] Esa mezcla de cero y de uno solo aguanta mientras nada la toca.
[serious] Un poco de calor. Una vibración. Una onda de radio que pasa cerca.
[tense] En cuanto el entorno se entera del estado del qubit la mezcla se estropea.
[confident] Eso se llama decoherencia. Y es el gran enemigo de la computación cuántica.
[curious] ¿Y cómo se protege algo tan delicado? Con frío. Muchísimo frío.
[confident] Muchos ordenadores cuánticos viven dentro de unos aparatos llamados refrigeradores de dilución.
[serious] Esa especie de lámpara dorada colgando del techo que sale en las fotos es justo su interior.
[confident] El cero absoluto está a unos doscientos setenta y tres grados bajo cero. Es la temperatura más baja posible.
[tense] Dentro de estos aparatos el chip se queda a apenas unas centésimas de grado de ese límite.
[emphatic] Eso es más frío que el espacio exterior.

[serious] Aun así los qubits se equivocan. Y muchísimo más que los transistores de tu móvil.
[confident] La solución se llama corrección de errores.
[curious] La idea es sencilla. En lugar de fiarte de un solo qubit repartes la información entre muchos.
[serious] Si uno se estropea los demás permiten detectarlo y arreglarlo.
[confident] A ese grupo que trabaja como uno solo se le llama qubit lógico. Y a cada pieza qubit físico.
[tense] El problema es la proporción.
[serious] Para un solo qubit lógico fiable pueden hacer falta cientos o incluso miles de qubits físicos.
[serious] Hoy las máquinas tienen desde decenas hasta alrededor de mil qubits físicos.
[curious] Suena a mucho. Pero en qubits lógicos fiables eso da para muy poquito.
[emphatic] Quitemos el humo. Cuando leas que una máquina tiene tantos qubits pregúntate siempre de qué tipo son.

[serious] Vamos con el titular más famoso. Año 2019.
[confident] Google anunció que su chip Sycamore había logrado la supremacía cuántica.
[serious] Según Google su chip tardó unos doscientos segundos.
[tense] Y calcularon que el mejor superordenador tardaría unos diez mil años.
[tense] Pero la tarea era un problema muy concreto diseñado casi a medida para esa máquina.
[curious] Básicamente sacar números al azar con un patrón especial. Algo que nadie necesitaba para nada práctico.
[serious] Y lo de los diez mil años se discutió mucho.
[confident] IBM respondió enseguida que con un método mejor bastarían unos pocos días.
[emphatic] Quitemos el humo. Fue un hito real. Pero la carrera que ganó era muy rara.

[curious] Entonces ¿para qué sirve de verdad?
[confident] Lo más prometedor es simular la naturaleza.
[serious] Las moléculas y los materiales siguen las reglas de la física cuántica. Y un ordenador normal sufre muchísimo para imitarlas.
[confident] Eso podría ayudar a diseñar medicamentos. Baterías mejores. O materiales nuevos.
[serious] También se investiga para algunos problemas de optimización. Como organizar rutas o repartir recursos.
[tense] Aunque ahí la ventaja todavía está por demostrar.
[emphatic] Y luego está el uso que más miedo da. Romper candados.

[serious] Cuando compras por internet tus datos viajan protegidos por un cifrado. Uno de los más usados se llama RSA.
[confident] RSA se basa en algo muy difícil.
[serious] Descomponer un número enorme en los dos números primos que lo forman.
[curious] Multiplicar dos primos es fácil. Hacer el camino de vuelta con números gigantes llevaría una eternidad.
[tense] En 1994 un matemático llamado Peter Shor encontró un algoritmo cuántico que hace ese camino de vuelta muchísimo más rápido.
[serious] En teoría un ordenador cuántico grande y fiable podría romper RSA.
[confident] Tranquilo. Hoy ninguna máquina se acerca. Harían falta muchísimos qubits lógicos. Y eso es una montaña de qubits físicos.
[curious] Entonces ¿por qué los gobiernos ya están preocupados?
[serious] Porque alguien podría guardar hoy mensajes cifrados. Y esperar para descifrarlos dentro de unos años.
[confident] Por eso ya existe la criptografía post-cuántica. Candados nuevos pensados para aguantar también a estas máquinas.
[serious] En 2024 Estados Unidos publicó los primeros estándares oficiales de estos candados nuevos.
[emphatic] Así que el candado de tus compras se está cambiando antes de que exista el ladrón.

[serious] Ahora la otra cara. Para qué es una herramienta malísima.
[confident] Escribir un documento. Ver una serie. Navegar por internet. Para eso un ordenador normal es muchísimo mejor.
[curious] ¿Y los videojuegos? Igual de mal. Un juego necesita millones de operaciones sencillas y rapidísimas. Y en eso tu tarjeta gráfica es imbatible.
[emphatic] Nadie va a tener uno en el escritorio. Tu portátil va a seguir siendo tu portátil.

[serious] Entonces ¿cuándo llegará la máquina de verdad útil?
[confident] La respuesta honesta es que nadie lo sabe con exactitud.
[curious] El avance es real. Cada año hay qubits mejores. Y la corrección de errores empieza a funcionar en los laboratorios.
[tense] Pero una máquina grande que resuelva problemas útiles todavía está a años de distancia.
[serious] Si alguien te promete que lo va a cambiar todo el año que viene ya sabes lo que es.
[emphatic] Humo.

[serious] Así que volvamos al laberinto del principio.
[curious] Recorrer todos los caminos a la vez es el mito.
[confident] Lo que hace de verdad es jugar con ondas. Las respuestas malas se anulan. Y la buena se hace más fuerte.
[confident] Algún día podría romper el candado de tus compras por internet. Por eso ya se están cambiando esos candados.
[emphatic] Y tu portátil y tus juegos van a seguir exactamente igual.
[friendly] Ya sabes qué es la computación cuántica. Y ahora también sabes separarla del humo.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
