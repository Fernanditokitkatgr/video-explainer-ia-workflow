# SEO — Qué pasa cuando envías un WhatsApp (el viaje de tu mensaje)

## Título (≤60 chars)

1. **Qué pasa cuando envías un WhatsApp (el viaje secreto)** ← recomendado (55)
2. El viaje secreto de tu WhatsApp: 10 paradas en 1 segundo (57)
3. Qué pasa cuando envías un WhatsApp (y quién lo puede leer) (59)

Keywords de búsqueda: "qué pasa cuando envías un whatsapp", "cómo funciona whatsapp", "cifrado de extremo a extremo", "qué significa un check gris", "doble check azul", "por qué solo sale un check", "whatsapp guarda los mensajes", "caída de whatsapp 2021".
Formato: motor de animación, formato nuevo VIAJE (circuito de 10 paradas que se va completando) + combate WhatsApp contra SMS. Palabra de tensión: "secreto".

## Descripción

```
Escribes "¿estás despierto?", le das a enviar… y en menos de un segundo tu mensaje ha hecho un viaje de diez paradas. Seguimos a un WhatsApp desde tu dedo hasta la pantalla de tu amigo: quién lo puede leer por el camino, qué significa cada check y por qué a veces tarda horas en llegar.

Lo que vas a ver:
- El candado: el cifrado de extremo a extremo que WhatsApp activó para todos en abril de 2016 (protocolo Signal)
- Los paquetes: por qué tu mensaje viaja troceado en cajas con etiqueta
- El WiFi y la antena: ondas de radio a la velocidad de la luz
- La fibra óptica: luz a unos 200.000 km por segundo dentro de un hilo de cristal
- Los routers: los cruces donde se decide el camino
- El servidor: lo que significa de verdad el primer check gris
- La consigna: por qué un mensaje puede esperar hasta 30 días
- El timbre: cómo Apple y Google despiertan el móvil de tu amigo (dos checks)
- La llave: el descifrado en el otro móvil
- Los checks azules: desde noviembre de 2014, y cómo quitarlos
- La gran caída del 4 de octubre de 2021 y el combate WhatsApp contra SMS

Fuentes principales: WhatsApp (política de privacidad y documento técnico de cifrado), Signal, Meta (resultados trimestrales), ingeniería de Facebook (caída de 2021) y prensa (Krebs on Security, PCWorld, TechSpot).

Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete: cada semana, una máquina, un invento o una idea explicada fácil.

#WhatsApp #Tecnologia #Internet
```

## Capítulos

0:00 El viaje de tu mensaje
0:29 1. El candado
0:51 2. Los paquetes
1:10 3. El WiFi
1:25 4. La fibra
1:48 5. Los routers
2:09 6. El servidor
2:29 7. La espera
2:48 8. El timbre
3:09 9. La llave
3:26 10. Los checks azules
3:45 La gran caída de 2021
4:20 Las dos preguntas

## Tags

```
que pasa cuando envias un whatsapp, como funciona whatsapp, cifrado de extremo a extremo, whatsapp explicado, check gris whatsapp, doble check azul, por que solo sale un check, servidores de whatsapp, como viaja un mensaje, fibra optica, router, notificaciones push, caida de whatsapp 2021, whatsapp vs sms, como funciona internet
```

(15 tags, por debajo de 420 caracteres efectivos.)

## Miniatura
plantilla: B (fotograma del propio vídeo: el circuito de paradas con el sobre viajando; sin IA de imagen)
texto: ¿QUIÉN LO|LEE?
resaltar: LEE
posicion: left

## Shorts

Largo hecho con el motor (nov-2026): sus Shorts no salen de recortes (shorts/shorts.json vacío). Short propio en `channel/tecno/videos/short-el-viaje-de-tu-whatsapp/`.

## Notas

### Fuentes (verificadas con WebSearch el 3 de noviembre de 2026)

- 100.000 millones de mensajes al día (dato de 2020, llamada de resultados del tercer trimestre de 2020 de Facebook): https://www.neowin.net/news/whatsapp-is-now-exchanging-close-to-100-billion-messages-each-day · https://benzinga.com/z/18135161
- Cifrado de extremo a extremo para todos, 5 de abril de 2016, con el protocolo Signal: https://signal.org/blog/whatsapp-complete/ · https://www.pcworld.com/article/3052451/security/whatsapp-turns-on-end-to-end-encryption.html
- Mensajes no entregados: se guardan cifrados en el servidor hasta 30 días y luego se borran (política de privacidad de WhatsApp): https://conductatlas.com/platform/whatsapp/whatsapp-privacy-policy/undelivered-messages-stored-30-days/ · https://www.iphone-ticker.de/whatsapp-datenschutz-adressen-speichern-30862
- Checks azules: llegaron a principios de noviembre de 2014; si desactivas las confirmaciones de lectura, tampoco ves las de los demás: https://techpp.com/2014/11/11/whatsapp-disable-blue-ticks/ · https://soyacincau.com/2014/11/15/whatsapp-now-lets-you-disable-read-receipts/
- Caída del 4 de octubre de 2021 (unas seis horas, cambio de configuración en los routers de la red troncal de Facebook que retiró las rutas BGP): https://krebsonsecurity.com/2021/10/what-happened-to-facebook-instagram-whatsapp/ · https://www.techspot.com/news/91574-facebook-back-online-after-more-than-6-hours.html
- Luz en la fibra óptica: unos 200.000 km/s (dos tercios de la velocidad de la luz en el vacío); Madrid-Barcelona ≈ 500 km ≈ 2,5 ms. SMS: 160 caracteres (estándar GSM).
- Notificaciones: en iPhone las entrega el servicio de Apple (APNs) y en Android el de Google (Firebase Cloud Messaging).

### Lo establecido frente a lo matizado

- "Según WhatsApp, ni ellos pueden leerlo": es lo que dice WhatsApp de su cifrado; el guion lo atribuye.
- "Un texto corto cabe en una o dos cajas; una foto, en cientos": orden de magnitud (paquetes de ~1.500 bytes).

### Datos de producción

- Voz: generate_voice.py --model eleven_v4 (5.351 caracteres con etiquetas). Audio 284 s.
- Reparto: mono (narrador), mona (la amiga), ciberdelincuente, policía (los routers), científica (la fibra), perro.

### Publicación

- Subido: https://youtu.be/HWB-oVj5AtU (privado, se publica el 2026-11-08T18:00:00Z, 19:00 Madrid) con daily_publish.py.
