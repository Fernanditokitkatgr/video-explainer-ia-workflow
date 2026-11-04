# Genera channel/tecno/videos/por-que-la-ia-gasta-tanta-energia/plano.json (prueba estilo Ecomonos)
import json, sys
from pathlib import Path

OUT = Path(sys.argv[1])
CAJA = {"x": 960, "y": 250, "w": 1100}


def pueblo(elems, cont=True, **kw):
    """elems: lista de dicts; los que no llevan 'al' se marcan 'ya' (ya estaban)."""
    es = []
    for e in elems:
        e = dict(e)
        if "al" not in e:
            e["ya"] = True
        es.append(e)
    d = {"tipo": "pueblo", "caja": CAJA, "elementos": es}
    if cont:
        d["continua"] = True
    d.update(kw)
    return d


CASA = {"id": "casa", "tipo": "casa", "x": -0.24}
NAVE = {"id": "nave", "tipo": "nave", "x": 0.12}
REF1 = {"id": "ref1", "tipo": "refrigeracion", "x": 0.42, "escala": 0.8}
POSTE = {"id": "poste", "tipo": "poste", "x": -0.1, "escala": 0.7}

T = []


def tramo(en, escenas, personajes, **kw):
    t = {"en": en, "escenas": escenas, "personajes": personajes}
    t.update(kw)
    T.append(t)


# ── GANCHO ──
tramo("", [{"tipo": "texto", "tam": 120, "caja": {"x": 1110, "y": 330, "w": 1300}, "palabras": [
    {"texto": "MÁS ELECTRICIDAD", "al": "@electricidad"},
    {"texto": "QUE TODO JAPÓN", "al": "@japón", "color": "rojo"}]}],
    {"mono": {"x": 0.13, "pose": "brazos_arriba", "cara": "sorpresa", "entrada": "pop",
              "cambios": [{"al": "@japón", "pose": "miedo", "cara": "miedo", "salta": True}]}},
    color="rojo", capitulo="Más luz que Japón", golpes=["@japón"], sfx=[["boom", "@japón", 0.9]])
tramo("Eso es lo que gastarán", [{"tipo": "iconos", "tam": 200, "items": [
    {"icono": "calendario", "texto": "2030", "al": "@gastarán"},
    {"icono": "mundo", "texto": "INTERNET", "al": "@internet"},
    {"icono": "robot", "texto": "IA", "al": "@inteligencia"}]}],
    {"mono": {"pose": "señalar", "cara": "normal", "x": 0.13},
     "ia": {"tipo_": None, "x": 0.87, "mira": "izq", "pose": "jarras", "cara": "chulo", "entra": "@inteligencia", "entrada": "der",
            "dice": [{"texto": "¡Tengo hambre de luz!", "al": "@inteligencia+0.4", "hasta": "@fin"}]}},
    color="amarillo")
tramo("Lo calcula la Agencia", [{"tipo": "sello", "texto": "AGENCIA DE LA ENERGÍA", "al": "@agencia", "tam": 90, "color": "azul"}],
      {"mono": {"pose": "brazos_cruzados", "cara": "chulo"}, "ia": {"pose": "encogerse", "cara": "guiño"}})
tramo("Le haces una pregunta", [{"tipo": "chat", "mensajes": [
    {"texto": "¿Cuánto pesa una ballena?", "lado": "izq", "al": "@pregunta"},
    {"texto": "Unas ciento cincuenta toneladas.", "lado": "der", "al": "@contestarte"}]}],
    {"mono": {"x": 0.13, "pose": "de_pie", "cara": "normal", "objeto": "movil",
              "cambios": [{"al": "@contestarte", "cara": "risa", "salta": True}]}},
    color="azul", capitulo="Una pregunta de dos segundos", sfx=[["teclas", "@pregunta", 0.8]])
