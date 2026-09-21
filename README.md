# SentinelDoc

### AI-Powered Document Trust & Content Verification System

SentinelDoc is an AI-powered document processing platform that analyzes uploaded documents and evaluates their trustworthiness through a multi-agent pipeline.

The system processes **TXT, PDF, and DOCX** documents and uses specialized AI agents to identify potentially sensitive, harmful, abusive, or suspicious content while producing structured trust scores and violation information.

---

## 🚀 Features

* 🔐 JWT-based authentication
* 👤 User signup and login
* 📄 TXT, PDF, and DOCX document upload
* 🤖 Multi-agent AI processing pipeline
* 🛡️ PII and sensitive-content detection
* ⚠️ Threat and violation detection
* 🌐 Multilingual abusive-content detection
* 📊 Document trust scoring
* 🔎 Chunk-level analysis
* ⚡ Asynchronous/concurrent document processing
* 🔌 Provider-agnostic LLM architecture
* 🐳 Docker support
* 📡 REST API integration

---

## 🧠 How SentinelDoc Works

```text
                    User
                     │
                     ▼
              React Frontend
                     │
                     ▼
              Upload Document
                     │
                     ▼
             FastAPI Backend
                     │
                     ▼
          Document Preprocessing
                     │
                     ▼
             AI Agent Pipeline
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      Agent 1      Agent 2      Agent 3
      Cleaning    Moderation   Trust Score
        │            │            │
        └────────────┼────────────┘
                     ▼
              Analysis Results
                     │
                     ▼
             React Results UI
```

---

## 🤖 Multi-Agent Pipeline

SentinelDoc separates document analysis into specialized processing stages.

### 1. Document Processing Agent

Responsible for preparing uploaded documents for analysis.

* Extracts document content
* Processes supported file formats
* Splits content into manageable chunks
* Prepares content for downstream agents

### 2. Moderation / Safety Agent

Analyzes document content for potentially problematic information.

Detection can include:

* Personally Identifiable Information (PII)
* Threat-related content
* Abusive language
* Other configured policy violations
* Multilingual problematic content

### 3. Trust Analysis Agent

Combines the analysis results to produce structured trust information for the document and its individual chunks.

---

# 🏗️ Architecture

```text
┌─────────────────────────────────────┐
│             React 19 UI             │
│                                     │
│ Login │ Upload │ Dashboard │ Results│
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / REST API
                   ▼
┌─────────────────────────────────────┐
│              FastAPI                │
│                                     │
│ Authentication │ Documents │ Agents │
└───────────────┬───────────┬─────────┘
                │           │
                ▼           ▼
        ┌────────────┐  ┌──────────────┐
        │  MongoDB   │  │  LangChain   │
        │  Database  │  │  LLM Layer   │
        └────────────┘  └──────┬───────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │ Multi-Agent      │
                    │ Processing       │
                    └──────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* React Router
* Tailwind CSS v4
* Axios
* JavaScript

## Backend

* Python
* FastAPI
* Pydantic
* LangChain
* JWT Authentication
* Async Processing

## Database

* MongoDB

## AI

* Large Language Models
* LangChain
* Multi-Agent Processing
* Provider-agnostic LLM integration

## DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

# 📂 Project Structure

```text
SentinelDoc/
│
├── app/                       # Backend application
│   ├── api/                   # API routes
│   ├── agents/                # AI agents
│   ├── models/                # Data models
│   ├── services/              # Business logic
│   └── ...
│
├── src/                       # React frontend
│   ├── api/                   # API communication
│   ├── components/            # Reusable UI components
│   ├── context/               # Authentication state
│   ├── pages/                 # Application pages
│   └── App.jsx                # Application routing
│
├── public/
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── package.json
├── .env.example
└── README.md
```

---

# 🔐 Authentication

SentinelDoc uses **JWT-based authentication**.

### Authentication Flow

```text
User
 │
 ▼
Signup / Login
 │
 ▼
FastAPI Authentication API
 │
 ▼
JWT Access Token
 │
 ▼
