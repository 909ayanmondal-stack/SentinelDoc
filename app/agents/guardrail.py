from pandas.io import parsers
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from app.core.llm_factory import llm

class GuradrailResult(BaseModel):
    trust_score:int =Field(description="score from 0  to 100")
    violations:list[str]=Field(description="List of detected issues, empty if none")
    redacted_text:str=Field(description="Text with PII/sensitive info masked")

parser=JsonOutputParser(pydantic_object=GuradrailResult)

GUARDRAIL_PROMPT = ChatPromptTemplate.from_template(
    """You are a content safety and PII detection system. Analyze the text below,
which may be in English, Hindi, Bengali, Marathi, or a mix of these languages.

Check for:
1. PII (phone numbers, emails, card numbers, addresses, ID numbers)
2. Security threats (hacking, malware, exploit instructions)
3. Abusive or offensive language (in any language or code-mixed form)
4. Harassment or threatening content

Start at a base score of 100. Deduct points for each violation found.
Mask any PII in redacted_text using [REDACTED].

{format_instructions}

Text:
{text}
"""
)

async def score_text(text: str) -> dict:
    chain = GUARDRAIL_PROMPT | llm | parser
    result = await chain.ainvoke({
        "text": text,
        "format_instructions": parser.get_format_instructions()
    })
    return result

     

