import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

from app.models import Base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

def create_tables():
    Base.metadata.create_all(engine)

def test_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT current_database()"))
        print ("Connected to:", result.scalar())