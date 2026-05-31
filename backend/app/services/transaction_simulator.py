import asyncio
import json
from ..db import db
from datetime import datetime

async def load_mock_data(path):
    with open(path) as f:
        data = json.load(f)
    # ensure indexes
    await db.profiles.delete_many({})
    await db.transactions.delete_many({})
    await db.profiles.insert_one(data["profile"])
    # convert date strings to ISODate-like strings (Mongo accepts ISO strings)
    txs = data["transactions"]
    await db.transactions.insert_many(txs)
    print("Mock data loaded.")

async def stream_transactions(customer_id, interval_seconds=3):
    cursor = db.transactions.find({"customer_id": customer_id}).sort("date", 1)
    async for tx in cursor:
        print("Simulated tx:", tx)
        await asyncio.sleep(interval_seconds)
