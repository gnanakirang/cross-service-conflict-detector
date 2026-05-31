import os
from fastapi import FastAPI
from .api.routes import router
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Cross-Service Conflict Detector - Demo")
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
