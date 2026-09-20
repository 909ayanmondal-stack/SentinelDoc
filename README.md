````markdown
# SentinelDoc

**AI-Powered Document Trust & Verification Platform**

SentinelDoc is an AI-powered document intelligence platform that analyzes uploaded documents and generates a trust score based on detected privacy risks, threats, and policy violations.

The system combines **RAG, LLMs, multi-agent processing, vector search, and automated document analysis** to provide explainable document-level and chunk-level results.

---

## 🚀 Key Features

- 🔐 **JWT Authentication**
  - User signup and login
  - Protected routes
  - Secure token-based authentication

- 📄 **Document Processing**
  - Supports TXT, PDF, and DOCX documents
  - Document upload and validation
  - Automated text extraction and processing

- 🤖 **Multi-Agent AI Pipeline**
  - Document cleaning
  - Content moderation
  - Trust-score generation
  - Specialized AI agents for different analysis tasks

- 🛡️ **Trust & Risk Analysis**
  - Document-level trust score
  - Chunk-level trust scores
  - Violation and risk flags
  - PII and threat detection
  - Multilingual abusive-content detection

- 🔎 **RAG & Semantic Search**
  - Vector embeddings
  - Context-aware retrieval
  - ChromaDB-based semantic search

- ⚡ **Async Processing**
  - Concurrent document processing
  - Efficient backend task execution

- 🖥️ **Modern Frontend**
  - React 19
  - Responsive UI
  - Protected routing
  - Interactive document results

- 🐳 **Containerized Deployment**
  - Docker support
  - Docker Compose configuration
  - Environment-based configuration

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     React 19 UI     │
                    │  Vite + Tailwind    │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                    ┌──────────▼──────────┐
                    │    FastAPI Backend  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Document Agent   Moderation Agent   Trust Agent
              │                │                │
              └────────────────┼────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   RAG / Retrieval   │
                    │   Vector Search     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ MongoDB / ChromaDB  │
                    └─────────────────────┘
````

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router
* Tailwind CSS
* Axios
* JavaScript / JSX

### Backend

* Python
* FastAPI
* LangChain
* LangGraph
* REST APIs
* JWT Authentication
* Async Processing

### AI / GenAI

* Large Language Models (LLMs)
* Retrieval-Augmented Generation (RAG)
* Multi-Agent Systems
* Prompt Engineering
* Vector Embeddings
* Semantic Search

### Databases

* MongoDB
* ChromaDB

### Tools & Deployment

* Docker
* Docker Compose
* Git
* GitHub
* Postman

---

## 📂 Project Structure

```text
SentinelDoc/
│
├── app/                    # Backend application
│
├── src/                    # React frontend
│   ├── api/                # API services
│   ├── components/         # Reusable UI components
│   ├── context/            # Authentication state
│   ├── pages/              # Application pages
│   └── App.jsx             # Application routing
│
├── public/                 # Static frontend assets
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── package.json
├── .env.example
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Python 3.10+
* Node.js 18+
* npm
* MongoDB
* Docker (optional)

---

## 🔧 Backend Setup

Clone the repository:

```bash
git clone https://github.com/909ayanmondal-stack/SentinelDoc.git
cd SentinelDoc
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

### macOS / Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required environment variables in `.env`.

Start the FastAPI backend:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

---

## 💻 Frontend Setup

Open another terminal:

```bash
cd SentinelDoc
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL displayed by Vite, usually:

```text
http://localhost:5173
```

---

## 🐳 Docker Setup

SentinelDoc also includes Docker configuration for containerized execution.

Build and start the services:

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

## 🔄 Application Workflow

```text
User Login / Signup
        ↓
Upload Document
        ↓
Document Validation
        ↓
Text Extraction & Cleaning
        ↓
Multi-Agent Processing
        ↓
Content & Risk Analysis
        ↓
RAG / Vector Retrieval
        ↓
Trust Score Generation
        ↓
Chunk-Level Results
        ↓
User Dashboard
```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
LLM_API_KEY=your_api_key
```

**Never commit real API keys, passwords, JWT secrets, or database credentials to GitHub.**

---

## 🧪 API Testing

The project includes a Postman collection:

```text
SENTINEDOC.postman_collection.json
```

You can import this file into Postman to test the available backend APIs.

---

## 📌 Use Cases

SentinelDoc can be used for:

* Document trust verification
* Privacy and PII detection
* Content moderation
* Risk assessment
* AI-assisted document analysis
* Semantic document search
* Automated document processing

---

## 🔮 Future Improvements

* Cloud deployment
* Advanced document analytics
* Additional document formats
* Improved multilingual analysis
* Real-time processing status
* Advanced evaluation metrics
* More specialized AI agents

---

## 👨‍💻 Author

**Ayan Mondal**

MCA Student
National Institute of Technology Kurukshetra

* GitHub: https://github.com/909ayanmondal-stack
* LinkedIn: [https://www.linkedin.com/in/ayan-mondal-74360a260](https://www.linkedin.com/in/ayan-mondal-74360a260 )

---
