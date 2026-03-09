# Aurora AI Platform

## Install Dependencies

**Backend:**
```bash
cd services/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd apps/web
pnpm install
```

> Don't have pnpm? Install it with: `brew install pnpm`

## Environment Variables

Create `services/api/.env`:
```
OPENAI_API_KEY=sk-...
```

Create `apps/web/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Start Dev Servers

**Terminal 1 — Backend:**
```bash
cd services/api
source .venv/bin/activate
fastapi dev app/main.py
```

**Terminal 2 — Frontend:**
```bash
cd apps/web
pnpm dev
```

Frontend: `http://localhost:3000` — API docs: `http://localhost:8000/docs`
