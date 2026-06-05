# test_env.py

from dotenv import load_dotenv
import os

load_dotenv()

print("API KEY:", os.getenv("OPENAI_API_KEY"))
print("DATABASE:", os.getenv("DATABASE_URL"))
print("SECRET:", os.getenv("SECRET_KEY"))