tramo("Parece que no ha pasado", [{"tipo": "iconos", "tam": 210, "items": [
    {"icono": "megafono", "texto": "RUIDO", "al": "@ruido", "tachar_al": "@ruido+0.35"},
    {"icono": "fuego", "texto": "HUMO", "al": "@humo", "tachar_al": "@humo+0.35"},
    {"icono": "termometro", "texto": "CALOR", "al": "@calor", "tachar_al": "@calor+0.35"}]}],
    {"mono": {"pose": "encogerse", "cara": "normal", "objeto": "ninguno",
              "cambios": [{"al": "@calor", "pose": "brazos_cruzados", "cara": "chulo"}]}})
tramo("Pero en una nave llena", [pueblo([dict(NAVE, al="@nave", texto="UNA NAVE", texto_al="@ordenadores")], cont=False)],
      {"mono": {"x": 0.12, "pose": "pensar", "cara": "sorpresa", "cambios": [{"al": "@mundo", "pose": "señalar", "cara": "normal"}, {"al": "@gastar", "pose": "encogerse", "cara": "miedo", "salta": True}],
                "dice": [{"texto": "¿Por mí?", "al": "@ti", "hasta": "@fin"}]}},
      color="morado", sfx=[["tension", "@nave", 0.6]])
tramo("¿Cómo puede gastar", [{"tipo": "pregunta", "pregunta": "¿Cómo gasta tanto algo que no ves?", "al": "@como"}],
      {"mono": {"pose": "pensar", "cara": "normal", "cambios": [{"al": "@ves", "pose": "encogerse", "cara": "sorpresa"}]}},
      color="amarillo")
tramo("Para entenderlo, vamos a montar", [pueblo([], cont=False, cartel="EL PUEBLO")],
      {"mono": {"x": 0.12, "pose": "presentar", "cara": "risa", "cambios": [{"al": "@pueblo", "salta": True}]},
       "perro": {"x": 0.86, "mira": "izq", "pose": "de_pie", "cara": "risa", "entra": "@monos", "entrada": "der"}},
      color="verde")
tramo("Primero verás", [{"tipo": "flujo", "nodos": [
    {"texto": "LUZ", "icono": "bombilla", "al": "@luz"},
    {"texto": "FRÍO", "icono": "termometro", "al": "@enfriarlo"},
    {"texto": "FACTURA", "icono": "sobre", "al": "@factura", "color": "rojo"}]}],
    {"mono": {"pose": "señalar", "cara": "guiño", "cambios": [{"al": "@factura", "pose": "señalar_arriba", "cara": "sorpresa"}]},
     "perro": {"pose": "saludar", "cara": "normal"}})
# ── CAPÍTULO 1 ──
tramo("Capítulo uno", [{"tipo": "lista", "n": 1, "total": 3, "titulo": "SOLO HACE CUENTAS", "apodo": "UN CEREBRO", "titulo_al": "@cerebro", "apodo_al": "@cuentas"}],
      {"mono": {"x": 0.86, "mira": "izq", "pose": "celebrar", "cara": "risa"}}, color="azul", capitulo="1. Un cerebro que hace cuentas")
tramo("Al principio, el pueblo", [pueblo([dict(CASA, al="@casa")], cont=False, cartel="EL PUEBLO")],
      {"mono": {"x": 0.12, "mira": "der", "pose": "saludar", "cara": "risa",
                "dice": [{"texto": "¡Mi casita!", "al": "@tranquilo", "hasta": "@fin"}]}},
      color="verde", sfx=[["ding", "@bombilla", 0.7]])
tramo("Un día, su vecino", [pueblo([CASA, {"id": "maq", "tipo": "maquina", "x": 0.15, "al": "@máquina", "texto": "LA MÁQUINA"}], cartel="EL PUEBLO")],
      {"mono": {"pose": "pensar", "cara": "normal"},
       "vecino": {"x": 0.88, "mira": "izq", "pose": "señalar_arriba", "cara": "risa", "entra": "@vecino", "entrada": "der",
                  "dice": [{"texto": "¡Contesta a todo!", "al": "@pregunta", "hasta": "@fin"}]}})
