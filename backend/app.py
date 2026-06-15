from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database import query_db, execute_db, init_db_from_schema
from pathlib import Path
import hashlib
import base64
import hmac
import secrets

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")
CORS(app)

# ---------- Helpers ----------
def hash_password(password: str, salt: str | None = None, iterations: int = 260000) -> str:
    """
    Creates a secure password hash before storing the password.
    Format: pbkdf2_sha256$iterations$salt$hash

    Important:
    - The original password is never saved.
    - A random salt is generated for every new password.
    - PBKDF2-HMAC-SHA256 is used with many iterations.
    """
    if salt is None:
        salt = secrets.token_urlsafe(16)

    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        iterations
    )

    return f"pbkdf2_sha256${iterations}${salt}${base64.b64encode(digest).decode()}"

def verify_password(password: str, stored_hash: str) -> bool:
    """
    Compares the password entered during login against the saved hash.
    Includes a temporary fallback for old plain-text demo accounts, but all
    newly-created admins are stored hashed through hash_password().
    """
    try:
        algorithm, iterations, salt, expected = stored_hash.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        candidate = hash_password(password, salt, int(iterations))
        return hmac.compare_digest(candidate, stored_hash)
    except Exception:
        # Temporary compatibility fallback only for old demo records.
        # Remove this fallback after confirming all admin passwords are hashed.
        return hmac.compare_digest(password, stored_hash)

def validate_required(data, fields):
    missing = [field for field in fields if str(data.get(field, "")).strip() == ""]
    return missing

def serialize_product_payload(data, existing=None):
    existing = existing or {}
    return {
        "name": data.get("name", existing.get("name", "")).strip(),
        "type": data.get("type", existing.get("type", "")).strip(),
        "category": data.get("category", existing.get("category", "")).strip(),
        "price": float(data.get("price", existing.get("price", 0))),
        "location": data.get("location", existing.get("location", "")).strip(),
        "description": data.get("description", existing.get("description", "")).strip(),
        "image_url": data.get("image_url", existing.get("image_url", "")).strip(),
        "status": data.get("status", existing.get("status", "Active")).strip(),
        "reservation_amount": float(data.get("reservation_amount", existing.get("reservation_amount", 0))),
        "bedrooms": int(float(data.get("bedrooms", existing.get("bedrooms", 0)) or 0)),
        "bathrooms": float(data.get("bathrooms", existing.get("bathrooms", 0)) or 0),
        "area_m2": float(data.get("area_m2", existing.get("area_m2", 0)) or 0),
        "parking_spaces": int(float(data.get("parking_spaces", existing.get("parking_spaces", 0)) or 0)),
        "asset_condition": data.get("asset_condition", existing.get("asset_condition", "Excellent")).strip(),
    }

# ---------- Frontend ----------
@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/<path:filename>")
def frontend_files(filename):
    file_path = FRONTEND_DIR / filename
    if file_path.exists():
        return send_from_directory(FRONTEND_DIR, filename)
    return send_from_directory(FRONTEND_DIR, "index.html")

# ---------- Utility ----------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "project": "Xnihilo Homes", "database": "MySQL"})

@app.route("/api/init-db", methods=["POST"])
def init_db_route():
    # Classroom helper. For production, restrict this route or remove it.
    init_db_from_schema()
    return jsonify({"message": "Database schema executed successfully"})

# ---------- Authentication ----------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    missing = validate_required(data, ["username", "password"])
    if missing:
        return jsonify({"error": "Missing required fields", "fields": missing}), 400

    admin = query_db("SELECT * FROM admins WHERE username=%s AND active=TRUE", [data["username"]], one=True)
    if not admin or not verify_password(data["password"], admin["password_hash"]):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({
        "message": "Login successful",
        "admin": {
            "id": admin["id"],
            "username": admin["username"],
            "email": admin.get("email"),
            "full_name": admin.get("full_name"),
            "role": admin.get("role")
        }
    })

@app.route("/api/admins", methods=["POST"])
def register_admin():
    data = request.get_json() or {}
    missing = validate_required(data, ["username", "password"])
    if missing:
        return jsonify({"error": "Missing required fields", "fields": missing}), 400
    if len(data["password"]) < 6:
        return jsonify({"error": "Password must have at least 6 characters"}), 400
    try:
        admin_id = execute_db(
            """
            INSERT INTO admins (username, email, password_hash, full_name)
            VALUES (%s, %s, %s, %s)
            """,
            [
                data["username"].strip(),
                data.get("email"),
                hash_password(data["password"]),
                data.get("full_name", "Administrador")
            ]
        )
        return jsonify({"message": "Admin created successfully", "id": admin_id}), 201
    except Exception as error:
        return jsonify({"error": "Admin could not be created", "details": str(error)}), 400

