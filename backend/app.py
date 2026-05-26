from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database import init_db, get_db, query_db, execute_db
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend"))

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(FRONTEND_DIR, filename)

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "project": "Xnihilo Homes"})

@app.route("/api/products", methods=["GET"])
def get_products():
    products = query_db("SELECT * FROM products ORDER BY id DESC")
    return jsonify(products)

@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = query_db("SELECT * FROM products WHERE id = %s", [product_id], one=True)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@app.route("/api/products", methods=["POST"])
def create_product():
    data = request.get_json() or {}
    required_fields = ["name", "type", "category", "price", "location", "description", "image_url", "status", "reservation_amount"]

    missing = [field for field in required_fields if str(data.get(field, "")).strip() == ""]
    if missing:
        return jsonify({"error": "Missing required fields", "fields": missing}), 400

    product_id = execute_db(
        """
        INSERT INTO products
        (name, type, category, price, location, description, image_url, status, reservation_amount)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        [
            data["name"],
            data["type"],
            data["category"],
            float(data["price"]),
            data["location"],
            data["description"],
            data["image_url"],
            data["status"],
            float(data["reservation_amount"]),
        ],
    )
    product = query_db("SELECT * FROM products WHERE id = %s", [product_id], one=True)
    return jsonify(product), 201

@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json() or {}

    existing = query_db("SELECT * FROM products WHERE id = %s", [product_id], one=True)
    if existing is None:
        return jsonify({"error": "Product not found"}), 404

    execute_db(
        """
        UPDATE products
        SET name = %s, type = %s, category = %s, price = %s, location = %s,
            description = %s, image_url = %s, status = %s, reservation_amount = %s
        WHERE id = %s
        """,
        [
            data.get("name", existing["name"]),
            data.get("type", existing["type"]),
            data.get("category", existing["category"]),
            float(data.get("price", existing["price"])),
            data.get("location", existing["location"]),
            data.get("description", existing["description"]),
            data.get("image_url", existing["image_url"]),
            data.get("status", existing["status"]),
            float(data.get("reservation_amount", existing["reservation_amount"])),
            product_id,
        ],
    )
    product = query_db("SELECT * FROM products WHERE id = %s", [product_id], one=True)
    return jsonify(product)

@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    existing = query_db("SELECT * FROM products WHERE id = %s", [product_id], one=True)
    if existing is None:
        return jsonify({"error": "Product not found"}), 404

    execute_db("DELETE FROM products WHERE id = %s", [product_id])
    return jsonify({"message": "Product deleted successfully"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username", "")
    password = data.get("password", "")

    admin = query_db(
        "SELECT id, username FROM admins WHERE username = %s AND password = %s",
        [username, password],
        one=True,
    )

    if admin is None:
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "admin": admin})

@app.route("/api/requests", methods=["POST"])
def create_request():
    data = request.get_json() or {}
    items = data.get("items", [])

    if not items:
        return jsonify({"error": "Request list is empty"}), 400

    customer_name = data.get("customer_name", "Guest")
    customer_email = data.get("customer_email", "guest@example.com")
    total_reservation = sum(float(item.get("reservation_amount", 0)) for item in items)

    request_id = execute_db(
        """
        INSERT INTO customer_requests (customer_name, customer_email, total_reservation)
        VALUES ( %s, %s, %s)
        """,
        [customer_name, customer_email, total_reservation],
    )

    for item in items:
        execute_db(
            """
            INSERT INTO request_items (request_id, product_id, product_name, reservation_amount)
            VALUES ( %s, %s, %s, %s)
            """,
            [
                request_id,
                item.get("id"),
                item.get("name"),
                float(item.get("reservation_amount", 0)),
            ],
        )

    return jsonify({
        "message": "Request created successfully",
        "request_id": request_id,
        "total_reservation": total_reservation
    }), 201

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
