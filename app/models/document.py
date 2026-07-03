from pydantic import BaseModel
from datetime import datetime

class DocumentModel(BaseModel):
    document_id:str
    filename:str
    status:str
    total_chunks:int 
    created_at:datetime

class chunkModel(BaseModel):
    document_id:str
    chunk_index:int
    original_text:str
    cleaned_text:str |None =None
    trust_score :int |None =None
    status:str

    
