from datetime import datetime
from pydantic import BaseModel
from typing import List


class ChatResponse(BaseModel):
    message: str


class ChatRequest(BaseModel):
    message: str

class ChatHistory(BaseModel):
    user_message: ChatRequest
    user_timestamp: str  # Store as string to match database format
    agent_message: ChatResponse
    agent_timestamp: str  # Store as string to match database format

class ChatHistoryList(BaseModel):
    history: List[ChatHistory]
    total_count: int
