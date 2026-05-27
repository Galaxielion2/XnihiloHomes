from dotenv import load_dotenv
import os

load_dotenv()

import pymysql

DB_HOST = "xnihilo-homes-db.cpusyuq42c2l.us-east-1.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "z_BDSR2001_z"
DB_NAME = "xnihilo_homes"

def get_db():
    connection = pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

def query_db(query, args=None, one=False):
    args = args or []
    connection = get_db()

    with connection.cursor() as cursor:
        cursor.execute(query, args)
        results = cursor.fetchall()

    connection.close()
    return (results[0] if results else None) if one else results

def execute_db(query, args=None):
    args = args or []
    connection = get_db()

    with connection.cursor() as cursor:
        cursor.execute(query, args)
        connection.commit()
        last_id = cursor.lastrowid

    connection.close()
    return last_id

def init_db():
    # RDS/MySQL already uses mysql_schema.sql imported through MySQL Workbench.
    # No automatic initialization needed here.
    pass