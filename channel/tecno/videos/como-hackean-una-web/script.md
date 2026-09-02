# Cómo hackean una web de verdad — guion de voz v1 (ElevenLabs v3)

**Tema**: historia real de cómo entra un atacante en una web pequeña con un panel de admin "escondido" y una contraseña débil. Adaptación libre del típico walkthrough de pentesting (nmap, gobuster, hydra) convertido en relato con enfoque DEFENSIVO: el espectador aprende a no ser la víctima.
**Canal**: tecno
**Formato**: 2 · POV de tensión / recorrido del atacante (sin capítulos numerados)
**Duración estimada**: 6,5-7,5 min

---

[curious] Esta es Sara.
Acaba de lanzar la web de su pequeño negocio de comida a domicilio.
[confident] Un menú, un botón de pedir, y detrás, un panel de administración para gestionar los platos.
Sara piensa que ese panel no lo va a encontrar nadie, porque no hay ningún enlace que lleve a él.
[ominous] Y ahí es donde se equivoca.
[tense] Porque al otro lado está alguien que no la conoce de nada, pero que sabe una cosa.
Toda web nueva deja puertas abiertas sin querer.
[curious] Hoy vas a ver, paso a paso, cómo entra un atacante en una web así.
[emphatic] Y al final vas a saber exactamente qué falló, y cómo no ser tú la próxima Sara.

[serious] Lo primero que tienes que entender es que hackear no es teclear rápido con la pantalla llena de código verde.
[curious] Eso es cine. La realidad es mucho más aburrida y mucho más peligrosa.
Es paciencia. Es método. Es buscar, con calma, la puerta que alguien olvidó cerrar.
[confident] El atacante abre la web de Sara y, lo primero, solo mira.
Se llama reconocimiento, y es la parte más larga de cualquier ataque.
Por fuera solo hay dos páginas. El menú y el botón de pedir.
Ningún enlace al panel de administración. Nada sospechoso a simple vista.
[curious] Alguien pensaría que ahí no hay nada que hacer.
[ominous] Pero las puertas de una web casi nunca se anuncian. Simplemente están ahí, escondidas, esperando.
[tense] Y él sabe cómo buscarlas sin que nadie se entere.

[serious] Primer paso, encontrar la dirección real de la web.
[curious] Tú escribes un nombre, como "comidasara punto com", pero por debajo cada web es en realidad un número, su dirección IP.
[confident] Para averiguarlo existe un truco viejo y sencillo, una consulta que le pregunta a internet: oye, ¿qué número hay detrás de este nombre?
En segundos, el atacante tiene la dirección exacta del servidor de Sara.
[emphatic] Saber eso es como saber en qué casa vive alguien.
[tense] Ahora quiere ver qué puertas y ventanas tiene esa casa, y cuáles están abiertas.

[serious] Segundo paso, mirar qué está abierto.
[curious] Piensa otra vez en la casa. Ya sabe dónde está. Ahora rodea el edificio y prueba cada puerta y cada ventana para ver cuál cede.
En una web, esas puertas se llaman puertos, y para revisarlos usa una herramienta muy conocida en seguridad que se llama Nmap.
Nmap recorre el servidor y comprueba, uno a uno, qué puertos están abiertos y qué programa concreto hay funcionando en cada uno.
[confident] El resultado le confirma lo que buscaba. Hay un puerto abierto sirviendo la página web, con un programa de servidor normal y corriente.
[curious] Pero él no quiere lo que se ve. Eso lo ve cualquiera.
Quiere lo que está escondido debajo.
[emphatic] Quiere las carpetas y los archivos que existen en el servidor pero que no aparecen enlazados en ninguna parte de la web.
[tense] Y para eso hay una técnica que casi nadie fuera del sector conoce.

[serious] Y aquí llega la parte clave.
[curious] Usa otra herramienta, Gobuster, que hace una cosa muy simple pero demoledora.
Coge una lista enorme de nombres típicos de carpetas y archivos: admin, acceso, login, copia de seguridad, configuración.
[confident] Y los prueba todos, uno detrás de otro, a toda velocidad, contra el servidor.
[curious] Por cada nombre pregunta: ¿existe esta página? El servidor responde sin querer: esta no, esta tampoco, esta sí.
[emphatic] Piensa en lo que significa. No hace falta adivinar. Simplemente lo prueba todo.
[tense] Durante unos minutos no pasa nada. La mayoría de nombres no existen. El servidor responde que no, una y otra vez.
[curious] Y de repente, entre miles de intentos, uno responde distinto.
Una página que sí existe, pero que no está enlazada en ningún sitio de la web.
[ominous] El panel de administración de Sara. El que ella creía invisible.
[emphatic] No ha hecho falta ser un genio. Ha hecho falta una lista y un poco de paciencia.

