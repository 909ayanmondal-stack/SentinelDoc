# SentinelDoc — Frontend

A React 19 frontend for SentinelDoc, a document trust-verification tool. Upload a document, run it through AI-based trust scoring, and review flagged content chunk by chunk.

## Features
- JWT-based authentication (signup, login, protected routes)
- Document upload with drag-and-drop
- AI trust scoring pipeline trigger
- Chunk-level results view with trust scores and violation flags
- Responsive, custom design system (IBM Plex Sans/Mono, ink/paper/verified/flag palette)

## Tech Stack
- React 19 + Vite
- React Router (routing, protected routes)
- Tailwind CSS v4
- Axios (with request/response interceptors for JWT handling)

## Getting Started

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

Requires the SentinelDoc backend running separately (FastAPI + MongoDB).

## Project Structure

\`\`\`
src/
├── api/          # Axios instance + API call functions
├── components/   # Reusable UI (Navbar, Button, Input, ProtectedRoute)
├── context/      # Auth context (JWT state)
├── pages/        # Route-level pages (Login, Signup, Dashboard, Upload, Results, NotFound)
└── App.jsx       # Routing setup
\`\`\`
