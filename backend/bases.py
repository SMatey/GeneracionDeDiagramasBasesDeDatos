import psycopg2
import mysql.connector
import pyodbc

# Función para obtener la estructura de la base de datos, compatible con PostgreSQL, MySQL y SQL Server
def obtener_esquema(tipo_base_datos, host, database, user, password):
    try:
        if tipo_base_datos == "Postgres":
            
            conn = psycopg2.connect(
                host=host,
                database=database,
                user=user,
                password=password
            )
        elif tipo_base_datos == "MySQL":
            
            conn = mysql.connector.connect(
                host=host,
                database=database,
                user=user,
                password=password
            )
        elif tipo_base_datos == "SQLServer":
            
            conn = pyodbc.connect(
                f'DRIVER={{SQL Server}};SERVER={host};DATABASE={database};UID={user};PWD={password}'
            )
        else:
            
            return None

        cur = conn.cursor()

        # Consultar las tablas dependiendo del tipo de base de datos
        if tipo_base_datos == "Postgres" or tipo_base_datos == "MySQL":
            
            cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
        elif tipo_base_datos == "SQLServer":
            
            cur.execute("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE';")

        tablas = cur.fetchall()
        
        
        esquema = []
        
        # Obtener detalles de cada tabla (columnas, claves primarias y foráneas)
        for (table_name,) in tablas:
            
            # Obtener columnas
            cur.execute(f"""
                SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = '{table_name}';
            """)
            columnas = cur.fetchall()

            # Obtener la clave primaria
            if tipo_base_datos == "Postgres" or tipo_base_datos == "MySQL":
                cur.execute(f"""
                    SELECT kcu.column_name
                    FROM information_schema.table_constraints tco
                    JOIN information_schema.key_column_usage kcu 
                        ON kcu.constraint_name = tco.constraint_name
                    WHERE tco.constraint_type = 'PRIMARY KEY' AND kcu.table_name = '{table_name}';
                """)
            elif tipo_base_datos == "SQLServer":
                cur.execute(f"""
                    SELECT c.COLUMN_NAME
                    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE c
                    JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                        ON c.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
                    WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY' AND c.TABLE_NAME = '{table_name}';
                """)
            primary_key = [row[0] for row in cur.fetchall()]
            

            # Obtener claves foráneas
            if tipo_base_datos == "Postgres" or tipo_base_datos == "MySQL":
                cur.execute(f"""
                    SELECT kcu.column_name, ccu.table_name AS references_table, ccu.column_name AS references_column
                    FROM information_schema.table_constraints AS tco
                    JOIN information_schema.key_column_usage AS kcu
                        ON tco.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                        ON ccu.constraint_name = tco.constraint_name
                    WHERE tco.constraint_type = 'FOREIGN KEY' AND kcu.table_name = '{table_name}';
                """)
            elif tipo_base_datos == "SQLServer":
                cur.execute(f"""
                    SELECT kcu.COLUMN_NAME, ccu.TABLE_NAME AS references_table, ccu.COLUMN_NAME AS references_column
                    FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc
                    JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
                        ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
                    JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
                        ON ccu.CONSTRAINT_NAME = rc.UNIQUE_CONSTRAINT_NAME
                    WHERE kcu.TABLE_NAME = '{table_name}';
                """)

            foreign_keys = cur.fetchall()
           

            esquema.append({
                'table_name': table_name,
                'columns': [{'column_name': col[0], 'data_type': col[1]} for col in columnas],
                'primary_key': primary_key,
                'foreign_keys': [{'column_name': fk[0], 'references_table': fk[1], 'references_column': fk[2]} for fk in foreign_keys]
            })
        
        cur.close()
        conn.close()

        
        return esquema

    except Exception as e:
        print(f"Error al obtener el esquema de la base de datos: {e}")
        return None