Frontend Authentication State
 │
 ▼
Protected API Requests
```

Protected frontend routes prevent unauthenticated users from accessing application functionality.

Axios interceptors are used to handle authenticated API communication.

---

# 📄 Document Processing

Supported document formats include:

```text
TXT
PDF
DOCX
```

After uploading a document:

```text
Upload
  ↓
Content Extraction
  ↓
Chunking
  ↓
AI Analysis
  ↓
Violation Detection
  ↓
Trust Evaluation
  ↓
Results
```

---

# 📊 Results

The frontend provides structured analysis of processed documents.

Results can include:

* Overall trust information
* Chunk-level trust scores
* Detected violations
* Flagged content
* Content-analysis information

This allows users to inspect not only the overall document result but also the individual sections responsible for detected issues.

---

# ⚡ Asynchronous Processing

The backend is designed to support asynchronous document processing.

This allows independent processing tasks to execute concurrently where appropriate, improving the efficiency of the document-analysis pipeline.

---

# 🌐 Frontend

The frontend is built with React 19 and provides:

* Authentication pages
* Protected routes
* Document upload interface
* Dashboard
* Processing interface
* Results visualization
* Responsive design

### Frontend Flow

```text
Login
  ↓
Dashboard
  ↓
Upload Document
  ↓
AI Processing
  ↓
Results
  ↓
Chunk-Level Analysis
```

---

# 🔌 API

The frontend communicates with the FastAPI backend through REST APIs.

The repository also includes:

```text
SENTINEDOC.postman_collection.json
```

which can be used for API testing with Postman.

FastAPI provides interactive API documentation when the backend is running:

```text
http://localhost:8000/docs
```

---

# ⚙️ Environment Setup

Create a local environment file from the provided example:

```bash
cp .env.example .env
```

Configure the required values in `.env`.

Example configuration may include:

```env
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
```

Do **not** commit real credentials, API keys, or secrets to GitHub.

---

# 🚀 Running the Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

The backend must also be running for API functionality.

---

# 🐍 Running the Backend

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

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

Start the FastAPI application using the appropriate application module:

```bash
uvicorn <app_module>:app --reload
```

Then open:

```text
http://localhost:8000/docs
```

> Replace `<app_module>` with the actual module containing the FastAPI `app` instance.

---

# 🐳 Docker

SentinelDoc includes Docker configuration for containerized development.

Build and start the services:

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

# 🧪 API Testing

The project includes a Postman collection:

```text
SENTINEDOC.postman_collection.json
```

You can import this file into Postman to test the backend APIs.

FastAPI Swagger UI is also available at:

```text
http://localhost:8000/docs
```

---

# 🔒 Security Considerations

The project incorporates several security-related mechanisms:

* JWT authentication
* Protected routes
* Password authentication
* Environment-based secrets
* API authentication
* Input validation
* Separation of frontend and backend responsibilities

Production deployments should additionally use secure secret management, HTTPS, appropriate CORS configuration, rate limiting, and other production security controls.

---

# 🔮 Future Improvements

Potential improvements include:

* More advanced document understanding
* Improved trust-scoring methodology
* Additional document formats
* More specialized AI agents
* RAG-based document knowledge retrieval
* Improved multilingual analysis
* Background job processing
* Document history and versioning
* Production deployment
* Automated testing and CI/CD
* More detailed analytics and reporting

---

# 🎯 What This Project Demonstrates

SentinelDoc demonstrates practical experience with:

* Full-stack application development
* React frontend development
* FastAPI backend development
* REST API design
* JWT authentication
* MongoDB
* LangChain
* Multi-agent AI systems
* LLM integration
* Asynchronous processing
* Document processing
* Docker
* API testing
* Git/GitHub

---

# 👨‍💻 Author

**Ayan Mondal**

Master of Computer Applications
National Institute of Technology Kurukshetra

GitHub:
https://github.com/909ayanmondal-stack

LinkedIn:
https://www.linkedin.com/in/ayan-mondal-74360a260

---

# 📄 License

This project is developed for educational, research, and portfolio purposes.
