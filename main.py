from fastapi import FastAPI
from spreadsheet_agent import ChatResponse, ChatRequest
from agent_service import generate_response


app = FastAPI()


#Route to generate chat response
@app.post("/chat", response_model=ChatResponse)
async def complete_chat(chat: ChatRequest):
    return generate_response(chat.message)
