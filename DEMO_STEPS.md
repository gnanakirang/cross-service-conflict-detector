# DEMO_STEPS - VS Code (with GitHub Copilot)

1. Clone repo and open in VS Code.
2. Backend:
   - Open terminal in backend.
   - Create venv and activate.
   - pip install -r requirements.txt
   - Copy .env.example -> .env and fill MONGODB_URI and OPENAI_API_KEY.
   - Load mock data:
     python -c "from app.services.transaction_simulator import load_mock_data; import asyncio; asyncio.run(load_mock_data('app/mock_data/mock_profile_and_transactions.json'))"
   - Run server:
     python -m app.main
   - Confirm swagger at http://localhost:8000/docs

3. Frontend:
   - Open new terminal, cd frontend
   - npm install
   - Copy .env.example -> .env and set VITE_API_BASE=http://localhost:8000/api
   - npm run dev
   - Open the Vite URL

4. Record demo:
   - Use OBS or built-in recorder.
   - Follow demo-scenarios.md

5. Commit & push:
   - git add . && git commit -m "Initial demo" && git push
