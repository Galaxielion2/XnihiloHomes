import os
from pathlib import Path
import pymysql
from pymysql.cursors import DictCursor
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
SCHEMA_PATH = BASE_DIR.parent / "sql" / "mysql_schema.sql"

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "BDSR2001"),
    "database": os.getenv("DB_NAME", "xnihilo_homes"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "cursorclass": DictCursor,
    "autocommit": False,
}

def get_connection(database: bool = True):
    config = DB_CONFIG.copy()
    if not database:
        config.pop("database", None)
    return pymysql.connect(**config)

def query_db(query, args=None, one=False):
    args = args or []
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, args)
            rows = cursor.fetchall()
    return (rows[0] if rows else None) if one else rows

def execute_db(query, args=None):
    args = args or []
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, args)
            connection.commit()
            return cursor.lastrowid

def execute_many(query, rows):
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(query, rows)
            connection.commit()
            return cursor.rowcount

def init_db_from_schema():
    """Optional helper: executes sql/mysql_schema.sql against MySQL."""
    sql = SCHEMA_PATH.read_text(encoding="utf-8")
    statements = [stmt.strip() for stmt in sql.split(";") if stmt.strip()]
    with get_connection(database=False) as connection:
        with connection.cursor() as cursor:
            for statement in statements:
                cursor.execute(statement)
        connection.commit()
