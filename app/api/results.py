from fastapi import APIRouter, HTTPException
from app.services.mongo_client import db

router = APIRouter()

@router.get("/results/{document_id}")
async def get_results(document_id: str, only_trustworthy: bool = False):
    query = {"document_id": document_id}

    if only_trustworthy:
        query["status"] = "trustworthy"

    chunks = list(db["chunks"].find(query, {"_id": 0}))

    if not chunks:
        raise HTTPException(status_code=404, detail="No results found for this document_id")

    return {
        "document_id": document_id,
        "total_chunks": len(chunks),
        "chunks": chunks
    }