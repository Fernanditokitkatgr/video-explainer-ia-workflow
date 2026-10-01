# Qué hace un AI Engineer en realidad — guion de voz v1 (ElevenLabs v3)

**Tema**: qué diferencia de verdad a un AI Engineer de un Machine Learning Engineer, por qué
casi nunca entrena un modelo desde cero, qué hace de verdad con las IA que ya existen, y sueldo.
**Canal**: tecno
**Formato**: 3 · rol/empleo explicado (serie "qué hace en realidad")
**Duración estimada**: 6-7 min
**Hilo conductor**: cierra el trío del agua — el data scientist analiza el agua, el data
engineer construye la tubería, y el AI Engineer es quien instala el grifo de tu cocina, el
que hace que salga agua caliente justo cuando la abres.

---

[curious] Llevamos dos vídeos hablando de quien analiza el agua y quien construye la tubería.
[confident] Pero falta alguien en esa cadena, y es probable que sea el puesto del que más oyes hablar ahora mismo.
[emphatic] El AI Engineer.
[serious] Y casi todo el mundo se hace una idea equivocada de qué hace en realidad.

[curious] La mayoría de la gente cree que un AI Engineer entrena inteligencias artificiales.
[tense] No. Casi nunca entrena nada desde cero.
[serious] Y entender por qué es la clave de todo este vídeo.

[serious] Volvamos al agua un momento.
[curious] El data scientist analiza el agua. El data engineer construye la tubería que la trae.
[confident] Pero alguien tiene que instalar el grifo en tu cocina.
[emphatic] Alguien tiene que hacer que, cuando tú lo abres, salga agua caliente, en el momento exacto en que la necesitas, sin que tengas ni idea de la tubería que hay detrás.
[serious] Ese es el AI Engineer.

[serious] En la práctica, esto significa una cosa muy concreta.
[curious] Modelos como los que hacen ChatGPT, Claude o Gemini ya existen, entrenados por equipos enormes con presupuestos de cientos de millones.
[confident] El AI Engineer no compite con eso. Los usa, a través de una conexión, como quien usa el agua que ya llega por la tubería.
[emphatic] Su trabajo es construir el producto encima de ese modelo, no el modelo en sí.

[serious] Y aquí es donde entra la palabra que más vas a oír si te metes en esto, RAG.
[curious] Son las siglas de recuperación aumentada de generación, y suena más complicado de lo que es.
[confident] Es enseñarle a la IA a buscar información concreta, la tuya, la de tu empresa, antes de responder, en vez de fiarse solo de lo que aprendió durante el entrenamiento.
[tense] Sin eso, un modelo puede sonar seguro de sí mismo y estar completamente equivocado sobre tus propios datos.
[serious] Construir bien ese sistema de búsqueda es buena parte del trabajo real.

[serious] Vamos con un ejemplo muy típico y muy concreto.
[curious] Una aseguradora quiere un asistente que responda dudas sobre pólizas a sus clientes.
[confident] El modelo de lenguaje ya sabe hablar perfectamente, eso no hay que enseñárselo.
[tense] Lo que no sabe es qué dice exactamente la póliza número tal de ese cliente concreto, porque esa información nunca estuvo en su entrenamiento.
[serious] El AI Engineer construye el puente, el sistema que busca esa póliza exacta, se la pasa al modelo como contexto, y solo entonces deja que responda.
[emphatic] Si ese puente está mal construido, el modelo se inventa condiciones que la póliza no dice, con total seguridad en el tono.
[curious] Y ese fallo tiene nombre, se le llama alucinación, y detectarlo antes de que llegue al cliente es gran parte del trabajo.

[serious] La otra mitad del trabajo son los agentes.
[curious] Ya lo vimos en otro vídeo, un chatbot contesta, un agente actúa.
[confident] El AI Engineer es quien decide qué herramientas puede usar ese agente, qué instrucciones recibe exactamente, y qué pasa cuando decide algo que no debería.
[emphatic] Porque un agente con acceso real a herramientas puede hacer daño real si nadie ha pensado bien los límites.
[tense] Esa parte, diseñar los límites, es más trabajo de ingeniería de software clásica que de inteligencia artificial.

[serious] Y aquí está el dato que más sorprende cuando lo comparas con el puesto vecino.
[curious] Existe otro rol, el Machine Learning Engineer, y a menudo se confunden.
[confident] El Machine Learning Engineer sí entrena modelos desde cero, cuida los datos de entrenamiento, ajusta la arquitectura, vigila que el modelo no se degrade con el tiempo.
[serious] Es el ingeniero de fiabilidad del modelo.
[emphatic] El AI Engineer es el ingeniero de producto, el que construye lo que el usuario final llega a tocar.
[curious] Se parecen mucho sobre el papel, comparten herramientas, pero el día a día es distinto.

