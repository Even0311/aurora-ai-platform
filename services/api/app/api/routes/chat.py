from fastapi import APIRouter, HTTPException
from openai import OpenAI
from app.models.chat import ChatRequest
from app.core.config import settings

router = APIRouter()
_client: OpenAI | None = None


def get_client() -> OpenAI:
    global _client
    if _client is None:
        if not settings.openai_api_key:
            raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
        _client = OpenAI(api_key=settings.openai_api_key)
    return _client


@router.post("/chat")
def chat(payload: ChatRequest):
    client = get_client()

    messages = [{"role": "system", "content": "You are Aurora, a helpful AI assistant."}]
    for msg in payload.history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": payload.message})

    response = client.chat.completions.create(
        model=settings.openai_model,
        messages=messages,
    )

    return {"reply": response.choices[0].message.content}
