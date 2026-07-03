from langchain_core.prompts import ChatPromptTemplate
from app.core.llm_factory import llm

CLEANER_PROMPT = ChatPromptTemplate.from_template(
    """You are a text normalization assistant.

Fix:
- Spelling mistakes
- Grammar errors
- Punctuation
- Spacing issues
- Formatting issues
- Incorrect capitalization (uppercase/lowercase)

Do NOT change facts, numbers, names, or the meaning of the text.
Do NOT add, remove, or invent information.
Do NOT add explanations.
Return ONLY the cleaned text.

Text:
{text}
"""

)
async def clean_text(text: str) -> str:
    chain = CLEANER_PROMPT | llm
    response = await chain.ainvoke({"text": text})
    return response.content.strip()

    