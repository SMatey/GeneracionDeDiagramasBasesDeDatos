from flask import Flask
from flask_cors import CORS  # Habilitar CORS para permitir solicitudes desde otros orígenes
from rutas import init_routes  # Importar las rutas desde rutas.py

app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Inicializar las rutas de la API
init_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