[serious] El atacante abre esa dirección en su navegador, a mano, para confirmarlo.
[tense] Y ahí está. Una pantalla de acceso pidiendo usuario y contraseña.
[curious] Ahora solo le falta una cosa. Entrar.
[confident] Pero no lo va a hacer probando a mano.
Usa una tercera herramienta, Hydra, que automatiza los intentos de acceso.
[curious] Hydra funciona como un manojo con miles de llaves.
Prueba usuario tras usuario, y con cada uno, contraseña tras contraseña, cientos por segundo, sin cansarse nunca.
[emphatic] Y aquí está el detalle que lo cambia todo. Si la web no limita los intentos, Hydra puede probar para siempre.

[serious] ¿Y qué usuarios y contraseñas prueba primero?
[curious] Los de siempre. Y esto es lo que casi nadie sabe.
Existen listas públicas, gigantescas, con los usuarios más comunes: admin, root, usuario, administrador.
Y con las contraseñas más usadas del mundo, sacadas de filtraciones reales de millones de cuentas.
[emphatic] No se las inventa. Se las descarga.
[ominous] Contraseñas como uno dos tres cuatro cinco seis. O la palabra contraseña. O te quiero.
[tense] Las mismas que usa muchísima más gente de la que crees.
[tense] El atacante lanza el ataque y Hydra empieza a probar combinaciones.
Usuario administrador, contraseña uno dos tres. No.
Usuario administrador, contraseña te quiero.
[emphatic] Y de repente, para.
Ha encontrado una que funciona.

[serious] El usuario era administrador. La contraseña, te quiero.
[tense] El atacante escribe esas credenciales en el panel de Sara, pulsa entrar,
[ominous] y está dentro.
[emphatic] Y lo que ve no es un juego.
Ve la base de datos de clientes de Sara. Nombres, correos, teléfonos.
Datos reales de gente real, protegidos solo por una contraseña débil y un panel que ella creía escondido.
[tense] Esto no es una demostración de laboratorio. Es exactamente así como pasa en el mundo real, todos los días.
[curious] Y quizá estés pensando: pero mi web es pequeña, ¿quién me va a atacar a mí?
[ominous] Esa es justo la trampa. Al atacante le da igual quién seas.
[emphatic] No te elige a ti. Elige a cualquiera que tenga la puerta mal cerrada, y lanza el mismo ataque contra miles de webs a la vez, de forma automática.
[tense] No te pillan porque seas importante. Te pillan porque eras fácil.

[serious] Así que volvamos al principio, a lo que de verdad importa, a ti.
[confident] Porque todo este ataque, de principio a fin, se apoya en tres errores que puedes evitar hoy mismo.
[emphatic] Uno. Esconder algo no es protegerlo. Un panel sin enlace no está seguro, solo está sin enlazar. En cuanto Gobuster prueba nombres, aparece. Ponle contraseña de verdad y, si puedes, doble factor: un código que cambia cada poco y que el atacante no tiene.
[emphatic] Dos. La contraseña débil es la que abre la puerta. Te quiero, tu nombre, tu fecha de nacimiento o uno dos tres no protegen absolutamente nada, porque están todas en esas listas. Una contraseña larga y única, distinta en cada sitio, convierte un ataque de segundos en uno de siglos.
[emphatic] Tres. Limita los intentos. Si una web bloquea el acceso tras unos pocos fallos, herramientas como Hydra dejan de servir de golpe. Sin ese límite, el atacante tiene todo el tiempo del mundo para probar millones de claves.
[confident] Fíjate que ninguna de las tres cosas es cara ni complicada. Son gratis. Solo hay que saberlas.
[curious] Y una cosa más, la más importante de todas.
[serious] Todo lo que has visto aquí son herramientas que usan los profesionales de seguridad para proteger, con permiso, sus propios sistemas.
[ominous] Hacer esto contra una web que no es tuya, sin autorización, no es curiosidad. Es un delito.
[confident] Esto es divulgación para que sepas defenderte, no un manual para atacar a nadie.
[friendly] Si esto te ha hecho mirar tus contraseñas con otra cara, suscríbete. Se viene más de este mundo.

---

## Notas de producción (v1)

- Formato POV/recorrido de tensión, sin capítulos numerados (ver script-formats.md). Los personajes: Sara (fundadora, mono a color) y el atacante (hacker-sombra con ojos amarillos, ref channel/tecno/references/hacker_sombra.png).
- Enfoque DEFENSIVO obligatorio: se cuenta el ataque para enseñar a defenderse, cierre con los 3 errores evitables + disclaimer legal. Nada de instrucciones accionables reales de ataque (no comandos literales copiables).
- Herramientas reales nombradas (Nmap, Gobuster, Hydra) para autoridad, pero SIN sintaxis de comando copiable.
- Estilo visual: DEFINITIVO ecomonos (channel/tecno/style-bible.json). Texto en imagenes SIEMPRE en espanol. Sara = mono_protagonista.png, atacante = hacker_sombra.png.
- CTA final generico ("se viene mas de este mundo").
- Pendiente: whisper --resegment-gap 0.35, comprobar colisiones de nombre, escenas 1:1, scene_diversity_check antes de generar imagenes.
