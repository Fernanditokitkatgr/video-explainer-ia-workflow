# El virus que tumbó medio mundo en un fin de semana (WannaCry) — guion v1 (ElevenLabs v3)

**Tema**: la historia de WannaCry (viernes 12 de mayo de 2017) y cómo funcionó a nivel conceptual:
ransomware que cifra archivos y pide unos 300 dólares en bitcoin (luego 600); gusano que salta
solo de ordenador en ordenador; fallo de Windows (EternalBlue) creado por la NSA y filtrado por
The Shadow Brokers; parche MS17-010 publicado dos meses antes (marzo de 2017); más de 200.000
ordenadores en unos 150 países; hospitales del NHS, Telefónica, fábricas de Renault y Nissan;
Marcus Hutchins (MalwareTech, 22 años) registra por unos 10 dólares el dominio raro del código y
activa el interruptor de apagado; atribución a Corea del Norte (grupo Lazarus); daños de miles
de millones y muy pocos rescates pagados; parche de emergencia para Windows XP; lecciones:
actualizar, copias de seguridad, sistemas sin soporte. Sin pasos técnicos de explotación.
**Canal**: tecno
**Formato**: historia + explicativo buscable ("wannacry", "virus más peligroso de la historia")
**Duración estimada**: 6-7 min
**Prueba de demanda**: ≈ historias de hacks tipo Darknet Diaries / Lemmino. Ver channel/tecno/topic_backlog.md.
**Ángulo diferenciado**: el virus que tumbó hospitales y multinacionales en horas ya tenía
vacuna desde hacía dos meses (el parche) y lo frenó un chaval de 22 años con diez dólares.
**Hilo conductor**: frase recurrente "El parche ya existía." y la doble promesa del gancho (un
botón que casi nadie pulsa + un chaval con diez dólares), resuelta en el bloque del interruptor
y en el cierre. Analogía de apoyo: la casa con la cerradura cambiada y la puerta trasera que
alguien dejó abierta (y cuya llave se robó).
**Nota de ritmo**: frases cortas y casi sin comas dentro de cada línea (whisper corta por comas).

---

[tense] Viernes por la mañana. Un hospital de Londres. Las pantallas de los ordenadores se vuelven rojas de golpe.
[serious] Un mensaje dice que todos los archivos están bloqueados. Y que para recuperarlos hay que pagar.
[tense] En pocas horas pasa lo mismo en fábricas de coches. En estaciones de tren. En grandes empresas de España.
[emphatic] Más de doscientos mil ordenadores en unos ciento cincuenta países. En un solo fin de semana.
[curious] Y lo más loco es que todo eso se podía haber evitado con un botón que casi todo el mundo ignora.
[serious] El parche ya existía.
[curious] Y al final a este monstruo lo frenó un chaval de veintidós años. Con unos diez dólares.
[confident] Hoy vas a ver qué fue WannaCry. Cómo funcionaba. Y qué tiene que ver contigo.

[serious] Empecemos por el nombre. WannaCry es un ransomware.
[confident] Un ransomware es un programa que secuestra tus archivos.
[curious] No los roba. No los borra. Los cifra.
[serious] Cifrar es convertir tus fotos y tus documentos en un revoltijo que no se puede leer.
[confident] Para devolverlos a la normalidad hace falta una llave. Una clave secreta.
[tense] Y esa llave solo la tienen los atacantes.
[curious] Es como si alguien entrara en tu casa y cambiara la cerradura de todos los armarios.
[serious] Tus cosas siguen ahí. Las ves a través del cristal. Pero no puedes abrir nada.
[tense] Y en la puerta te deja una nota. Si quieres la llave paga.
[emphatic] Eso es un ransomware. Un secuestro digital.

