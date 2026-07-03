import asyncio
from fastapi import APIRouter, HTTPException
from app.services.mongo_client import db
from app.agents.cleaner import clean_text
from app.agents.guardrail import score_text

router = APIRouter()

async def process_chunk(chunk):
    cleaned = await clean_text(chunk["original_text"])
    result = await score_text(cleaned)

    trust_score = result["trust_score"]
    chunk_status = "trustworthy" if trust_score >= 80 else "flagged"

    db["chunks"].update_one(
        {"_id": chunk["_id"]},
        {"$set": {
            "cleaned_text": result["redacted_text"],
            "trust_score": trust_score,
            "violations": result["violations"],
            "status": chunk_status
        }}
    )

@router.post("/score/{document_id}")
async def score_document(document_id: str):
    chunks = list(db["chunks"].find({"document_id": document_id, "status": "pending"}))

    if not chunks:
        raise HTTPException(status_code=404, detail="No pending chunks found for this document_id")

    await asyncio.gather(*(process_chunk(chunk) for chunk in chunks))

    db["documents"].update_one(
        {"document_id": document_id},
        {"$set": {"status": "completed"}}
    )

    return {"document_id": document_id, "chunks_processed": len(chunks)}