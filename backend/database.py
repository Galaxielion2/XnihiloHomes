import pymysql

# Archivo simple para centralizar la conexión con MySQL.
# Datos de conexión para AWS RDS MySQL.
# Si se usa MySQL local, cambiar DB_HOST a "localhost".
DB_HOST = "xnihilo-homes-db.cpusyuq42c2l.us-east-1.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "BDSR2001"
DB_NAME = "xnihilo_homes"


def get_connection():
    """Abre una conexión nueva a MySQL."""
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )
