import os
import httpx
import json

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
AI_MODEL = os.getenv("AI_MODEL", "gpt-4o-mini")
OPENAI_URL = "https://api.openai.com/v1/chat/completions"

async def ai_explain_and_recommend(profile, conflicts):
    # Build a concise prompt for the AI
    profile_text = json.dumps(profile, default=str)
    conflicts_text = json.dumps(conflicts, default=str)
    messages = [
        {"role":"system","content":"You are a helpful financial assistant that provides concise explanations and prioritized actions."},
        {"role":"user","content": f"Profile: {profile_text}\nConflicts: {conflicts_text}\nProvide a short explanation and 3 prioritized actions (each 1-2 lines)."}
    ]
    payload = {
        "model": AI_MODEL,
        "messages": messages,
        "max_tokens": 400,
        "temperature": 0.2
    }
    headers = {"Authorization": f"Bearer {OPENAI_KEY}", "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(OPENAI_URL, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()
        # defensive: handle different response shapes
        try:
            return data["choices"][0]["message"]["content"]
        except Exception:
            return str(data)
