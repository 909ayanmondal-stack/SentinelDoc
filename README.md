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
