# Qué son los Agentes de IA en realidad — guion de voz v1 (ElevenLabs v3)

**Tema**: qué diferencia de verdad a un agente de IA de un chatbot (bucle objetivo-herramienta-
observación), un ejemplo real, por qué falla más de lo que la gente cree, sueldos España 2026 y
ruta de entrada.
**Canal**: tecno
**Formato**: 3 · rol/empleo explicado (serie "qué hace en realidad")
**Duración estimada**: 6 min
**Hilo conductor**: "un chatbot contesta, un agente actúa" — se repite en cada transición.

---

[curious] Si le preguntas a la mayoría de la gente qué es un agente de inteligencia artificial, te van a decir que es un chatbot más listo.
[confident] Es mentira. O más bien, es la mitad de la mentira que peor entiende el sector ahora mismo.
[emphatic] Un chatbot contesta. Un agente actúa.
[curious] Hoy te cuento qué hace de verdad un agente de IA, por qué falla mucho más de lo que la gente cree, cuánto se cobra por construirlos, y cómo se empieza.

[serious] Vamos con la diferencia real, porque aquí está todo el tema.
[curious] Un chatbot recibe una pregunta y te devuelve una respuesta. Ida y vuelta. Fin.
[confident] Si le pides que reserve un vuelo, en el mejor de los casos te va a decir cómo hacerlo tú mismo.
[tense] Un agente no. A un agente le das un objetivo, no una pregunta.
[serious] "Reserva un vuelo a Madrid para el jueves por menos de doscientos euros."
[emphatic] Y a partir de ahí, el agente hace algo que un chatbot no puede hacer ni de lejos.

[serious] Entra en un bucle.
[curious] Primero, descompone el objetivo en pasos, buscar vuelos, comparar precios, elegir el mejor, reservarlo.
[confident] Segundo, decide qué herramienta necesita para cada paso, una API de una aerolínea, un buscador, un formulario de pago.
[tense] Tercero, ejecuta esa herramienta de verdad. No te explica cómo hacerlo, lo hace.
[serious] Cuarto, mira el resultado.
[emphatic] Y aquí está la parte que de verdad importa, si el resultado no vale, el agente no se rinde, vuelve atrás y lo replantea.
[curious] Precio muy alto, prueba otra fecha. Vuelo lleno, prueba otra aerolínea.
[confident] Repite ese bucle las veces que haga falta hasta que el objetivo se cumple o hasta que se da cuenta de que no puede.

[serious] Un chatbot con esteroides no hace eso.
[tense] Un chatbot con esteroides sigue sin memoria entre pasos, sin decidir por su cuenta, y sin tocar nada fuera de la conversación.
[emphatic] Llamar a una herramienta una vez, por sí solo, tampoco convierte a un modelo en un agente.
[confident] Lo que lo convierte en agente es que decida solo qué herramienta usar, cuándo usarla, y qué hacer si falla.
[curious] Esa es la frase que te tienes que quedar. Un chatbot contesta. Un agente actúa.

[serious] Vamos con un ejemplo real y muy típico en empresas ahora mismo.
[curious] Una empresa de ecommerce quiere que alguien revise cada devolución, decida si se acepta, y genere el reembolso.
[confident] Antes, eso lo hacía una persona, abriendo el correo, mirando el pedido, consultando la política de la empresa, y tramitando el reembolso a mano.
[tense] Ahora se lo dan como objetivo a un agente.
[serious] El agente lee el correo de devolución, consulta el sistema de pedidos para verificar que existe, compara el motivo con la política interna de la empresa, y si encaja, ejecuta el reembolso él solo.
[emphatic] Y si algo no encaja, si el pedido no existe o el motivo es raro, no inventa una respuesta.
[confident] Se para y lo escala a una persona.

