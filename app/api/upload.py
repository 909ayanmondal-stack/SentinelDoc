# app/api/upload.py

import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile
from app.services import extraction, chunking
from app.services.mongo_client import db

router = APIRouter()

@router.post("/upload")
async def upload_document(file:UploadFile):
    file_bytes = await file.read()
    raw_text = extraction.extract_text(file.filename, file_bytes)

    chunks = chunking.chunk_text(raw_text)
    document_id = str(uuid.uuid4())

    db["documents"].insert_one({
        "document_id": document_id,
        "filename": file.filename,
        "status": "processing",
        "total_chunks": len(chunks),
        "created_at": datetime.utcnow()
    })

    chunk_docs = []
    for chunk in chunks:
        chunk_docs.append({
            "document_id": document_id,
            "chunk_index": chunk["chunk_index"],
            "original_text": chunk["original_text"],
            "cleaned_text": None,
            "trust_score": None,
            "status": "pending"
        })

    db["chunks"].insert_many(chunk_docs)

    return {"document_id": document_id, "total_chunks": len(chunks)}