[serious] La nota de WannaCry era muy clara.
[confident] Pedía unos trescientos dólares. Y los quería en bitcoin.
[curious] ¿Por qué bitcoin? Porque es dinero digital que se puede mover sin pasar por un banco.
[serious] Y eso hace mucho más difícil seguir la pista de quién lo cobra.
[tense] Además había una cuenta atrás en la pantalla.
[serious] Si no pagabas en tres días el precio subía a seiscientos dólares.
[tense] Y si pasaba una semana la amenaza era que tus archivos se perderían para siempre.
[confident] Hasta aquí es un ransomware bastante normal. Había muchos antes que él.
[curious] Pero WannaCry tenía algo que lo hacía muchísimo más peligroso.

[emphatic] No necesitaba que nadie hiciera clic en nada.
[serious] La mayoría de virus necesitan tu ayuda. Abres un archivo raro. Pinchas en un enlace. Y entran.
[tense] WannaCry era un gusano. Saltaba solo de un ordenador a otro.
[curious] En cuanto infectaba un equipo se ponía a buscar otros ordenadores cercanos en la misma red.
[serious] Y también probaba con ordenadores al azar de todo internet.
[confident] Si encontraba uno vulnerable se colaba dentro. Y ese nuevo equipo empezaba a buscar otros.
[tense] Uno infecta a dos. Dos infectan a cuatro. Cuatro infectan a ocho.
[emphatic] Por eso en una oficina bastaba un solo ordenador para que cayera la planta entera.
[curious] ¿Y cómo conseguía colarse sin que nadie hiciera nada?

[serious] Por una puerta trasera de Windows.
[confident] Windows tiene un sistema para compartir archivos e impresoras entre ordenadores de una misma red.
[serious] Es como una puerta de servicio que usan los equipos para hablar entre ellos.
[tense] Y esa puerta tenía un fallo. Con un mensaje preparado de una forma muy concreta alguien de fuera podía entrar.
[curious] Ese fallo tenía nombre. Lo llamaban EternalBlue.
[tense] Y aquí la historia se pone todavía más rara.
[serious] EternalBlue no lo inventaron unos delincuentes.
[emphatic] Lo había desarrollado la NSA. La agencia de espionaje de Estados Unidos.
[curious] La NSA guardaba fallos como este en secreto. Como herramientas para espiar.
[tense] Pero en 2017 un grupo que se hacía llamar The Shadow Brokers publicó en internet un montón de esas herramientas.
[serious] Nadie sabe con certeza quién estaba detrás de ese grupo.
[emphatic] De repente cualquiera podía descargar un arma que había diseñado una agencia de espionaje.

[serious] Ahora viene la parte más importante de toda la historia.
[confident] En marzo de 2017 Microsoft ya había publicado un parche que cerraba esa puerta.
[curious] Se llamaba MS17-010. Era una actualización normal de Windows.
[serious] Llegó dos meses antes del ataque.
[emphatic] El parche ya existía.
[tense] Los ordenadores que habían instalado esa actualización estaban a salvo. WannaCry rebotaba contra ellos.
[serious] Las víctimas fueron los equipos que no se habían actualizado.
[curious] La mayoría eran ordenadores con Windows 7 que no se habían actualizado.
[tense] Y había otros todavía peores. Ordenadores con Windows XP.
[serious] Windows XP era tan viejo que Microsoft ya ni siquiera le daba soporte. No recibía parches.
[confident] Así que el fin de semana del ataque Microsoft hizo algo muy poco habitual.
[emphatic] Publicó un parche de emergencia también para Windows XP. Un sistema que ya había dado por muerto.

[serious] Vamos a ver qué pasó aquel viernes doce de mayo de 2017.
[tense] En España Telefónica fue de las primeras víctimas conocidas.
[confident] Por la mañana en sus oficinas se pidió a los empleados que apagaran los ordenadores.
[serious] Y la noticia corrió enseguida. Si le pasaba a una empresa así le podía pasar a cualquiera.
[tense] En Reino Unido el golpe fue mucho más duro. Cayeron ordenadores de muchos hospitales de la sanidad pública.
[serious] Se cancelaron miles de citas. Se aplazaron operaciones.
[tense] Algunas urgencias tuvieron que desviar ambulancias a otros hospitales.
[serious] En Francia se paró una fábrica de Renault. En Reino Unido una de Nissan.
[curious] Hubo empresas de mensajería. Estaciones de tren. Universidades. Ministerios.
[emphatic] En pocas horas el mapa del mundo se llenó de puntos rojos.
[tense] Y parecía que nada podía pararlo.