tramo("El problema es que una inteligencia", [{"tipo": "comparativa",
    "a": {"titulo": "TÚ", "valor": "PIENSAS", "icono": "bombilla", "al": "@tú", "color": "verde"},
    "b": {"titulo": "LA IA", "valor": "HACE CUENTAS", "icono": "robot", "al": "@cuentas", "color": "azul"}}],
    {"mono": {"pose": "brazos_cruzados", "cara": "normal", "cambios": [{"al": "@muchísimas", "cara": "sorpresa", "salta": True}]},
     "vecino": {"pose": "encogerse", "cara": "guiño"}}, color="azul")
tramo("Para escribir cada palabra", [{"tipo": "cifra", "desde": 0, "hasta": 1000000000, "al": "@miles", "tam": 140,
    "antes": "POR CADA PALABRA", "etiqueta": "MULTIPLICACIONES", "etiqueta_al": "@números"}],
    {"mono": {"pose": "miedo", "cara": "sorpresa"}, "vecino": {"pose": "pensar", "cara": "normal",
     "cambios": [{"al": "@empezar", "pose": "brazos_arriba", "cara": "miedo"}]}},
    color="amarillo", sfx=[["teclas", "@siguiente", 0.7]])
tramo("Eso no lo puede hacer", [{"tipo": "iconos", "tam": 220, "items": [
    {"icono": "chip", "texto": "ORDENADOR NORMAL", "al": "@ordenador", "tachar_al": "@normal+0.2"},
    {"icono": "gpu", "texto": "TARJETA GRÁFICA", "al": "@tarjetas"}]}],
    {"mono": {"pose": "señalar", "cara": "normal"}, "vecino": {"pose": "celebrar", "cara": "risa"}})
tramo("Una de las más usadas", [{"tipo": "cifra", "desde": 0, "hasta": 700, "sufijo": " W", "al": "@setecientos", "flecha": "sube",
    "antes": "UNA H100 DE NVIDIA", "etiqueta": "COMO UN MICROONDAS", "etiqueta_al": "@microondas"}],
    {"mono": {"pose": "señalar", "cara": "normal", "cambios": [{"al": "@tragar", "pose": "brazos_arriba", "cara": "sorpresa", "salta": True}],
              "dice": [{"texto": "¡Y nunca se apaga!", "al": "@nunca", "hasta": "@fin"}]}},
    color="rojo")
tramo("Y la máquina del vecino necesita", [pueblo([CASA, {"id": "maq", "tipo": "maquina", "x": 0.15, "quita_al": "@miles"},
    dict(NAVE, al="@nave", texto="MILES DE CHIPS", texto_al="@juntas")], cartel="EL PUEBLO",
    zoom={"desde": 1.0, "hasta": 0.92, "al": "@nave"})],
    {"mono": {"x": 0.12, "pose": "miedo", "cara": "sorpresa"},
     "vecino": {"x": 0.88, "pose": "presentar", "cara": "chulo"}}, color="verde")
tramo("Eso se llama un centro", [{"tipo": "sello", "texto": "CENTRO DE DATOS", "al": "@centro", "tam": 120}],
      {"mono": {"pose": "señalar", "cara": "guiño"}, "vecino": {"pose": "jarras", "cara": "risa"}})
# ── CAPÍTULO 2 ──
tramo("Capítulo dos", [{"tipo": "lista", "n": 2, "total": 3, "titulo": "APRENDER GASTA MÁS", "apodo": "QUE CONTESTAR", "titulo_al": "@aprender", "apodo_al": "@contestar"}],
      {"mono": {"x": 0.86, "mira": "izq", "pose": "presentar", "cara": "normal"}}, color="naranja", capitulo="2. Aprender gasta más que contestar")
tramo("Antes de contestar nada", [{"tipo": "iconos", "tam": 220, "items": [
    {"icono": "libro", "texto": "MEDIO INTERNET", "al": "@internet"},
    {"icono": "reloj_arena", "texto": "SEMANAS", "al": "@semanas"}]}],
    {"mono": {"x": 0.12, "pose": "pensar", "cara": "normal"},
     "ia": {"x": 0.88, "mira": "izq", "pose": "sentado", "cara": "normal", "entra": "@aprender", "entrada": "cae",
            "dice": [{"texto": "Leyendo… página tres millones", "al": "@ajusta", "hasta": "@fin"}]}},
    color="azul", sfx=[["pagina", "@lee", 0.8]])
