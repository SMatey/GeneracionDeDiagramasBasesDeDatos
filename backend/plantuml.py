import requests

# Función para generar el código PlantUML a partir del esquema de la base de datos
def generar_codigo_plantuml(tablas):
    plantuml_code = "@startuml\n"
    for tabla in tablas:
        plantuml_code += f"entity {tabla[0]} {{\n"
        plantuml_code += f"    {tabla[1]}: {tabla[2]}\n"  # Columna y tipo de dato
        plantuml_code += "}\n"
    plantuml_code += "@enduml"
    return plantuml_code

# Función para enviar el código a PlantUML y obtener el diagrama
def enviar_a_plantuml(codigo_plantuml):
    response = requests.post('http://www.plantuml.com/plantuml', data={'text': codigo_plantuml})
    if response.status_code == 200:
        return response.text  # URL del diagrama generado
    else:
        return None
