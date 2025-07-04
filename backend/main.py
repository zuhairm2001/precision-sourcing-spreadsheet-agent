from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from schemas.chat_schemas import ChatHistoryList, ChatRequest, ChatResponse 
from service.agent_service import generate_response, get_chat_history
import os


app = FastAPI()

origins = [
        "http://localhost:3000"
        ]


app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )


#Route to generate chat response
@app.post("/chat", response_model=ChatResponse)
async def complete_chat(chat: ChatRequest):
    return generate_response(chat.message)

#Route to get chat history
@app.get("/get", response_model=ChatHistoryList)
async def return_chat_history():
    return get_chat_history()

# Mount static files (frontend) if directory exists
if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static") 
