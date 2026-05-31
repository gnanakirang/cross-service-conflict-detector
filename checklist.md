
## One-page run checklist

1. **Backend**
   - `cd backend`
   - `python -m venv .venv && source .venv/bin/activate` (Windows: `.\\.venv\\Scripts\\activate`)
   - `pip install -r requirements.txt`
   - Copy `.env.example` → `.env` and fill `MONGODB_URI` and `OPENAI_API_KEY`
   - Load mock data:
     ```bash
     python -c "from app.services.transaction_simulator import load_mock_data; import asyncio; asyncio.run(load_mock_data('app/mock_data/mock_profile_and_transactions.json'))"
     ```
   - Run server:
     ```bash
     python -m app.main
     ```
   - Verify: `http://localhost:8000/docs`

2. **Frontend**
   - `cd frontend`
   - `npm install`
   - Copy `.env.example` → `.env` and set `VITE_API_BASE=http://localhost:8000/api`
   - `npm run dev`
   - Open the Vite URL (usually `http://localhost:5173`)

3. **Demo**
   - Open the frontend, click **Analyze Now** in Conflict view to call `/api/detect/cust_001`.
   - Record two scenarios per `demo-recordings/demo-scenarios.md`.

---

## Next steps I can do for you
- Create a downloadable ZIP of this project (I can paste a script to generate files locally).
- Add an `/api/actions/execute` endpoint to demo assisted actions (with a mock consent flow).
- Provide a short OBS recording script and suggested narration lines for the 2 scenarios.

Tell me which next step you want and I’ll produce the exact files or scripts.