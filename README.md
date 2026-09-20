# 🛡️ SentinelDoc

### AI-Powered Document Safety, Moderation & Trust Scoring Platform

SentinelDoc is an intelligent document-processing platform that uses **LLMs, multi-agent processing, and rule-based security checks** to analyze uploaded documents for **PII, security threats, abusive content, and potentially unsafe information**.

The system accepts **PDF, DOCX, and TXT** documents, extracts and chunks their content, processes each chunk through an AI-powered pipeline, redacts sensitive information, and assigns a **0–100 trust score** with an explainable classification.

---

## 🚀 Key Features

* 📄 **Multi-format document processing**

  * PDF
  * DOCX
  * TXT

* 🤖 **Multi-agent AI pipeline**

  * Cleaner Agent
  * Guardrail & Scoring Agent

* 🔐 **Security & privacy analysis**

  * PII detection
  * Sensitive-information redaction
  * Security-threat detection
  * Abusive-language detection
  * Multilingual and code-mixed content support

* 📊 **Trust scoring**

  * Generates a score from **0–100**
  * Classifies content as `trustworthy` or `flagged`

* ⚡ **Asynchronous processing**

  * Processes document chunks concurrently
  * Reduces overall processing time

* 🔑 **JWT authentication**

  * User registration
  * Login
  * Profile
  * Password change
  * Logout

* 🧠 **Provider-agnostic LLM architecture**

  * OpenAI
  * Ollama
  * Switch providers through configuration without changing application logic

* 🗄️ **MongoDB persistence**

  * Stores users, documents, chunks, and analysis results

* 🐳 **Dockerized deployment**

  * Reproducible development environment
  * Easy local deployment

* 🧪 **API testing**

  * Swagger/OpenAPI documentation
  * Postman collection included

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Client         │
                    │ Frontend / Postman   │
                    │ Swagger / API Client  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │    REST API Layer    │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        ┌───────────────┐            ┌────────────────┐
        │ Authentication│            │ Document Upload│
        │     JWT       │            │ & Processing   │
        └───────────────┘            └───────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │ Text Extraction │
                                    │ PDF / DOCX/TXT  │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │    Chunking     │
                                    └────────┬────────┘
                                             │
                              ┌──────────────┴──────────────┐
                              │                             │
                              ▼                             ▼
                    ┌─────────────────┐           ┌──────────────────┐
                    │  Cleaner Agent  │           │ Guardrail Agent  │
                    │                 │           │                  │
                    │ Normalize text  │           │ PII Detection    │
                    │ Preserve meaning│           │ Threat Detection │
                    └────────┬────────┘           │ Abuse Detection  │
                             │                    │ Redaction        │
                             │                    │ Trust Score      │
                             │                    └────────┬─────────┘
                             │                             │
                             └──────────────┬──────────────┘
                                            ▼
                                   ┌─────────────────┐
                                   │     MongoDB     │
                                   │ Documents/Users │
                                   │ Chunks/Results  │
                                   └─────────────────┘
```

---

# 🔄 Processing Workflow

```text
Upload Document
       │
       ▼
Extract Text
       │
       ▼
Split into Chunks
       │
       ▼
Store Pending Chunks
       │
       ▼
Concurrent Processing
       │
       ├───────────────► Cleaner Agent
       │                       │
       │                       ▼
       │                Normalized Text
       │
       ▼
Guardrail & Scoring Agent
       │
       ├──► PII Detection
       ├──► Threat Detection
       ├──► Abuse Detection
       ├──► Sensitive Data Redaction
       └──► Trust Score
                    │
                    ▼
             Classification
          ┌─────────┴─────────┐
          │                   │
       ≥ 70 Score          < 70 Score
          │                   │
          ▼                   ▼
    TRUSTWORTHY             FLAGGED
          │                   │
          └─────────┬─────────┘
                    ▼
                 MongoDB
                    │
                    ▼
                API Results
```

---

# 🧠 AI Processing Pipeline

### 1. Cleaner Agent

The Cleaner Agent normalizes the extracted document text while attempting to preserve its original meaning.

Responsibilities:

* Grammar and formatting normalization
* Text cleanup
* Consistent processing input for downstream analysis

### 2. Guardrail & Scoring Agent

The Guardrail Agent analyzes the cleaned content for potentially unsafe or sensitive information.

It performs:

* PII detection
* Security-threat detection
* Abusive-language detection
* Harassment detection
* Sensitive-data redaction
* Trust-score generation

The result is returned using structured output so the backend can reliably process the AI response.

---

# 📊 Trust Scoring

Each processed chunk receives a score between **0 and 100**.

```text
0 ─────────────────────────────────────────── 100
│                       │
Flagged                 Trustworthy
                       threshold: 70
```

### Classification

| Score  | Classification |
| ------ | -------------- |
| `< 70` | Flagged        |
| `≥ 70` | Trustworthy    |

The system **does not delete the original content**. Instead, content is analyzed, labeled, and stored with its processing results.

---

# 🛠️ Technology Stack

| Layer                | Technology        |
| -------------------- | ----------------- |
| Backend              | FastAPI           |
| Language             | Python            |
| AI/LLM Orchestration | LangChain         |
| LLM Providers        | OpenAI / Ollama   |
| Database             | MongoDB           |
| Authentication       | JWT               |
| Password Security    | bcrypt            |
| PDF Processing       | PyMuPDF           |
| DOCX Processing      | python-docx       |
| API Documentation    | Swagger / OpenAPI |
| API Testing          | Postman           |
| Containerization     | Docker            |
| Orchestration        | Docker Compose    |
| Async Processing     | Python asyncio    |

---

# 📁 Project Structure

```text
SentinelDoc/
│
├── app/
│   ├── agents/
│   │   ├── cleaner.py
│   │   └── guardrail.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── results.py
│   │   ├── score.py
│   │   └── upload.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── llm_factory.py
│   │
│   ├── models/
│   │   ├── document.py
│   │   └── user_model.py
│   │
│   ├── services/
│   │   ├── chunking.py
│   │   ├── extraction.py
│   │   └── mongo_client.py
│   │
│   └── main.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── SENTINEDOC.postman_collection.json
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have:

