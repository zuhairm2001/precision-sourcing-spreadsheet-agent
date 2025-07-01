export interface Message {
  id: string
  role: "user" | "system"
  content: string
  timestamp: Date
}

// Backend schema interfaces
export interface ChatRequest {
  message: string
}

export interface ChatResponse {
  message: string
}

export interface ChatHistory {
  user_message: ChatRequest
  user_timestamp: string // ISO string from backend
  agent_message: ChatResponse
  agent_timestamp: string // ISO string from backend
}

export interface ChatHistoryList {
  history: ChatHistory[]
  total_count: number
}