# ---------- Products CRUD ----------
@app.route("/api/products", methods=["GET"])
def get_products():
    search = request.args.get("q", "").strip()
    category = request.args.get("category", "").strip()
    ptype = request.args.get("type", "").strip()
    status = request.args.get("status", "").strip()

    query = "SELECT * FROM products WHERE 1=1"
    params = []
    if search:
        query += " AND (name LIKE %s OR description LIKE %s OR location LIKE %s)"
        like = f"%{search}%"
        params.extend([like, like, like])
    if category:
        query += " AND category=%s"
        params.append(category)
    if ptype:
        query += " AND type=%s"
        params.append(ptype)
    if status:
        query += " AND status=%s"
        params.append(status)
    query += " ORDER BY id DESC"

    products = query_db(query, params)
    return jsonify(products)

@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = query_db("SELECT * FROM products WHERE id=%s", [product_id], one=True)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@app.route("/api/products", methods=["POST"])
def create_product():
    data = request.get_json() or {}
    required = ["name", "type", "category", "price", "location", "description", "image_url", "status", "reservation_amount"]
    missing = validate_required(data, required)
    if missing:
        return jsonify({"error": "Missing required fields", "fields": missing}), 400

    product = serialize_product_payload(data)
    product_id = execute_db(
        """
        INSERT INTO products
        (name, type, category, price, location, description, image_url, status, reservation_amount,
         bedrooms, bathrooms, area_m2, parking_spaces, asset_condition)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        [product[k] for k in ["name", "type", "category", "price", "location", "description", "image_url", "status", "reservation_amount", "bedrooms", "bathrooms", "area_m2", "parking_spaces", "asset_condition"]]
    )
    return jsonify(query_db("SELECT * FROM products WHERE id=%s", [product_id], one=True)), 201

@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    existing = query_db("SELECT * FROM products WHERE id=%s", [product_id], one=True)
    if not existing:
        return jsonify({"error": "Product not found"}), 404
    data = request.get_json() or {}
    product = serialize_product_payload(data, existing)
    execute_db(
        """
        UPDATE products
        SET name=%s, type=%s, category=%s, price=%s, location=%s, description=%s,
            image_url=%s, status=%s, reservation_amount=%s, bedrooms=%s, bathrooms=%s,
            area_m2=%s, parking_spaces=%s, asset_condition=%s
        WHERE id=%s
        """,
        [product[k] for k in ["name", "type", "category", "price", "location", "description", "image_url", "status", "reservation_amount", "bedrooms", "bathrooms", "area_m2", "parking_spaces", "asset_condition"]] + [product_id]
    )
    return jsonify(query_db("SELECT * FROM products WHERE id=%s", [product_id], one=True))

@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    existing = query_db("SELECT * FROM products WHERE id=%s", [product_id], one=True)
    if not existing:
        return jsonify({"error": "Product not found"}), 404
    execute_db("DELETE FROM products WHERE id=%s", [product_id])
    return jsonify({"message": "Product deleted successfully", "id": product_id})

# ---------- Requests / Cart checkout ----------
@app.route("/api/requests", methods=["POST"])
def create_request():
    data = request.get_json() or {}
    items = data.get("items", [])
    missing = validate_required(data, ["customer_name", "customer_email"])
    if missing:
        return jsonify({"error": "Missing customer fields", "fields": missing}), 400
    if not items:
        return jsonify({"error": "Request list is empty"}), 400

    total = sum(float(item.get("reservation_amount", 0)) for item in items)
    request_id = execute_db(
        """
        INSERT INTO customer_requests (customer_name, customer_email, customer_phone, notes, total_reservation)
        VALUES (%s, %s, %s, %s, %s)
        """,
        [data["customer_name"], data["customer_email"], data.get("customer_phone"), data.get("notes"), total]
    )

    for item in items:
        execute_db(
            """
            INSERT INTO request_items (request_id, product_id, product_name, reservation_amount)
            VALUES (%s, %s, %s, %s)
            """,
            [request_id, item.get("id"), item.get("name"), float(item.get("reservation_amount", 0))]
        )

    return jsonify({"message": "Request created successfully", "request_id": request_id, "total_reservation": total}), 201

@app.route("/api/requests", methods=["GET"])
def get_requests():
    requests = query_db("SELECT * FROM customer_requests ORDER BY id DESC")
    return jsonify(requests)

@app.route("/api/requests/<int:request_id>", methods=["GET"])
def get_request_detail(request_id):
    request_row = query_db("SELECT * FROM customer_requests WHERE id=%s", [request_id], one=True)
    if not request_row:
        return jsonify({"error": "Request not found"}), 404
    items = query_db("SELECT * FROM request_items WHERE request_id=%s", [request_id])
    request_row["items"] = items
    return jsonify(request_row)

if __name__ == "__main__":
    app.run(debug=True)