[serious] En las ofertas de trabajo reales se nota clarísimo.
[confident] RAG aparece en más de un tercio de las ofertas de AI Engineer, y solo en una de cada seis de Machine Learning Engineer.
[tense] Y al revés, entrenar modelos con librerías especializadas aparece el doble de veces en las ofertas de Machine Learning Engineer.
[serious] Son primos muy cercanos, pero no son el mismo trabajo.

[serious] Vale, y en cifras concretas, ¿cuánto se paga esto en España en dos mil veintiséis?
[curious] El sueldo medio de un AI Engineer ronda los setenta y un mil euros brutos al año.
[confident] El de un Machine Learning Engineer puede llegar más alto en el rango superior, entre cuarenta y ocho mil y más de ochenta y cinco mil.
[tense] Así que, al contrario de lo que la mayoría asume, entrenar el modelo sigue pagándose algo mejor que construir encima de él, al menos por ahora.
[serious] Pero el AI Engineer parte de un sueldo ya muy por encima de la media del sector tecnológico.
[curious] Y esos dos puestos comparten más de la mitad de sus habilidades sobre el papel.
[tense] Lo que de verdad los separa, en la práctica diaria, no es lo que sabes, es en qué pasas las horas.

[serious] ¿Y por qué está explotando esta demanda justo ahora?
[curious] Porque hace tres años, casi ninguna empresa tenía un modelo de lenguaje potente al que conectarse por una simple llamada.
[confident] Hoy cualquier empresa puede acceder a un modelo de nivel mundial en minutos.
[emphatic] Lo que no tiene es a nadie que sepa conectarlo bien, con los datos correctos, con los límites correctos, sin que alucine o se salga de madre.
[tense] Ese hueco, entre tener acceso a la IA y saber usarla bien de verdad, es exactamente el hueco que ocupa este puesto.
[curious] Por eso las ofertas de este perfil se han multiplicado en apenas dos años, mucho más rápido que casi cualquier otro puesto técnico.
[confident] No porque haga falta gente que sepa más matemáticas que antes, sino porque hace falta gente que sepa unir piezas que ya existen sin que el resultado se caiga a la primera prueba real.

[serious] Y hay una parte del trabajo que casi nunca se cuenta y que ocupa muchísimas horas.
[curious] Evaluar si las respuestas son buenas no es tan simple como con código tradicional, donde algo funciona o no funciona.
[confident] Aquí hay que construir conjuntos de preguntas de prueba, revisar cientos de respuestas, y decidir con números si una versión nueva del sistema es mejor que la anterior.
[tense] Sin esa evaluación constante, cualquier cambio pequeño en el diseño puede romper algo en silencio, y nadie se entera hasta que un cliente se queja.
[emphatic] Por eso una parte grande del día a día se parece más a hacer de científico de datos sobre el propio producto, que a programar sin más.

[serious] ¿Y cómo se entra en esto?
[curious] La base es programación seria, sobre todo Python, y entender bien cómo funcionan las APIs.
[confident] Después, hay que entender los conceptos de arriba, RAG, agentes, evaluación de calidad de las respuestas, sin necesidad de saber entrenar una red neuronal desde cero.
[emphatic] Y el proyecto que de verdad impresiona en una entrevista no es "conecté la API de un modelo".
[curious] Es construir un asistente que busque información real en un conjunto de documentos tuyo, y que puedas medir, con datos, cuántas veces acierta y cuántas veces se inventa cosas.
[tense] Eso, medir cuándo falla, es lo que separa un proyecto de fin de semana de algo que una empresa se atrevería a poner en producción.

[serious] Así que la próxima vez que alguien te diga que un AI Engineer entrena la inteligencia artificial,
[confident] ya sabes que no, que su trabajo empieza justo donde termina el entrenamiento,
[curious] es quien instala el grifo, quien decide qué sale por él, y quien se asegura de que lo que sale sea agua de verdad y no algo que solo lo parece.
[emphatic] Con el agua analizada, la tubería construida y el grifo instalado, la cadena completa por fin tiene sentido.
[curious] Y si algún día ese grifo suelta agua fría cuando debería salir caliente, o directamente no sale nada, ya sabes exactamente a quién buscar.
[friendly] Si te ha interesado esta serie sobre empleos reales en tecnología, suscríbete. Se viene más de este mundo.
