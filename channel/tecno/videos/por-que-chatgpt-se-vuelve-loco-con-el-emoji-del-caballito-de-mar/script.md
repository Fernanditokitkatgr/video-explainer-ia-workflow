# Por qué ChatGPT se vuelve loco con el emoji del caballito de mar — guion v1 (ElevenLabs v3)

**Tema**: por qué los modelos de lenguaje se atascan al preguntarles si existe un emoji de caballito de mar. El emoji no existe en Unicode (una propuesta de dos mil dieciocho se rechazó y nadie lo ha vuelto a intentar). Muchos modelos afirmaron en otoño de dos mil veinticinco que sí existe, intentaron escribirlo, sacaron otro animal, se corrigieron y repitieron el ciclo. Explicación más citada: análisis técnico de Theia Vogel (octubre de dos mil veinticinco) con "logit lens" sobre Llama 3.3 70B.
**Canal**: tecno
**Formato**: explicativo evergreen con gancho de "fallo raro de la IA" (formato que dio x17 a Siliconversations con el mismo tema; ver channel/tecno/competitor_report.md). Búsquedas: "emoji caballito de mar", "por qué ChatGPT se vuelve loco", "efecto Mandela emoji", "cómo funciona un modelo de lenguaje".
**Duración estimada**: 5-6 min (narración de ~6.500 caracteres sin etiquetas)
**Ángulo diferenciado**: no repite `por-que-la-ia-se-inventa-cosas` (alucinaciones con el caso del abogado) ni `que-pasa-cuando-escribes-en-chatgpt` (recorrido de la petición y definición de token). Aquí el token solo se usa como "la lista de piezas que puede escribir" y el centro es un caso concreto: una creencia falsa que comparten personas y máquinas, y una pieza que falta en la lista de salida.
**Hilo conductor**: la pregunta del gancho ("¿existe el emoji del caballito de mar?"). El cierre la resuelve: la respuesta corta es que no existe, y lo interesante es que el modelo no tiene forma de enterarse hasta que ve lo que ha escrito.
**Lo establecido frente a las hipótesis**: establecido = el emoji no existe en Unicode; los modelos afirmaron que existía y entraron en bucle (heise, Emojipedia, Vogel); la salida del modelo solo puede ser una pieza de su lista. Hipótesis = que la creencia venga de los textos humanos con el efecto Mandela; que en las capas intermedias construya "caballito de mar más emoji" (observado con logit lens en un modelo concreto, interpretación de la autora); que el aprendizaje por refuerzo tenga algo que ver (la propia autora lo llama especulación, NO se cuenta).
**Nota de ritmo**: frases cortas y sin comas dentro de cada línea (whisper corta por comas). Negaciones clave siempre con verbo al lado. Cifras con letras. Sin diálogo con atribución (un solo narrador): la escena del bucle se cuenta como narración con frases cortas.

---

[curious] Hazle esta pregunta a ChatGPT.
[curious] ¿Existe el emoji del caballito de mar?
[ominous] Y prepárate.
[confident] Porque lo que viene a continuación no es una broma.
[serious] Es uno de los fallos más raros que se han visto en una inteligencia artificial.
[curious] Y al final de este vídeo vas a entender por qué pasa.

[serious] Empecemos por lo básico.
[serious] El emoji del caballito de mar no existe.
[serious] Ni existe hoy ni ha existido nunca en el estándar Unicode. Es la lista oficial de todos los emojis del mundo.
[serious] Hay peces. Hay pulpos. Hay medusas. Hay hasta un caracol.
[emphatic] Pero caballito de mar no hay ninguno.
[serious] Se propuso en dos mil dieciocho. Y se rechazó.
[serious] Y según Emojipedia nadie ha vuelto a intentarlo en serio.
[curious] Solo existe una rareza. Un manual de un procesador de textos japonés de mil novecientos ochenta y ocho dibujaba uno en su lista de signos del zodiaco.
[serious] Pero eso no es un emoji de tu teclado.

[tense] Y ahora vuelve a la pregunta.
[serious] Hace un tiempo mucha gente se la hizo a ChatGPT. Y lo que pasó quedó documentado en medios y en foros.
[serious] Empieza seguro de sí mismo. Sí. Existe. Aquí lo tienes.
[serious] Y te escribe un pez.
[tense] Pero un pez no es un caballito de mar.
[serious] Entonces se corrige. Espera. Ese no es.
[serious] Lo intenta otra vez. Y te escribe un caballo.
[tense] Tampoco. Un caballo tampoco es un caballito de mar.
[serious] Prueba con un unicornio. Con otro bicho marino.
[emphatic] Dice que sí. Dice que no. Dice que ahora sí. Dice que en realidad no.
[serious] Hasta que al final reconoce que no encuentra nada.
[curious] Algunos modelos tardaban más en salir del bucle. Otros se daban cuenta antes.
[serious] Y otros acertaban a la primera.
[serious] Un medio alemán lo contó en octubre de dos mil veinticinco. Y los usuarios lo compartieron por todas partes.
[curious] Así que la pregunta es esta. ¿Por qué se atasca?

