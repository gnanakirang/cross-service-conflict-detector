from fastapi import APIRouter, HTTPException
from ..db import db
from ..services.conflict_detector import detect_conflicts
from ..api.ai_client import ai_explain_and_recommend
from typing import List

router = APIRouter(prefix="/api")


def _serialize(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [_serialize(d) for d in doc]
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


@router.get("/profile/{customer_id}")
async def get_profile(customer_id: str):
    doc = await db.profiles.find_one({"customer_id": customer_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Profile not found")
    return _serialize(doc)

@router.get("/transactions/{customer_id}")
async def get_transactions(customer_id: str, limit: int = 50):
    cursor = db.transactions.find({"customer_id": customer_id}).sort("date", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return _serialize(docs)

@router.post("/detect/{customer_id}")
async def detect(customer_id: str):
    profile = await db.profiles.find_one({"customer_id": customer_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    txs = await db.transactions.find({"customer_id": customer_id}).to_list(length=1000)
    conflicts = detect_conflicts(profile, txs)
    explanation = await ai_explain_and_recommend(profile, conflicts)
    return {"conflicts": conflicts, "explanation": explanation}