* Python 3.10+
* Docker Desktop
* MongoDB / MongoDB Atlas
* OpenAI API key **or** Ollama

---

## 1. Clone the Repository

```bash
git clone https://github.com/909ayanmondal-stack/SentinelDoc.git

cd SentinelDoc
```

---

## 2. Configure Environment Variables

Create a `.env` file in the project root.

```env
MONGODB_URL=your_mongodb_connection_string
DB_NAME=sentineldoc_db

LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key

SECRET_KEY=your_secure_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Generate a secure secret key:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

> ⚠️ Never commit `.env` or API keys to GitHub.

---

# 🐳 Run with Docker

Build and start the application:

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:8000
```

Interactive Swagger documentation:

```text
http://localhost:8000/docs
```

---

# 🔌 API Endpoints

## Health

| Method | Endpoint  | Description                       |
| ------ | --------- | --------------------------------- |
| GET    | `/health` | Check service and database health |

## Authentication

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/auth/register`        | Register a user              |
| POST   | `/auth/login`           | Authenticate and receive JWT |
| GET    | `/auth/profile`         | Get authenticated user       |
| POST   | `/auth/change-password` | Change password              |
| POST   | `/auth/logout`          | Logout                       |

## Documents

| Method | Endpoint                 | Description                   |
| ------ | ------------------------ | ----------------------------- |
| POST   | `/upload`                | Upload and process a document |
| POST   | `/score/{document_id}`   | Score pending document chunks |
| GET    | `/results/{document_id}` | Retrieve analysis results     |

Results can optionally be filtered using:

```text
?only_trustworthy=true
```

---

# 🧪 API Testing

A ready-to-use Postman collection is included:

```text
SENTINEDOC.postman_collection.json
```

Import the collection into Postman to test:

* Authentication
* Document upload
* Document scoring
* Results retrieval
* User management

---

# 🔐 Security

SentinelDoc includes several security-oriented components:

* JWT-based authentication
* Password hashing using bcrypt
* Environment-based secret management
* PII detection
* Sensitive information redaction
* Security-threat detection
* Input validation through FastAPI/Pydantic
* Containerized deployment

---

# ⚡ Performance & Scalability

The scoring pipeline uses asynchronous concurrent processing.

Instead of processing chunks sequentially:

```text
Chunk 1 → Chunk 2 → Chunk 3 → Chunk 4
```

SentinelDoc can process multiple chunks concurrently:

```text
             ┌── Chunk 1
             ├── Chunk 2
Document ────┼── Chunk 3
             └── Chunk 4
```

This architecture makes the system better suited for processing larger documents and provides a foundation for future distributed processing.

---

# 🌍 Multilingual Support

The validation dataset includes multilingual and code-mixed content involving:

* English
* Hindi
* Bengali
* Marathi

This allows the system to evaluate safety and moderation behavior beyond English-only documents.

---

# 🎯 Use Cases

SentinelDoc can serve as a foundation for applications such as:

* Enterprise document screening
* AI-assisted document moderation
* Sensitive-data detection
* Compliance workflows
* Document security analysis
* Content trust assessment
* Internal knowledge-base sanitization
* Secure document ingestion pipelines

---

# 🔮 Roadmap

Planned improvements include:

* [ ] React-based production frontend
* [ ] Role-based access control
* [ ] User-specific document isolation
* [ ] Advanced explainable AI reports
* [ ] Improved multilingual safety models
* [ ] Streaming document processing
* [ ] Background task queues
* [ ] Redis-based caching
* [ ] CI/CD pipeline
* [ ] Automated test suite
* [ ] Cloud deployment
* [ ] Monitoring and observability
* [ ] Rate limiting
* [ ] Production-grade audit logging

---

# 📌 Engineering Principles

SentinelDoc follows several software-engineering principles:

### Separation of Concerns

Document extraction, chunking, AI processing, authentication, and persistence are separated into independent modules.

### Provider Independence

The LLM provider can be changed through configuration rather than modifying application logic.

### Fault Isolation

Documents are processed at the chunk level, allowing individual processing failures to be retried without requiring the entire document to be reprocessed.

### API-First Architecture

The backend exposes REST APIs and OpenAPI documentation, allowing multiple clients such as web applications, mobile applications, and external services to consume the system.

---

# 📈 Future Production Direction

SentinelDoc is designed as a foundation that can evolve from a local AI application into a production-grade document safety platform.

A production deployment could introduce:

```text
                  Load Balancer
                       │
              ┌────────┴────────┐
              ▼                 ▼
          API Server        API Server
              │                 │
              └────────┬────────┘
                       ▼
                 Message Queue
                       │
              ┌────────┴────────┐
              ▼                 ▼
        Worker Service     Worker Service
              │                 │
              └────────┬────────┘
                       ▼
                    MongoDB
                       │
                 Monitoring
```

This would allow the platform to scale document-processing workloads independently from the API layer.

---

# 👨‍💻 Author

**Ayan Mondal**
MCA — NIT Kurukshetra

---

# 📄 License

This project is currently intended for educational, research, and development purposes.

---

## ⭐ Project Vision

> **SentinelDoc aims to make document ingestion safer by combining LLM-based understanding with structured guardrails, sensitive-data protection, and transparent trust scoring.**

---