[curious] Hasta que apareció un chaval de veintidós años.
[confident] Se llamaba Marcus Hutchins. Un investigador de seguridad británico que en internet se hacía llamar MalwareTech.
[serious] Aquel día estaba de vacaciones. Pero se puso a mirar una copia del virus.
[curious] Dentro del código encontró algo muy raro. Una dirección web larguísima. Una ristra de letras sin sentido.
[serious] El virus intentaba conectarse a esa dirección antes de hacer nada.
[tense] Y esa dirección no existía. Nadie la había registrado.
[confident] Hutchins la compró. Le costó unos diez dólares.
[curious] En realidad no quería parar nada. Solo quería medir cuántos ordenadores estaban infectados.
[emphatic] Pero en cuanto esa web empezó a funcionar el virus dejó de propagarse.
[serious] Resulta que WannaCry tenía un interruptor de apagado escondido.
[confident] Si la web respondía el virus se quedaba quieto. Si no respondía atacaba.
[tense] Al registrarla Hutchins había pulsado ese interruptor para todo el mundo.
[emphatic] Diez dólares frenaron un ataque que ya estaba costando millones.

[serious] Ojo. Eso no lo arregló todo.
[tense] Los ordenadores que ya estaban cifrados siguieron cifrados.
[confident] Y el interruptor solo servía para esa versión del virus. Pronto aparecieron copias sin él.
[serious] Pero le dio al mundo algo que necesitaba muchísimo. Tiempo.
[confident] Tiempo para que millones de ordenadores instalaran el parche.
[emphatic] El mismo parche que ya existía desde hacía dos meses.

[curious] ¿Y quién estaba detrás de todo esto?
[serious] Meses después Estados Unidos y Reino Unido señalaron al mismo responsable. Corea del Norte.
[confident] En concreto a un grupo de hackers conocido como Lazarus.
[tense] Los daños se calcularon en miles de millones de dólares. Por ordenadores parados. Por trabajo perdido. Por hospitales colapsados.
[curious] Y aquí va el giro final. Con los rescates los atacantes ganaron muy poco.
[serious] Pagó muy poca gente. Y muchos de los que pagaron ni siquiera recuperaron sus archivos.
[emphatic] Un ataque que costó una fortuna al mundo y casi no dio dinero a quien lo lanzó.

[serious] Ahora la pregunta que importa. ¿Qué tiene que ver todo esto contigo?
[confident] Primera lección. Actualiza tus dispositivos.
[serious] Ese aviso de actualización que siempre dejas para mañana muchas veces cierra una puerta como la de EternalBlue.
[emphatic] El parche ya existía. Solo había que instalarlo.
[confident] Segunda lección. Haz copias de seguridad.
[serious] Guarda tus archivos importantes también fuera del ordenador. En un disco externo o en la nube.
[curious] Si un ransomware te cifra todo y tienes una copia no hay secuestro. Borras y recuperas.
[confident] Tercera lección. No te fíes de los sistemas viejos.
[tense] Un ordenador o un móvil que ya no recibe actualizaciones es una casa con una puerta que nadie va a volver a cerrar.
[serious] Y una última cosa. Pagar no te garantiza nada. Y además financia al siguiente ataque.

[serious] Así que volvamos a aquel viernes. A esas pantallas rojas.
[curious] Un fallo guardado en secreto por una agencia de espionaje. Robado. Publicado en internet.
[tense] Un gusano que saltaba solo de ordenador en ordenador. Hospitales. Fábricas. Empresas enteras paradas.
[confident] Y un chaval de veintidós años que con diez dólares pulsó el botón de apagado.
[emphatic] Pero el botón que de verdad lo habría evitado era mucho más sencillo. Actualizar.
[friendly] El parche ya existía. La próxima vez que tu móvil te pida actualizar ya sabes lo que te juegas.
[friendly] Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana, una máquina, un invento o una idea explicada fácil.
