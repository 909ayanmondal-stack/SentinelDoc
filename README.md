# SentinelDoc

An intelligent document safety and trust-scoring pipeline. SentinelDoc ingests documents (TXT, PDF, DOCX), breaks them into chunks, and runs each chunk through a multi-agent LLM pipeline that cleans the text, detects PII/security threats/abusive content, and assigns a trust score — all backed by JWT-secured user authentication.

## Features

- **Multi-format ingestion** — TXT, PDF, and DOCX support
- **Automated chunking** — splits documents into fixed-size, order-preserved chunks
- **3-layer agent pipeline**
  - **Cleaner Agent** — normalizes grammar/formatting without altering meaning
  - **Guardrail & Scoring Agent** — detects PII, security threats, abusive language, and harassment (multilingual/code-mixed content supported); redacts sensitive data and assigns a 0–100 trust score
  - **Persistence Layer** — stores cleaned, redacted results in MongoDB
- **Provider-agnostic LLM layer** — switch between OpenAI and Ollama via a single environment variable, no code changes required
- **JWT-based authentication** — register, login, profile, logout, and password change
- **Async, concurrent scoring** — chunks are processed in parallel for faster throughput
- **Dockerized** — consistent environment from local development to deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | FastAPI |
| LLM Orchestration | LangChain |
| Database | MongoDB Atlas |
| Authentication | JWT (python-jose), Passlib (bcrypt) |
| LLM Providers | OpenAI (gpt-4o-mini) / Ollama (qwen3:8b) |
| File Parsing | PyMuPDF (PDF), python-docx (DOCX) |
| Containerization | Docker, Docker Compose |

## Architecture

```
Client (Swagger / Postman / Frontend)
        │
        ▼
   FastAPI App (Dockerized)
        │
   ┌────┴─────────────────────────────┐
   │                                   │
Auth Routes                     Document Routes
(/auth/*)                    (/upload, /score, /results)
   │                                   │
   ▼                                   ▼
MongoDB: users              MongoDB: documents, chunks
                                       │
                          ┌────────────┴────────────┐
                          ▼                          ▼
                   Cleaner Agent            Guardrail & Scoring Agent
                   (LangChain + LLM)        (LangChain + LLM, structured JSON output)
```

## Project Structure

```
SentineDoc_Project/
├── app/
│   ├── api/
│   │   ├── upload.py       # File upload, extraction, chunking
│   │   ├── score.py        # Agent pipeline orchestration
│   │   ├── results.py      # Retrieve scored results
│   │   └── auth.py         # Register, login, profile, logout
│   ├── agents/
│   │   ├── cleaner.py      # Text normalization agent
│   │   └── guardrail.py    # PII/threat detection & scoring agent
│   ├── services/
│   │   ├── extraction.py   # TXT/PDF/DOCX text extraction
│   │   ├── chunking.py     # Fixed-size chunking logic
│   │   └── mongo_client.py # MongoDB connection
│   ├── models/
│   │   ├── document.py     # Document & chunk schemas
│   │   └── user_model.py   # Auth request schemas
│   └── core/
│       ├── config.py       # Environment-based settings
│       └── llm_factory.py  # Provider-agnostic LLM instantiation
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── .env
```

## Getting Started

### Prerequisites

- Docker Desktop
- A MongoDB Atlas cluster (or local MongoDB instance)
- An OpenAI API key (or a local Ollama installation)

### Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URL=your_mongodb_atlas_connection_string
DB_NAME=sentineldoc_db

OPENAI_API_KEY=your_openai_api_key
LLM_PROVIDER=openai

SECRET_KEY=your_random_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Generate a secure `SECRET_KEY`:
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Run with Docker

```bash
docker compose up --build
```

The API will be available at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Service and database health check |
| POST | `/upload` | Upload a document (TXT/PDF/DOCX), extract and chunk it |
| POST | `/score/{document_id}` | Run the Cleaner + Guardrail pipeline on pending chunks |
| GET | `/results/{document_id}` | Retrieve scored chunks (optional `?only_trustworthy=true` filter) |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate and receive a JWT access token |
| GET | `/auth/profile` | Retrieve the authenticated user's profile |
| POST | `/auth/change-password` | Change the authenticated user's password |
| POST | `/auth/logout` | Log out the authenticated user |

## How It Works

1. **Upload** — a document is uploaded, text is extracted, and split into ~100-word chunks stored in MongoDB with `status: pending`.
2. **Score** — each pending chunk is processed concurrently: the Cleaner Agent normalizes the text, then the Guardrail Agent detects PII/threats/abuse, redacts sensitive content, and assigns a trust score (0–100). Chunks scoring ≥70 are marked `trustworthy`; others are `flagged`. No content is deleted — everything is retained and labeled.
3. **Results** — scored chunks can be retrieved in full, or filtered to only trustworthy content via a query parameter.

## Design Decisions

- **Chunk-level processing** — enables partial failure recovery; if scoring fails mid-document, already-uploaded chunks remain safe and scoring can simply be retried.
- **Separation of concerns** — extraction, chunking, cleaning, scoring, and persistence are isolated into independent modules for testability and maintainability.
- **Provider-agnostic LLM factory** — a single shared LLM instance is used across agents, with the provider (OpenAI/Ollama) switchable via environment configuration alone.
- **Async concurrent scoring** — `asyncio.gather` processes all chunks of a document in parallel rather than sequentially, significantly reducing total processing time.

## Testing

The pipeline was validated using a custom multilingual, code-mixed dataset (English, Hindi, Bengali, Marathi) containing PII, abusive language, and security-threat patterns to verify detection, redaction, and scoring accuracy across languages.

A Postman collection covering all endpoints is included for manual testing.

## Future Enhancements

- React-based frontend for document upload and result visualization
- Role-based access control tying documents to authenticated users
- Deployment to Railway/Render with CI/CD

## Author

Ayan Mondal
NIT Kurukshetra