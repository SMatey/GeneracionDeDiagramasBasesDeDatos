import requests
import zlib
import base64

# Tabla de conversión para codificar en base64
plantuml_alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"

def encode6bit(b):
    return plantuml_alphabet[b & 0x3f]

def append3bytes(b1, b2, b3):
    c1 = b1 >> 2
    c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
    c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
    c4 = b3 & 0x3F
    return encode6bit(c1) + encode6bit(c2) + encode6bit(c3) + encode6bit(c4)

# Codificación especial para PlantUML (deflate + base64 modificada)
def encode_plantuml(data):
    compressed_data = zlib.compress(data.encode('utf-8'))[2:-4]  # Usar DEFLATE sin headers
    result = ""
    for i in range(0, len(compressed_data), 3):
        b1 = compressed_data[i]
        b2 = compressed_data[i+1] if i+1 < len(compressed_data) else 0
        b3 = compressed_data[i+2] if i+2 < len(compressed_data) else 0
        result += append3bytes(b1, b2, b3)
    return result

# Función para enviar el código PlantUML y obtener la imagen en formato PNG
def enviar_a_plantuml(codigo_plantuml):
    plantuml_url = "http://www.plantuml.com/plantuml/png"
    
    # Codificar correctamente el código PlantUML
    plantuml_code = encode_plantuml(codigo_plantuml)
    url = f"{plantuml_url}/{plantuml_code}"

    print(f"URL generada para PlantUML: {url}")  # Mensaje para verificar la URL generada
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.content  # Retornar el contenido binario de la imagen PNG
        else:
            print(f"Error al obtener la imagen de PlantUML: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error al conectarse al servidor PlantUML: {e}")
        return None

# Función para generar el código PlantUML
def generar_codigo_plantuml(tablas):
    plantuml_code = "@startuml\n"
    
    # Generar código UML para las tablas y columnas
    for tabla in tablas:
        plantuml_code += f"entity {tabla['table_name']} {{\n"
        for columna in tabla['columns'] :
            plantuml_code += f"    + {columna['column_name']}: {columna['data_type']}\n"
        # Marcar las claves primarias
        if tabla['primary_key']:
            for pk in tabla['primary_key']:
                plantuml_code += f"    {pk} <<PK>>\n"
        plantuml_code += "}\n"
    
    # Generar las relaciones (claves foráneas)
    for tabla in tablas:
        for fk in tabla['foreign_keys']:
            plantuml_code += f"{tabla['table_name']}::{fk['column_name']} --> {fk['references_table']}::{fk['references_column']}\n"
    
    plantuml_code += "@enduml"
    return plantuml_code
