# db_test.py

from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

try:
    conn = engine.connect()
    print("Database Connected Successfully")
    conn.close()
except Exception as e:
    print(e)