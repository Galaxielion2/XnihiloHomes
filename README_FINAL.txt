Xnihilo Homes - Avance II / Proyecto Final

Contenido:
- frontend/: páginas HTML, CSS y JS corregidos.
- backend/: API Flask/Python conectada a MySQL.
- sql/mysql_schema.sql: script de base de datos MySQL.
- postman/: colección para probar endpoints.

Cambios integrados:
- Catálogo dinámico desde /api/products.
- Página de detalle funcional.
- Carrito de solicitudes corregido.
- Login/admin básico.
- Crear, editar y eliminar productos.
- Traducción EN/ES/PT corregida.
- Proxy Netlify en frontend/_redirects.
- Código simple y legible para defensa de clase.

Prueba local:
1. Ejecutar sql/mysql_schema.sql en MySQL Workbench.
2. Revisar backend/database.py con tus datos de conexión.
3. cd backend
4. pip3 install -r requirements.txt
5. python3 app.py
6. Abrir http://127.0.0.1:5000

Login demo:
Usuario: admin
Clave: 1234