tramo("Un estudio de dos mil veintiuno", [{"tipo": "cifra", "desde": 0, "hasta": 1300, "sufijo": " MWh", "al": "@mil trescientos",
    "antes": "ENTRENAR GPT-3", "tam": 180}],
    {"mono": {"pose": "señalar", "cara": "sorpresa"},
     "cientifica": {"x": 0.88, "mira": "izq", "pose": "presentar", "cara": "normal", "entra": "@estudio", "entrada": "der", "objeto": "probeta", "dice": [{"texto": "¡Lo he medido!", "al": "@gastó", "hasta": "@fin"}]}},
    color="morado")
casas120 = [{"id": f"c{i}", "tipo": "casa", "x": x, "escala": 0.55, "al": a, "color": c}
            for i, (x, a, c) in enumerate([(-0.42, "@ciento", "rosa"), (-0.28, "@veinte", "amarillo"), (-0.14, "@casas", "azul"),
                                           (0.0, "@estados", "naranja"), (0.14, "@unidos", "verde"), (0.28, "@año", "rosa"),
                                           (0.42, "@entero", "morado")])]
tramo("Lo mismo que gastan ciento veinte", [pueblo(casas120, cont=False, cartel="× 120", medidor={"texto": "UN AÑO", "desde": 0.1, "hasta": 0.8, "al": "@ciento", "hasta_al": "@entero"})],
      {"mono": {"x": 0.08, "pose": "brazos_arriba", "cara": "sorpresa"},
       "cientifica": {"pose": "señalar", "cara": "normal", "x": 0.93, "escala": 0.8}}, color="verde")
tramo("Y era un modelo", [{"tipo": "comparativa",
    "a": {"titulo": "GPT-3", "valor": "HACE 5 AÑOS", "icono": "robot", "al": "@modelo", "color": "gris"},
    "b": {"titulo": "LOS DE AHORA", "valor": "MUCHO MÁS GRANDES", "icono": "cohete", "al": "@ahora", "color": "rojo"},
    "ganador": "b", "ganador_al": "@grandes"}],
    {"mono": {"x": 0.12, "pose": "pensar", "cara": "normal", "cambios": [{"al": "@grandes", "pose": "miedo", "cara": "miedo"}]},
     "ia": {"x": 0.88, "pose": "brazos_arriba", "cara": "chulo", "entra": "@ahora", "entrada": "cae"}}, color="amarillo")
tramo("Además, tanta cuenta calienta", [pueblo([CASA, dict(NAVE, calor_al="@calienta", texto="¡QUEMA!", texto_al="@calienta+0.3", color_texto="rojo")], cartel="EL PUEBLO",
      medidor={"texto": "CALOR", "desde": 0.2, "hasta": 0.95, "al": "@calienta", "hasta_al": "@estropean"})],
      {"mono": {"x": 0.1, "pose": "miedo", "cara": "miedo", "cambios": [{"al": "@estropean", "pose": "encogerse", "salta": True}]},
       "vecino": {"x": 0.9, "mira": "izq", "pose": "brazos_arriba", "cara": "miedo", "entrada": "der",
                  "dice": [{"texto": "¡Se fríen!", "al": "@frenan", "hasta": "@fin"}]}},
      color="rojo", sfx=[["alerta", "@estropean", 0.6]])
tramo("Así que el pueblo le pone", [pueblo([CASA, dict(NAVE, texto="¡FRESQUITA!", texto_al="@noche", color_texto="azul"),
    dict(REF1, al="@ventiladores", texto="TORRES DE AGUA", texto_al="@torres")],
    cartel="EL PUEBLO", cables=[{"de": "nave", "a": "ref1", "al": "@tuberías"}])],
    {"mono": {"pose": "señalar_arriba", "cara": "normal"}, "vecino": {"pose": "celebrar", "cara": "risa"}},
    color="azul", sfx=[["agua", "@noche", 0.6]])
