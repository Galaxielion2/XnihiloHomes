import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "xnihilo.db"
SCHEMA_PATH = Path(__file__).resolve().parent / "schema.sql"

def get_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

def query_db(query, args=None, one=False):
    args = args or []
    connection = get_db()
    cursor = connection.execute(query, args)
    rows = cursor.fetchall()
    connection.close()

    results = [dict(row) for row in rows]
    return (results[0] if results else None) if one else results

def execute_db(query, args=None):
    args = args or []
    connection = get_db()
    cursor = connection.execute(query, args)
    connection.commit()
    last_id = cursor.lastrowid
    connection.close()
    return last_id

def init_db():
    connection = get_db()
    with open(SCHEMA_PATH, "r", encoding="utf-8") as file:
        connection.executescript(file.read())
    connection.commit()
    connection.close()
