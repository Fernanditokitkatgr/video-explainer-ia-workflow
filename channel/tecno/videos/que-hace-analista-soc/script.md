# Qué hace un analista SOC en realidad — guion de voz v1 (ElevenLabs v3)

**Tema**: qué hace de verdad un analista SOC (Security Operations Center), por qué "analista SOC"
en realidad son tres trabajos distintos según el nivel, la fatiga de alertas, y cómo la IA está
cambiando este puesto ahora mismo. Cierra el contraste con el red team ya explicado en otro vídeo.
**Canal**: tecno
**Formato**: 3 · rol/empleo explicado (serie "qué hace en realidad")
**Duración estimada**: 6-7 min
**Hilo conductor**: un SOC es como el cuarto de seguridad de un centro comercial gigante con miles
de cámaras encendidas a la vez, y la mayoría de las alarmas son falsas.

---

[curious] Ya te conté qué hace un red team, gente a la que pagan por intentar entrar donde no deberían.
[confident] Hoy toca el otro lado, el equipo que está ahí para que no entren de verdad.
[emphatic] El analista SOC.
[serious] Y aquí va el primer dato que sorprende, "analista SOC" no es un trabajo. Son tres, muy distintos entre sí.

[serious] Imagina el cuarto de seguridad de un centro comercial gigante.
[curious] Miles de cámaras encendidas a la vez, cada una con su propia alarma.
[confident] Ese cuarto de seguridad, para una empresa, se llama SOC, Security Operations Center.
[tense] Y casi todas esas alarmas, la inmensa mayoría, no significan nada. Son ruido.
[serious] El trabajo del analista SOC es separar esas falsas alarmas de la única que sí importa.

[serious] Vamos con los tres niveles, porque el día a día cambia radicalmente en cada uno.
[curious] El nivel uno es quien mira las cámaras primero.
[confident] Recibe la alerta en bruto, decide en minutos si es real o si es ruido, y si es real, la pasa hacia arriba.
[tense] Es el trabajo de entrada más habitual, y también el más agotador, porque el volumen es brutal.
[serious] Un equipo puede recibir miles de alertas al día, y la mayoría, más de seis de cada diez, acaban siendo falsas alarmas o ruido de baja prioridad.
[emphatic] A eso se le llama fatiga de alertas, y es el problema número uno de este trabajo, no técnico, humano.

[serious] El nivel dos es quien investiga de verdad lo que el nivel uno le pasa.
[curious] Aquí ya no se trata de mirar una alerta suelta, sino de reconstruir la historia completa.
[confident] Qué máquina se vio afectada, qué hizo el atacante después de entrar, hasta dónde llegó.
[tense] Es trabajo de detective, cruzar registros de decenas de sistemas distintos para armar un relato coherente.

[serious] Y el nivel tres es quien lidera cuando la cosa ya es seria de verdad.
[curious] Caza amenazas de forma proactiva, sin esperar a que salte ninguna alarma.
[confident] Y cuando hay un incidente grande, es quien dirige la respuesta completa, quién avisa a quién, qué se apaga, qué se aísla.
[emphatic] Tres trabajos, tres ritmos, tres tipos de estrés completamente distintos, todos bajo el mismo título.

[serious] Y hay un matiz importante entre nivel uno y nivel dos que mucha gente no capta.
[curious] El nivel uno trabaja casi siempre solo con lo que ve en pantalla, en el momento.
[confident] El nivel dos tiene permiso para parar, pedir más contexto, y tardar horas en una sola alerta si hace falta.
[tense] Esa diferencia de ritmo es la razón por la que mucha gente quema en nivel uno y no en nivel dos, no es que el trabajo sea más fácil arriba, es que el reloj deja de presionar tanto.

[serious] Vamos con un ejemplo real de cómo se ve esa fatiga de alertas en la práctica.
[curious] Un analista de nivel uno lleva tres horas de turno. Ha revisado cuarenta alertas. Treinta y siete eran ruido.
[confident] La alerta cuarenta y uno también parece ruido, se parece a las otras treinta y siete.
[tense] Pero esta vez no lo es. Y si el analista está agotado, entrenado por horas de falsos positivos a ignorar ese patrón, se le puede pasar.
[emphatic] Ese momento exacto, la alerta número cuarenta y uno, es literalmente el trabajo. Todo lo demás es filtro.

