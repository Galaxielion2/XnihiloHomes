Xnihilo Homes - Avance II / Proyecto Web

Contenido:
- frontend: páginas HTML, CSS y JS.
- backend: API Flask conectada a MySQL.
- sql: script de base de datos.
- postman: colección para probar endpoints.

Orden recomendado:
1. Abrir MySQL Workbench conectado a AWS RDS y ejecutar sql/mysql_schema.sql.
2. Revisar backend/database.py.
   Este ZIP ya viene configurado para AWS RDS MySQL.
   Host: xnihilo-homes-db.cpusyuq42c2l.us-east-1.rds.amazonaws.com
   Usuario: admin
   Clave usada: BDSR2001
3. Instalar dependencias:
   cd backend
   pip install -r requirements.txt
4. Ejecutar Flask:
   python app.py
5. Abrir frontend/index.html en navegador.
6. Probar endpoints con Postman usando la colección incluida.

Endpoints principales:
GET    /api/products
GET    /api/products/<id>
POST   /api/products
PUT    /api/products/<id>
DELETE /api/products/<id>
POST   /api/login
POST   /api/register
POST   /api/requests

Usuario de prueba:
admin / 1234

Nota para defensa:
El proyecto usa código sencillo y legible. La contraseña no está hasheada porque el objetivo del avance es mostrar conexión a base de datos, endpoints Flask y manipulación CRUD de productos. Para producción real se recomienda hashing.
