# Cross-Service Conflict Detector - Demo

Two-shelf demo: FastAPI backend + React frontend. Uses your cloud MongoDB and OpenAI-compatible API.

## Prerequisites
- Python 3.10+
- Node 18+
- MongoDB cloud instance (you already have)
- VS Code (GitHub Copilot optional)

## Quick start
1. Backend
   - cd backend
   - copy `.env.example` to `.env` and fill values
   - python -m venv .venv
   - source .venv/bin/activate   # or .\\.venv\\Scripts\\activate on Windows
   - pip install -r requirements.txt
   - Load mock data:
     python -c "from app.services.transaction_simulator import load_mock_data; import asyncio; asyncio.run(load_mock_data('app/mock_data/mock_profile_and_transactions.json'))"
   - Run server:
     python -m app.main
   - Verify: http://localhost:8000/docs

2. Frontend
   - cd frontend
   - npm install
   - copy `.env.example` to `.env` and set VITE_API_BASE=http://localhost:8000/api
   - npm run dev
   - Open the Vite URL (usually http://localhost:5173)

3. Demo
   - Open the frontend, click Analyze in Conflict view, record scenarios.

## Notes
- API keys and DB credentials must be kept secret.
- The AI client uses OpenAI chat completions endpoint; adapt if using another provider.
