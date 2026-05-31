from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "conflict_demo")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