[serious] Y aquí hay una herramienta que hay que nombrar si hablamos de este puesto.
[curious] El SIEM, el cerebro del SOC, el sistema que recoge y cruza los registros de medio sistema informático de la empresa a la vez.
[confident] Sin él, cada alerta sería un dato suelto sin contexto. Con él, un analista puede ver que tres alertas pequeñas en tres sistemas distintos son, en realidad, el mismo ataque.
[tense] Saber usar bien un SIEM, no solo mirarlo, es gran parte de lo que separa a un analista junior de uno que ya sabe lo que hace.
[curious] Y hay un segundo tipo de herramienta que cada vez pesa más, los manuales de respuesta, listas de pasos ya escritos para cuando pasa algo concreto.
[confident] Cuando salta cierto tipo de alerta, el analista no improvisa desde cero, sigue un procedimiento ya probado, paso uno, paso dos, paso tres.
[tense] Esos manuales se escriben después de cada incidente real, así que un SOC maduro es, literalmente, la memoria acumulada de todo lo que ya le ha pasado a esa empresa antes.

[serious] Vale, y en cifras concretas, ¿cuánto se paga esto en España en dos mil veintiséis?
[curious] Un analista de nivel uno, recién entrado, ronda entre veintidós mil y veintiocho mil euros brutos al año.
[confident] Con experiencia media, tres a cinco años, sube a un rango de treinta y cinco a cincuenta mil.
[tense] Y un nivel tres, senior, liderando respuesta a incidentes, puede superar los sesenta mil.
[serious] La diferencia entre esos números no es solo antigüedad, es haber sobrevivido a la fatiga de alertas el tiempo suficiente para aprender a distinguir el ruido de la alerta cuarenta y uno.

[serious] Y hay un problema silencioso en este sector que casi nadie cuenta.
[curious] Muchas empresas rotan a sus analistas de nivel uno cada dos o tres años.
[tense] Y cuando ese analista se va, se va también todo el conocimiento del contexto, qué sistemas son normales, qué patrones son propios de esta empresa en concreto.
[emphatic] Esa pérdida constante de contexto es una de las razones por las que la fatiga de alertas nunca desaparece del todo, cada nueva generación de analistas empieza casi de cero.
[curious] Y por qué rota tanto la gente en nivel uno, exactamente.
[confident] Porque es un trabajo de guardia, muchas veces a turnos, de noche, de fin de semana, con la presión constante de no poder equivocarte con la alerta que sí importa.
[tense] Ese desgaste, más que el sueldo de entrada, es la razón real por la que tanta gente lo usa como trampolín y no como destino final.

[serious] Y aquí viene el cambio que está sacudiendo justo ahora este puesto.
[curious] Los sistemas de IA agéntica que vimos en otro vídeo ya están entrando de lleno en los SOC.
[confident] Pueden revisar miles de alertas de nivel uno de forma autónoma, descartar el ruido, y solo escalar lo que de verdad merece un humano.
[tense] Lo cual suena genial hasta que piensas qué pasa con la gente que hoy entra a este sector precisamente por el nivel uno.
[serious] El trabajo de entrada de siempre podría dejar de ser la puerta de entrada.
[curious] Pero ojo, esto no significa que el puesto vaya a desaparecer, significa que va a cambiar de forma.
[confident] Alguien va a tener que revisar lo que la IA escala, entrenarla con los casos que se le escapan, y decidir cuándo confiar en su criterio y cuándo no.
[tense] Ese trabajo de supervisar al sistema que antes hacía de filtro es, probablemente, el nivel uno del futuro cercano, no una desaparición, una mutación.

[serious] ¿Y cómo se entra en esto todavía, mientras eso termina de pasar?
[curious] La base son redes, sistemas operativos, y entender cómo se ve el tráfico normal de una red para poder reconocer el anormal.
[confident] Después, manejo real de un SIEM, aunque sea uno gratuito montado en casa con datos de prueba.
[emphatic] Y el proyecto que de verdad impresiona no es "monté un SIEM".
[curious] Es "monté un SIEM, generé tráfico normal y un ataque simulado dentro, y escribí cómo distinguí uno del otro paso a paso".
[tense] Eso, documentar el criterio, no solo la herramienta, es lo que un entrevistador de verdad quiere ver.

[serious] Así que la próxima vez que alguien te diga que un analista SOC solo mira pantallas,
[confident] ya sabes que son tres trabajos distintos bajo el mismo nombre, y que el más duro no es el que investiga incidentes grandes,
[curious] es el que se sienta cada día frente a miles de falsas alarmas, sabiendo que una de ellas, tarde o temprano, no lo es.
[emphatic] El red team entra para avisarte del agujero. El analista SOC es quien tiene que notarlo cuando alguien más lo usa de verdad.
[friendly] Si te ha interesado esta serie sobre empleos reales en tecnología, suscríbete. Se viene más de este mundo.
