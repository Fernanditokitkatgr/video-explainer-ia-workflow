# Qué hace un Data Engineer en realidad — guion de voz v1 (ElevenLabs v3)

**Tema**: qué diferencia de verdad a un data engineer de un data scientist, un ejemplo real de
pipeline, qué pasa cuando se rompe, el giro salarial (ahora cobra más que el data scientist) y
ruta de entrada.
**Canal**: tecno
**Formato**: 3 · rol/empleo explicado (serie "qué hace en realidad")
**Duración estimada**: 6 min
**Hilo conductor**: si el dato es agua, el data engineer construye las tuberías por las que corre.

---

[curious] Hace unos vídeos te conté qué hace de verdad un data scientist. Y en los comentarios, la pregunta que más se repitió fue la misma.
[confident] ¿Y el data engineer, no es lo mismo pero con otro nombre?
[emphatic] No. Y la diferencia es más grande de lo que crees.
[curious] Si el data scientist es el que analiza el agua, el data engineer es el que construye las tuberías por las que esa agua tiene que correr.
[serious] Hoy te cuento qué hace de verdad, qué pasa cuando esas tuberías se rompen, y un dato que te va a sorprender sobre el sueldo.

[serious] Vamos con la diferencia real.
[curious] Un data scientist recibe datos más o menos limpios y construye modelos con ellos.
[confident] Un data engineer es quien se asegura de que esos datos lleguen limpios, completos y a tiempo, para empezar.
[tense] Sin un data engineer detrás, un data scientist no tiene con qué trabajar.
[emphatic] Es la diferencia entre analizar el agua y construir la tubería que la trae hasta el grifo.
[curious] Y construir esa tubería requiere algo que mucha gente no espera, ingeniería de software de verdad.

[serious] Vamos con un ejemplo real y muy típico.
[curious] Una empresa de comercio electrónico quiere entender el comportamiento de sus clientes.
[confident] Para eso necesita juntar tres cosas que viven en sitios completamente distintos, las transacciones de compra, los clics en la web, y los comentarios en redes sociales.
[tense] Cada una de esas fuentes habla un idioma distinto, llega a una velocidad distinta, y puede fallar de una forma distinta.
[serious] El data engineer construye lo que se llama un pipeline, una tubería automática que hace tres cosas seguidas, sin parar, todos los días.
[emphatic] Extrae los datos de cada fuente, los transforma a un formato común y limpio, y los carga en un almacén central donde todo el mundo puede usarlos.
[confident] A eso, en el sector, se le llama ETL, extraer, transformar y cargar. Y ese pipeline no se ejecuta una vez, se ejecuta cada hora, cada día, para siempre.

[serious] Y aquí está la parte que casi nadie cuenta cuando habla de este trabajo.
[tense] Los pipelines se rompen. Constantemente.
[curious] Una fuente cambia el formato de sus datos sin avisar. Un servidor se cae a mitad de la carga. Llegan el doble de datos de golpe un día de rebajas.
[emphatic] Y cuando un pipeline se rompe, no se entera solo el data engineer.
[serious] Se entera todo el equipo de data science, que de repente se queda trabajando con datos de ayer, o con datos a medias, sin saberlo.
[tense] Por eso una parte enorme del trabajo no es construir el pipeline la primera vez, es vigilarlo.
[confident] Alertas que avisan en cuanto algo falla, comprobaciones automáticas de que los datos que llegan tienen sentido, y un plan para cuando, no si, algo se rompe a las tres de la madrugada.

[serious] Y aquí hay un matiz que separa a un pipeline amateur de uno de verdad.
[curious] Un pipeline amateur falla en silencio. Los datos llegan mal, nadie se entera, y una semana después alguien de negocio toma una decisión basada en un número que estaba corrupto desde el lunes.
[tense] Un pipeline bien construido falla de forma ruidosa. Se para, avisa, y no deja que el dato malo siga adelante.
[emphatic] Ese detalle, fallar alto y pronto en vez de silencioso y tarde, es prácticamente la definición de ingeniería de datos madura.
[confident] Por eso las herramientas que se usan hoy en día, como Airflow para organizar las tareas, o dbt para las transformaciones, están construidas alrededor de esa idea, que cada paso se pueda vigilar por separado.

[serious] Y aquí viene el giro que te prometí al principio.
[curious] Durante años, la creencia general era que el data scientist cobraba más, porque era el perfil de moda, el que salía en las noticias.
[confident] Eso se ha invertido.
[emphatic] En cada nivel de experiencia, el data engineer cobra ahora entre un ocho y un quince por ciento más que el data scientist.
[tense] ¿Por qué? Porque construir y mantener infraestructura de datos en producción, que no se puede permitir caerse, requiere una combinación de habilidades mucho más rara de encontrar.
[serious] Hay muchísima gente que sabe entrenar un modelo siguiendo un tutorial. Hay muchísima menos que sabe construir un sistema que no se caiga con tráfico real.

[serious] Vale, y en cifras concretas, ¿cuánto se paga en España en dos mil veintiséis?
[curious] El rango completo va de veintiocho mil a ochenta y cinco mil euros brutos al año, según la experiencia.
[confident] La mediana está alrededor de cincuenta mil.
[emphatic] Y en sectores donde los datos en tiempo real son críticos, banca, seguros, plataformas grandes, el sueldo puede igualar o superar claramente al de un data scientist en el mismo nivel.
[tense] La diferencia entre esos números, otra vez, no es solo antigüedad.
[serious] Es haber visto un pipeline caerse en producción un viernes por la tarde, y saber exactamente qué hacer.

[serious] ¿Y cómo se entra en esto?
[curious] La base es programación seria, no solo scripts sueltos, sino código que otras personas puedan mantener.
[confident] Después, bases de datos, tanto las clásicas como las que manejan volúmenes enormes, y entender bien cómo se organiza la información para que se pueda consultar rápido.
[emphatic] Y el patrón que hay que aprender es siempre el mismo, extraer, transformar, cargar, aunque cambien las herramientas de moda cada dos años.
[curious] Las herramientas concretas del momento son Airflow para organizar cuándo se ejecuta cada tarea, Spark para procesar volúmenes enormes de datos en paralelo, y dbt para las transformaciones escritas en SQL.
[tense] Pero ojo, las herramientas cambian cada pocos años. El patrón de extraer, transformar y cargar, y sobre todo vigilar, lleva décadas siendo el mismo.
[serious] El proyecto que de verdad vale en una entrevista no es "monté un modelo".
[curious] Es "construí un pipeline que coge datos de una fuente real, los limpia automáticamente, y los deja listos para usar, y programé una alerta para cuando algo falle".
[confident] Coger un dataset público que se actualiza cada día y automatizar por completo su descarga, limpieza y almacenamiento es un proyecto de este mismo fin de semana, y ya te enfrenta al problema real, qué haces cuando la fuente cambia sin avisar.

[serious] Así que la próxima vez que alguien te diga que un data engineer es solo un data scientist con otro nombre,
[confident] ya sabes que uno analiza el agua y el otro construye la tubería, y que sin la tubería no hay agua que analizar.
[curious] Y ahora también sabes que esa tubería, la que nadie ve hasta que se rompe,
[emphatic] es la que mejor se está pagando ahora mismo en todo el sector de datos.
[friendly] Si te ha interesado esta serie sobre empleos reales en tecnología, suscríbete. Se viene más de este mundo.
