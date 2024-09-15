from flask import request, jsonify
from bases import conectar_base_datos  # Asegúrate de que la función está correctamente definida

def init_routes(app):
    @app.route('/conectar', methods=['POST'])
    def conectar():
        data = request.json
        host = data.get('host')
        database = data.get('database')
        user = data.get('user')
        password = data.get('password')

        connection_status = conectar_base_datos('postgresql', host, database, user, password)

        if connection_status:
            return jsonify({"message": "Conexión exitosa a la base de datos."}), 200
        else:
            return jsonify({"message": "Error al conectar a la base de datos."}), 400
