from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "conflict_demo")

print(f"MONGO_URI: {MONGO_URI}")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