tramo("O sea, gastas luz", [{"tipo": "texto", "tam": 110, "palabras": [
    {"texto": "LUZ PARA PENSAR", "al": "@pensar"},
    {"texto": "+ LUZ PARA ENFRIAR", "al": "@calor", "color": "azul"}]}],
    {"mono": {"pose": "jarras", "cara": "risa", "cambios": [{"al": "@calor", "pose": "encogerse", "cara": "guiño"}]},
     "vecino": {"pose": "pensar", "cara": "triste"}}, color="amarillo")
# ── CAPÍTULO 3 ──
tramo("Capítulo tres", [{"tipo": "lista", "n": 3, "total": 3, "titulo": "EL PUEBLO", "apodo": "SE QUEDA CORTO", "titulo_al": "@pueblo", "apodo_al": "@corto"}],
      {"mono": {"x": 0.86, "mira": "izq", "pose": "miedo", "cara": "sorpresa"}}, color="rojo", capitulo="3. El pueblo se queda corto")
tramo("Ahora viene lo curioso", [{"tipo": "pantalla", "dispositivo": "movil", "titulo": "GOOGLE MIDE", "lineas": [
    {"texto": "1 pregunta", "al": "@pregunta"}, {"texto": "a Gemini", "al": "@gemini", "color": "azul"}]}],
    {"mono": {"x": 0.15, "pose": "pensar", "cara": "normal"},
     "cientifica": {"x": 0.85, "mira": "izq", "pose": "presentar", "cara": "risa", "entra": "@google", "entrada": "der", "objeto": "lupa"}},
    color="azul")
tramo("Cero coma veinticuatro", [{"tipo": "cifra", "desde": 0, "hasta": 0.24, "decimales": 2, "sufijo": " Wh", "al": "@cero", "flecha": "baja", "etiqueta": "POR PREGUNTA", "etiqueta_al": "@hora"}],
      {"mono": {"pose": "señalar", "cara": "sorpresa"}, "cientifica": {"pose": "señalar", "cara": "normal", "objeto": "ninguno"}}, color="verde")
tramo("Menos que tener la tele", [{"tipo": "iconos", "tam": 220, "items": [
    {"icono": "play", "texto": "9 S DE TELE", "al": "@tele"},
    {"icono": "gota", "texto": "5 GOTAS", "al": "@gotas"}]}],
    {"mono": {"pose": "jarras", "cara": "chulo"}, "cientifica": {"pose": "celebrar", "cara": "risa"}})
tramo("Casi nada", [{"tipo": "pregunta", "pregunta": "¿Dónde está el problema?", "al": "@problema"}],
      {"mono": {"pose": "pensar", "cara": "normal", "cambios": [{"al": "@problema", "pose": "encogerse", "cara": "sorpresa"}]},
       "cientifica": {"pose": "brazos_cruzados", "cara": "guiño"}}, color="amarillo")
tramo("En que la pregunta nunca", [{"tipo": "cifra", "desde": 1, "hasta": 1000000000, "log": True, "al": "@miles", "tam": 140, "antes": "NUNCA ES SOLO UNA", "etiqueta": "PREGUNTAS AL DÍA", "etiqueta_al": "@día"}],
      {"mono": {"pose": "brazos_arriba", "cara": "miedo"}}, color="rojo")
tramo("Y cada pocos meses", [{"tipo": "iconos", "tam": 190, "items": [
    {"icono": "robot", "texto": "MODELO NUEVO", "al": "@modelo"},
    {"icono": "robot", "texto": "OTRO MÁS", "al": "@volver"},
    {"icono": "robot", "texto": "Y OTRO", "al": "@entrenar"}]}],
    {"mono": {"pose": "encogerse", "cara": "triste"},
     "ia": {"x": 0.88, "mira": "izq", "pose": "celebrar", "cara": "risa", "entra": "@modelo", "entrada": "cae"}}, color="morado")
