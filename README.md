# 🛡️ SentinelDoc — AI-Powered Document Trust & Safety Platform

A full-stack application that lets users upload documents, run them through an AI pipeline, and get back a chunk-level **trust score (0–100)**, flagged violations, and redacted sensitive content — built with a React + FastAPI + LangChain + MongoDB stack.

**Live demo:** _add link if deployed_
**Video walkthrough:** _add link if recorded_

---

## Why this project

Most student projects are CRUD apps. SentinelDoc isn't — it's a real, working AI pipeline: document parsing → chunking → concurrent LLM analysis (PII/threat/abuse detection) → trust scoring → a proper authenticated frontend to review results. It touches auth, async processing, LLM orchestration, and a production-style UI.

---

## Tech Stack

**Frontend:** React 19, Vite, React Router, Tailwind CSS v4, Axios, Context API
**Backend:** FastAPI, LangChain, MongoDB, JWT + bcrypt, Python asyncio
**AI:** OpenAI / Ollama (provider-agnostic), multi-agent pipeline (Cleaner Agent + Guardrail/Scoring Agent)
**DevOps:** Docker, Docker Compose

---

## Key Features

- JWT authentication with protected routes
- Drag-and-drop document upload (PDF / DOCX / TXT)
- Async, concurrent chunk-level AI processing (not sequential)
- PII detection, security-threat detection, abuse detection, redaction
- 0–100 trust scoring with trustworthy/flagged classification
- Interactive results dashboard with filtering
- Swagger/OpenAPI docs + Postman collection included

---

## Architecture

```
React Frontend  ->  FastAPI Backend  ->  Extract + Chunk Document
                                              |
                                     Cleaner Agent (LangChain)
                                              |
                                Guardrail/Scoring Agent -> Trust Score
                                              |
                                          MongoDB
                                              |
                                    Results shown in UI
```

---

## Project Structure

```
SentinelDoc/
├── sentineldoc-frontend/    # React 19 + Vite frontend
│   └── src/{api,components,context,pages}
├── app/                     # FastAPI backend
│   ├── agents/              # Cleaner + Guardrail agents
│   ├── api/                 # auth, upload, score, results
│   ├── core/                # config, LLM factory
│   ├── models/
│   └── services/
├── docker-compose.yml
└── requirements.txt
```

---

## Quick Start

### Backend

```bash
git clone https://github.com/909ayanmondal-stack/SentinelDoc.git
cd SentinelDoc
pip install -r requirements.txt
# create .env with MONGODB_URL, OPENAI_API_KEY, SECRET_KEY etc.
uvicorn app.main:app --reload
```

### Frontend

```bash
cd sentineldoc-frontend
npm install
cp .env.example .env
npm run dev
```

### Or with Docker

```bash
docker compose up --build
```

Backend docs: `http://localhost:8000/docs`

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/upload` | Upload document |
| POST | `/score/{document_id}` | Run trust scoring |
| GET | `/results/{document_id}` | Get scored chunks |

---

---

## Author

**Ayan Mondal** — MCA, NIT Kurukshetra
[GitHub](https://github.com/909ayanmondal-stack) · [LinkedIn](#)
