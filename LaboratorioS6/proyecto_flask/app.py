from flask import Flask
from conexion import ConexionDB

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'TU_PASSWORD'
app.config['MYSQL_DB'] = 'empresa'

db = ConexionDB(
    app.config['MYSQL_HOST'],
    app.config['MYSQL_USER'],
    app.config['MYSQL_PASSWORD'],
    app.config['MYSQL_DB']
)

cursor = db.obtener_cursor()
cursor.execute("SELECT nombre, apellido FROM cliente")

for nombre, apellido in cursor.fetchall():
    print(nombre, apellido)

@app.route("/")
def inicio():
    return "Hola Flask"
EOcat > app.py <<'EOF'
from flask import Flask
from conexion import ConexionDB

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'BDSR2001'
app.config['MYSQL_DB'] = 'empresa'

db = ConexionDB(
    app.config['MYSQL_HOST'],
    app.config['MYSQL_USER'],
    app.config['MYSQL_PASSWORD'],
    app.config['MYSQL_DB']
)

cursor = db.obtener_cursor()
cursor.execute("SELECT nombre, apellido FROM cliente")

for nombre, apellido in cursor.fetchall():
    print(nombre, apellido)

@app.route("/")
def inicio():
    return "Hola Flask"