[serious] Para responder necesitamos hablar de las personas.
[serious] Porque a nosotros nos pasa algo muy parecido.
[curious] Seguro que tú también lo recuerdas. Un caballito de mar con su cola enroscada.
[serious] Mucha gente jura que lo ha visto en su teclado.
[emphatic] Pero no lo ha visto. Porque no existe.
[serious] A esto se le llama el efecto Mandela.
[serious] Es cuando mucha gente recuerda lo mismo y todos se equivocan a la vez.
[serious] Por qué nos pasa en este caso nadie lo sabe con certeza.
[serious] Una idea habitual es que tiene sentido que exista. Hay peces. Hay delfines. Hay pulpos. Un caballito de mar encajaría perfectamente.
[serious] Y tu cerebro rellena el hueco.
[tense] Ahora piensa en esto.
[serious] Estas máquinas aprenden leyendo cantidades enormes de texto escrito por personas.
[serious] Y entre esas personas hay muchas que están convencidas de que ese emoji existe.
[emphatic] Los investigadores creen que puede que ahí esté el origen. La máquina hereda nuestra falsa memoria.
[serious] Ojo. Es una hipótesis. No está demostrado.
[serious] Pero encaja con lo que se ve. Muchos modelos responden que sí con mucha seguridad.

[serious] Y aquí viene lo más interesante.
[serious] Creer que algo existe no basta para provocar el bucle.
[serious] El bucle aparece al intentar escribirlo.
[curious] Así que vamos a mirar cómo escribe una máquina de estas.
[serious] Imagina que el modelo tiene una enorme lista de piezas.
[serious] Cada pieza es una palabra. O un trozo de palabra. O un símbolo.
[serious] A esas piezas se les llama tokens.
[serious] Cada emoji que existe tiene su pieza en la lista. El pez tiene la suya. El caballo tiene la suya.
[emphatic] Y el modelo solo puede escribir piezas de esa lista.
[serious] Nunca puede inventarse una pieza nueva por el camino.
[curious] Por dentro el modelo no escribe de golpe. Primero construye una idea de lo que quiere decir.
[serious] Y luego busca en la lista la pieza que más se parece a esa idea.
[serious] Con la palabra casa la idea y la pieza coinciden. No hay problema.
[serious] Con un emoji que existe pasa lo mismo.
[tense] Pero con el caballito de mar no.

[serious] Aquí es donde entra el análisis más citado.
[serious] Lo publicó una investigadora llamada Theia Vogel en octubre de dos mil veinticinco.
[serious] Usó una técnica llamada logit lens. Es como mirar por una ventana lo que piensa el modelo capa a capa mientras trabaja.
[serious] Lo probó con un modelo abierto. De los que se pueden abrir y mirar por dentro.
[serious] Y vio algo curioso.
[serious] En las capas del medio el modelo parecía estar montando la idea de caballito de mar más emoji.
[serious] Es decir. Estaba construyendo justo lo que quería escribir.
[emphatic] Pero en la lista no hay ninguna pieza que encaje con esa idea.
[serious] Así que el sistema coge la más cercana.
[serious] Un pez. Un caballo. Algo marino.
[serious] La explicación más aceptada es esta. El modelo quería una cosa. Y sale otra distinta.

[tense] Y entonces llega el momento clave.
[serious] El modelo no se entera de su error hasta que ve lo que ha escrito.
[serious] Mientras trabaja por dentro sigue creyendo que todo va bien.
[serious] Ve el pez ya escrito. Y se da cuenta de que algo falla.
[serious] Entonces se corrige. Lo intenta otra vez.
[serious] Y vuelve a pasar exactamente lo mismo.
[emphatic] Porque la pieza que busca sigue sin existir.
[serious] Cada intento fallido se suma al texto. Y cada fallo le confunde un poco más.
[curious] Según el análisis algunos modelos acababan reconociendo que el emoji no existe. Otros seguían dando vueltas durante mucho rato.

[serious] Queda una duda.
[curious] ¿Y por qué no se limita a decir que no sabe?
[serious] Porque no está construido para eso.
[serious] Un modelo de lenguaje no hace una pausa para pensarse la respuesta.
[serious] Siempre tiene que escribir la siguiente pieza.
[serious] Y esa pieza siempre es una de las de su lista.
[emphatic] No tiene un botón de silencio.
[serious] Cuando la pieza perfecta no existe elige la menos mala.
[serious] Y la menos mala es un pez.
[serious] Es como pedirle a alguien que responda con las fichas de un juego de mesa. Y que la ficha que necesita no esté en la caja.
[serious] Tiene que mover otra. Aunque sepa que no es la buena.

[serious] Entonces qué nos enseña esto.
[serious] Primero. Que estas máquinas no consultan una enciclopedia.
[serious] Tienen una especie de recuerdo aproximado. Como el nuestro.
[serious] Y como el nuestro puede ser falso.
[serious] Segundo. Que dicho con seguridad no significa comprobado.
[serious] El modelo respondió que sí con total confianza. Y estaba equivocado.
[serious] Tercero. Que entender algo por dentro y poder expresarlo son dos cosas distintas.
[emphatic] El modelo parecía tener la idea clara. Lo que no tenía era la pieza para escribirla.
[curious] Y hay una cuarta cosa. Esto ya se ha ido arreglando.
[serious] Según Emojipedia algunas empresas ajustaron sus modelos y ahora detectan el error mucho antes.
[serious] El fallo fue un accidente. Pero nos dejó ver un trocito de cómo funcionan por dentro.

[serious] Así que volvamos a la pregunta del principio.
[curious] ¿Existe el emoji del caballito de mar?
[emphatic] No. No existe.
[serious] Tú podrías pensar que sí. Muchísima gente lo piensa.
[serious] Y las máquinas que han leído lo que escribimos lo piensan también.
[serious] La diferencia es que tú puedes parar y decir que no estás seguro.
[serious] Ellas tienen que seguir escribiendo.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
