def chunk_text(text:str,chunk_size:int=100)->list[dict]:
    """
    Splits text into fixted-size word chunks, preserving order,
    Returns a list of dicts:{chunk_index,original_text}

    """
    words=text.split()
    chunks=[]

    for i in range(0,len(words),chunk_size):
        chunk_words=words[i:i+chunk_size]
        chunk_text=" ".join(chunk_words)

        chunks.append(
            {
                "chunk_index":i//chunk_size,
                "original_text":chunk_text
            }
        )
    return chunks
        
    