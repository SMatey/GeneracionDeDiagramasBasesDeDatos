import psycopg2
import mysql.connector
import pyodbc

# Función para conectar a la base de datos de manera dinámica según el tipo de base de datos
def conectar_base_datos(tipo_base_datos, host, database, user, password):
    try:
        if tipo_base_datos == "postgresql":
            conn = psycopg2.connect(
                host=host,
                database=database,
                user=user,
                password=password
            )
        elif tipo_base_datos == "mysql":
            conn = mysql.connector.connect(
                host=host,
                database=database,
                user=user,
                password=password
            )
        elif tipo_base_datos == "sqlserver":
            conn = pyodbc.connect(
                f'DRIVER={{SQL Server}};SERVER={host};DATABASE={database};UID={user};PWD={password}'
            )
        # Si la conexión es exitosa, devolver True
        return True
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        # Devolver False si hubo un error
        return False
