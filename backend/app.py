from flask import Flask, request, jsonify, Response
from bases import obtener_esquema
from plantuml import generar_codigo_plantuml, enviar_a_plantuml

app = Flask(__name__)

# Ruta para generar el diagrama de la base de datos y retornar la imagen
@app.route('/generar_diagrama', methods=['POST'])
def generar_diagrama():
    # Obtener los datos de conexión enviados en el body
    data = request.json
    tipo_base_datos = data.get('tipo_base_datos')
    host = data.get('host')
    database = data.get('database')  # Base de datos que se va a utilizar
    user = data.get('user')
    password = data.get('password')

    # Obtener el esquema de la base de datos
    tablas = obtener_esquema(tipo_base_datos, host, database, user, password)

    if not tablas:
        
        return jsonify({"message": "No se encontraron tablas o columnas en la base de datos"}), 404

    # Mostrar el esquema obtenido en la consola
    

    # Generar el código PlantUML basado en el esquema
    codigo_plantuml = generar_codigo_plantuml(tablas)

    # Mostrar el código PlantUML generado
    

    # Enviar el código a PlantUML para obtener la imagen
    imagen = enviar_a_plantuml(codigo_plantuml)

    if imagen:
        # Devolver la imagen directamente como una respuesta Flask
        
        return Response(imagen, mimetype='image/png')
    else:
        return jsonify({"message": "Error al generar el diagrama ERD"}), 500

if __name__ == '__main__':
    app.run(debug=True)