tramo("En dos mil veinticuatro, los centros", [{"tipo": "grafica", "forma": "barras", "ancho": 1000, "sufijo": " TWh",
    "puntos": [{"v": 415, "al": "@cuatrocientos"}, {"v": 945, "al": "@doble"}],
    "marcas": [{"i": 0, "texto": "2024", "al": "@cuatrocientos"}, {"i": 1, "texto": "2030", "al": "@doble"}]}],
    {"mono": {"x": 0.1, "pose": "señalar", "cara": "normal", "cambios": [{"al": "@doble", "pose": "miedo", "cara": "miedo", "salta": True}]},
     "ia": {"x": 0.9, "pose": "jarras", "cara": "chulo", "dice": [{"texto": "¡Y subiendo!", "al": "@agencia", "hasta": "@fin"}]}}, color="amarillo")
PUEBLO_TODO = [CASA, NAVE, REF1, POSTE]
tramo("Y el pueblo se queda sin luz", [pueblo(PUEBLO_TODO, cont=False, cartel="EL PUEBLO", apagon_al="@luz",
    cables=[{"de": "casa", "a": "poste"}, {"de": "poste", "a": "nave"}, {"de": "nave", "a": "ref1"}],
    medidor={"texto": "CONSUMO", "desde": 0.6, "hasta": 1.0, "al": "@pueblo", "hasta_al": "@luz"})],
    {"mono": {"x": 0.1, "pose": "miedo", "cara": "miedo",
              "dice": [{"texto": "¿Quién ha apagado?", "al": "@luz+0.4", "hasta": "@fin"}]},
     "vecino": {"x": 0.9, "mira": "izq", "pose": "correr", "cara": "miedo", "entrada": "der",
                "cambios": [{"al": "@busca", "pose": "pensar", "cara": "normal"}]}},
    color="morado", golpes=["@luz"])
NUC = {"id": "nuc", "tipo": "nuclear", "x": -0.42, "escala": 0.7}
tramo("Microsoft ha firmado", [pueblo(PUEBLO_TODO + [dict(NUC, al="@central", texto="CENTRAL NUCLEAR", texto_al="@nuclear")], cartel=None,
    apagon_al="@inicio", vuelve_al="@encender",
    cables=[{"de": "casa", "a": "poste"}, {"de": "poste", "a": "nave"}, {"de": "nave", "a": "ref1"}, {"de": "nuc", "a": "casa", "al": "@pensilvania"}],
    zoom={"desde": 1.0, "hasta": 0.88, "al": "@central"})],
    {"mono": {"x": 0.08, "pose": "señalar", "cara": "sorpresa"},
     "rico": {"x": 0.92, "mira": "izq", "pose": "jarras", "cara": "chulo", "entra": "@microsoft", "entrada": "cae", "objeto": "ninguno",
              "dice": [{"texto": "¡Me la quedo!", "al": "@firmado", "hasta": "@cerrada"}]}},
    color="verde")
tramo("Veinte años de electricidad", [{"tipo": "cifra", "desde": 0, "hasta": 20, "sufijo": " AÑOS", "al": "@veinte", "etiqueta": "PARA SUS ORDENADORES", "etiqueta_al": "@ordenadores"}],
      {"mono": {"pose": "brazos_cruzados", "cara": "enfado"}, "rico": {"pose": "celebrar", "cara": "risa", "objeto": "puro"}}, color="oro")
tramo("Y aquí llega la parte", [{"tipo": "texto", "tam": 150, "palabras": [{"texto": "TE TOCA", "al": "@toca"}, {"texto": "A TI", "al": "@ti", "color": "rojo"}]}],
      {"mono": {"x": 0.15, "pose": "señalar", "cara": "chulo", "salta": True}}, color="rojo", capitulo="La parte que te toca", golpes=["@ti"])
