Xnihilo Homes - Backend Flask

Pasos rápidos:
1. Crear la base de datos ejecutando sql/mysql_schema.sql en MySQL Workbench.
2. Revisar backend/database.py y confirmar usuario, clave y base de datos.
3. Instalar dependencias:
   pip install -r requirements.txt
4. Correr el servidor:
   python app.py
5. Probar en navegador o Postman:
   http://127.0.0.1:5000/api/health
   http://127.0.0.1:5000/api/products

Usuario de prueba:
admin / 1234

Nota: las contraseñas se dejaron sin hashing para mantener el proyecto simple y alineado al nivel de clase. En producción sí deberían hashearse.
