from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_connection

app = Flask(__name__)
CORS(app)

# Ruta de prueba para saber si Flask está corriendo.
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "project": "Xnihilo Homes"})


# -------------------- PRODUCTOS --------------------
@app.route("/api/products", methods=["GET"])
def get_products():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM products ORDER BY id DESC")
    products = cursor.fetchall()
    connection.close()
    return jsonify(products)


@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cursor.fetchone()
    connection.close()

    if product is None:
        return jsonify({"error": "Producto no encontrado"}), 404

    return jsonify(product)


@app.route("/api/products", methods=["POST"])
def create_product():
    data = request.get_json()

    # Validación básica para evitar guardar registros incompletos.
    required = ["name", "type", "category", "price", "location", "description", "image_url", "status", "reservation_amount"]
    for field in required:
        if field not in data or str(data[field]).strip() == "":
            return jsonify({"error": f"Falta el campo: {field}"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO products
        (name, type, category, price, location, description, image_url, status, reservation_amount)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        data["name"], data["type"], data["category"], data["price"],
        data["location"], data["description"], data["image_url"],
        data["status"], data["reservation_amount"]
    ))
    connection.commit()
    new_id = cursor.lastrowid
    connection.close()

    return jsonify({"message": "Producto creado", "id": new_id}), 201


@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    existing = cursor.fetchone()

    if existing is None:
        connection.close()
        return jsonify({"error": "Producto no encontrado"}), 404

    cursor.execute("""
        UPDATE products
        SET name=%s, type=%s, category=%s, price=%s, location=%s,
            description=%s, image_url=%s, status=%s, reservation_amount=%s
        WHERE id=%s
    """, (
        data.get("name", existing["name"]),
        data.get("type", existing["type"]),
        data.get("category", existing["category"]),
        data.get("price", existing["price"]),
        data.get("location", existing["location"]),
        data.get("description", existing["description"]),
        data.get("image_url", existing["image_url"]),
        data.get("status", existing["status"]),
        data.get("reservation_amount", existing["reservation_amount"]),
        product_id
    ))
    connection.commit()
    connection.close()

    return jsonify({"message": "Producto actualizado"})


@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM products WHERE id = %s", (product_id,))
    connection.commit()
    connection.close()
    return jsonify({"message": "Producto eliminado"})


# -------------------- LOGIN ADMIN --------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username", "")
    password = data.get("password", "")

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT id, username FROM admins WHERE username=%s AND password=%s", (username, password))
    admin = cursor.fetchone()
    connection.close()

    if admin is None:
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    return jsonify({"message": "Login correcto", "admin": admin})


@app.route("/api/register", methods=["POST"])
def register_admin():
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if username == "" or password == "":
        return jsonify({"error": "Usuario y contraseña son requeridos"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO admins (username, password) VALUES (%s, %s)", (username, password))
    connection.commit()
    connection.close()

    return jsonify({"message": "Administrador registrado"}), 201


# -------------------- SOLICITUDES / CARRITO --------------------
@app.route("/api/requests", methods=["POST"])
def create_request():
    data = request.get_json()
    items = data.get("items", [])

    if len(items) == 0:
        return jsonify({"error": "El carrito está vacío"}), 400

    customer_name = data.get("customer_name", "Cliente")
    customer_email = data.get("customer_email", "cliente@email.com")
    total = sum(float(item.get("reservation_amount", 0)) for item in items)

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO customer_requests (customer_name, customer_email, total_reservation)
        VALUES (%s, %s, %s)
    """, (customer_name, customer_email, total))
    request_id = cursor.lastrowid

    for item in items:
        cursor.execute("""
            INSERT INTO request_items (request_id, product_id, product_name, reservation_amount)
            VALUES (%s, %s, %s, %s)
        """, (request_id, item["id"], item["name"], item.get("reservation_amount", 0)))

    connection.commit()
    connection.close()

    return jsonify({"message": "Solicitud guardada", "request_id": request_id, "total": total}), 201


if __name__ == "__main__":
    app.run(debug=True)