tramo("En Irlanda", [{"tipo": "cifra", "desde": 0, "hasta": 22, "sufijo": " %", "al": "@veintidós", "antes": "IRLANDA", "etiqueta": "DE TODA SU LUZ", "etiqueta_al": "@electricidad"}],
      {"mono": {"pose": "señalar", "cara": "sorpresa"},
       "abuelo": {"x": 0.88, "mira": "izq", "pose": "de_pie", "cara": "normal", "entra": "@irlanda", "entrada": "der"}}, color="verde")
tramo("Más de una de cada cinco", [{"tipo": "iconos", "tam": 170, "items": [
    {"icono": "bombilla", "texto": "NAVES", "al": "@una"}, {"icono": "bombilla", "al": "@cada"}, {"icono": "bombilla", "al": "@cada+0.15"},
    {"icono": "bombilla", "al": "@cinco"}, {"icono": "bombilla", "al": "@cinco+0.15"}]}],
    {"mono": {"pose": "presentar", "cara": "normal"}, "abuelo": {"pose": "encogerse", "cara": "sorpresa"}})
tramo("En Estados Unidos, Bloomberg", [{"tipo": "pantalla", "dispositivo": "movil", "titulo": "BLOOMBERG", "lineas": [
    {"texto": "Precio de la luz", "al": "@precios"}, {"texto": "cerca de las naves", "al": "@precios+0.6", "color": "rojo"}]}],
    {"mono": {"x": 0.14, "pose": "pensar", "cara": "normal"}, "abuelo": {"x": 0.86, "pose": "pensar", "cara": "normal"}}, color="azul")
tramo("En algunas zonas cerca", [{"tipo": "cifra", "desde": 0, "hasta": 267, "prefijo": "+", "sufijo": " %", "al": "@doscientos", "flecha": "sube", "antes": "LUZ AL POR MAYOR", "etiqueta": "EN CINCO AÑOS", "etiqueta_al": "@cinco"}],
      {"mono": {"pose": "señalar", "cara": "normal", "cambios": [{"al": "@mayor", "pose": "brazos_arriba", "cara": "miedo", "salta": True}]},
       "abuelo": {"pose": "pensar", "cara": "normal", "cambios": [{"al": "@naves", "pose": "miedo", "cara": "miedo"}], "dice": [{"texto": "¡Mi recibo!", "al": "@cinco", "hasta": "@fin"}]}}, color="rojo", golpes=["@doscientos+0.8"])
tramo("Ese precio es solo una parte", [{"tipo": "texto", "tam": 100, "palabras": [{"texto": "SOLO UNA PARTE", "al": "@parte"}, {"texto": "DE TU RECIBO", "al": "@recibo", "color": "amarillo"}]}],
      {"mono": {"pose": "presentar", "cara": "normal"}, "abuelo": {"pose": "pensar", "cara": "normal"}}, color="amarillo")
tramo("Pero la idea se entiende", [pueblo([dict(CASA, texto="TÚ", texto_al="@demás"), POSTE, dict(NAVE, texto="COMO MIL CASAS", texto_al="@mil"), REF1],
    cont=False, cartel="EL PUEBLO", cables=[{"de": "casa", "a": "poste"}, {"de": "poste", "a": "nave"}, {"de": "nave", "a": "ref1"}],
    medidor={"texto": "LA MISMA LUZ", "desde": 0.5, "hasta": 0.95, "al": "@compiten", "hasta_al": "@luz"})],
    {"mono": {"x": 0.1, "pose": "señalar", "cara": "normal"},
     "abuelo": {"x": 0.9, "pose": "brazos_cruzados", "cara": "enfado", "cambios": [{"al": "@compiten", "pose": "empujar"}]}}, color="verde")
tramo("La buena noticia", [{"tipo": "cifra", "desde": 1, "hasta": 33, "sufijo": " VECES", "al": "@treinta", "flecha": "baja", "antes": "EN UN AÑO", "etiqueta": "MENOS ENERGÍA POR PREGUNTA", "etiqueta_al": "@menos"}],
      {"mono": {"x": 0.12, "pose": "celebrar", "cara": "risa", "salta": True},
       "cientifica": {"x": 0.88, "mira": "izq", "pose": "celebrar", "cara": "risa", "entra": "@google", "entrada": "der", "objeto": "ninguno"}},
      color="verde", sfx=[["exito", "@menos", 0.8]])
