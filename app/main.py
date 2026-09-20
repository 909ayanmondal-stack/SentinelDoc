from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.mongo_client import check_connection
from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.score import router as score_router
from app.api.results import router as results_router

app = FastAPI(title="SentinelDoc")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(upload_router)
app.include_router(score_router)
app.include_router(results_router)


@app.get("/health")
def health_check():
    db_status = "connected" if check_connection() else "disconnected"
    return {"status": "ok", "db": db_status}