[serious] Y aquí viene la parte que casi nadie cuenta, y que es la más importante de todo este vídeo.
[tense] Los agentes fallan. Mucho más de lo que el marketing del sector quiere que creas.
[curious] No porque el modelo sea tonto, sino porque cada paso del bucle es una oportunidad de que algo se tuerza.
[serious] Si el agente interpreta mal un correo, ese error se arrastra al siguiente paso, y al siguiente, y al siguiente.
[emphatic] Un fallo pequeño al principio de la cadena se convierte en un desastre grande al final.
[tense] Hay un patrón de fallo que se repite tanto que ya tiene nombre entre quienes construyen esto, la alucinación de herramienta.
[curious] El agente decide usar una herramienta que no existe, o la llama con datos que se ha inventado, convencido de que es el paso correcto.
[serious] Y como el resto del bucle confía en ese resultado, el error se cuela en todos los pasos siguientes sin que nadie se dé cuenta hasta el final.
[emphatic] Por eso equipos serios revisan cada llamada a herramienta antes de dejarla pasar, no solo el resultado final.
[tense] Por eso casi ningún equipo serio deja a un agente actuar sin límites.
[confident] Se le pone un tope de pasos, un presupuesto de gasto, y sobre todo, una lista de acciones que necesitan que una persona diga que sí antes de ejecutarse.
[curious] Reembolsar veinte euros, lo hace solo. Reembolsar dos mil, lo pregunta primero.

[serious] Y aquí está el trabajo real de quien construye estos sistemas.
[confident] No es escribir el prompt bonito y ya está.
[tense] Es decidir qué puede hacer el agente sin supervisión, qué necesita aprobación humana, y qué pasa cuando algo sale mal a mitad del bucle.
[emphatic] Diseñar los límites es más trabajo que diseñar las capacidades.
[curious] Porque un agente con demasiada libertad no es más útil, es más peligroso.

[serious] Y hay una segunda forma de fallo, más silenciosa, que se llama deriva de objetivo.
[tense] El agente empieza persiguiendo la tarea correcta, pero en el paso número doce del bucle, algo lo desvía sin que nadie lo note.
[curious] Le pediste que resumiera un informe, y quince pasos después está reescribiendo el informe entero porque en algún punto interpretó que eso era "mejorarlo".
[serious] Nadie le dio esa instrucción. La construyó él solo, paso a paso, cada uno pareciendo razonable en su momento.
[emphatic] Por eso los buenos sistemas comprueban el objetivo original a mitad de camino, no solo al final.
[confident] Preguntarle al agente "¿sigues persiguiendo lo que te pedí, o te has desviado?" en mitad del proceso ahorra más dolores de cabeza que cualquier prompt perfecto al principio.

[serious] Vale, y todo esto, ¿cuánto se paga en España en dos mil veintiséis?
[curious] Un perfil junior, con cero a dos años, se mueve entre treinta y cinco mil y cuarenta y cinco mil euros brutos al año.
[confident] Un perfil con cinco a diez años de experiencia real está entre cincuenta y un mil y setenta mil.
[emphatic] Y por encima de diez años, especializado en sistemas de agentes en producción, entre setenta y uno y noventa mil, con picos más altos en roles de liderazgo técnico.
[tense] La diferencia entre esos números no es solo antigüedad, es haber visto fallar un agente en producción y saber por qué falló.

[serious] ¿Y cómo se entra en esto?
[curious] La base técnica es programación normal, Python sobre todo, y entender bien cómo funciona una API.
[confident] Después, aprender el patrón del bucle, objetivo, herramienta, observación, replanteamiento, que es siempre el mismo aunque cambie el framework de moda.
[emphatic] Y el proyecto que de verdad vale en una entrevista no es "hice un chatbot".
[tense] Es "construí un agente que hace una tarea real con una herramienta real, y le puse límites para que no se descontrolara".
[curious] Automatizar la búsqueda y el resumen de ofertas de trabajo que encajen con tu perfil es un proyecto de este mismo fin de semana, y ya te obliga a resolver el problema de verdad, cuándo parar al agente.

[serious] Así que la próxima vez que alguien te diga que un agente de IA es solo un chatbot con esteroides,
[confident] ya sabes que la diferencia real es el bucle, actuar, mirar el resultado, y decidir el siguiente paso sin que nadie se lo diga.
[curious] Y que el trabajo de verdad no es hacer que el agente pueda hacer más cosas.
[emphatic] Es decidir, con cuidado, cuáles de esas cosas debería hacer solo.
[friendly] Si te ha interesado esta serie sobre empleos reales en tecnología, suscríbete. Se viene más de este mundo.
