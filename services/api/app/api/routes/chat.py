from fastapi import APIRouter
from app.models.chat import ChatRequest

router = APIRouter()


@router.post("/chat")
def chat(payload: ChatRequest):
    return {
        "reply": f"You said: {payload.message}"
    }