tramo("Así que la inteligencia artificial gasta poco", [{"tipo": "comparativa",
    "a": {"titulo": "POR PREGUNTA", "valor": "POCO", "icono": "gota", "al": "@poco", "color": "verde"},
    "b": {"titulo": "EN TOTAL", "valor": "MUCHÍSIMO", "icono": "rayo", "al": "@mucho", "color": "rojo"}}],
    {"mono": {"x": 0.1, "pose": "pensar", "cara": "normal", "cambios": [{"al": "@mundo", "pose": "brazos_arriba", "cara": "sorpresa"}]},
     "ia": {"x": 0.9, "mira": "izq", "pose": "celebrar", "cara": "chulo", "entra": "@cerebro-1.2", "entrada": "cae",
            "dice": [{"texto": "¡Más grande!", "al": "@grande", "hasta": "@fin"}]}}, color="amarillo")
tramo("Ahora piensa otra vez", [pueblo([CASA, POSTE, dict(NAVE, texto="¡AQUÍ!", texto_al="@sabes"), REF1, dict(NUC, texto=None)], cont=False,
    cables=[{"de": "nuc", "a": "casa"}, {"de": "casa", "a": "poste"}, {"de": "poste", "a": "nave"}, {"de": "nave", "a": "ref1"}],
    zoom={"desde": 1.12, "hasta": 0.88, "al": "@inicio", "dur": 2.5})],
    {"mono": {"x": 0.1, "pose": "de_pie", "cara": "normal", "objeto": "movil",
              "cambios": [{"al": "@respuesta", "cara": "risa", "salta": True}, {"al": "@sabes", "pose": "señalar_arriba", "cara": "guiño", "objeto": "ninguno"}]}},
    color="morado", capitulo="Ya sabes dónde se enciende la luz")
tramo("Y si quieres saber quién", [{"tipo": "pantalla", "dispositivo": "movil", "titulo": "SIGUIENTE VÍDEO", "lineas": [
    {"texto": "Por qué Nvidia", "al": "@nvidia", "tam": 44}, {"texto": "vale tanto", "al": "@vale", "tam": 44, "color": "verde"}]}],
    {"mono": {"x": 0.15, "pose": "pensar", "cara": "normal", "cambios": [{"al": "@fabrica", "pose": "señalar", "cara": "risa"}, {"al": "@enteros", "salta": True, "cara": "sorpresa"}, {"al": "@espera", "pose": "saludar", "cara": "guiño"}]},
     "rico": {"x": 0.86, "mira": "izq", "pose": "jarras", "cara": "chulo", "entra": "@chips", "entrada": "cae", "objeto": "ninguno", "dice": [{"texto": "¡Esos son míos!", "al": "@electricidad", "hasta": "@fin"}]}},
    color="amarillo", relleno=False)

# limpieza: claves auxiliares
for t in T:
    for pid, p in t["personajes"].items():
        p.pop("tipo_", None)
    for e in t["escenas"]:
        for el in e.get("elementos", []):
            if el.get("texto") is None:
                el.pop("texto", None)
            el.pop("quita_calor", None)
        if e.get("cartel", 1) is None:
            e.pop("cartel")

plano = {"formato": "16:9", "cola": 1.4, "rayos": {"x": 960, "y": 560},
         "reparto": {"mono": {"tipo": "protagonista", "narrador": True}, "ia": {"tipo": "ia"}, "perro": {"tipo": "perro"},
                     "vecino": {"tipo": "currito"}, "cientifica": {"tipo": "cientifica"}, "rico": {"tipo": "rico"}, "abuelo": {"tipo": "abuelo"}},
         "tramos": T}
OUT.write_text(json.dumps(plano, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(T), "tramos")
