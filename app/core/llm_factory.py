# app/core/llm_factory.py

from langchain_openai import ChatOpenAI
from app.core.config import settings

def get_llm():
    if settings.LLM_PROVIDER == "ollama":
        from langchain_community.chat_models import ChatOllama
        return ChatOllama(model="qwen3:8b")
    else:
        return ChatOpenAI(
            model="gpt-4o-mini",
            api_key=settings.OPENAI_API_KEY
        )


llm = get_llm()