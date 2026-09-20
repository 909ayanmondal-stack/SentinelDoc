# app/services/extraction.py
import fitz  # PyMuPDF
import docx
import io

def extract_text_from_txt(file_bytes: bytes) -> str:
    """
    Decodes raw bytes from an uploaded .txt file into a plain string.
    """
    try:
        text = file_bytes.decode("utf-8")
    except UnicodeDecodeError:
       
        text = file_bytes.decode("latin-1")

    return text.strip()

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts plain text from a PDF using PyMuPDF (fitz).
    Preserves page breaks with double newlines.
    """
    text=""
    pdf=fitz.open(stream=file_bytes,filetype="pdf")
    for page in pdf:
        text+=page.get_text()
    pdf.close()
    return text.strip()

def extract_text_from_docx(file_bytes:bytes)->str:
    """
    Extracts plain text from .docx file from bytes  
        
    """
    doc = docx.Document(io.BytesIO(file_bytes))
    text="\n".join(para.text for para in doc.paragraphs)
    return text.strip()

def extract_text(filename: str, file_bytes: bytes) -> str:
    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    elif filename.endswith(".docx"):
        return extract_text_from_docx(file_bytes)
    elif filename.endswith(".txt"):
        return extract_text_from_txt(file_bytes)
    else:
        raise ValueError("Unsupported file type")

    