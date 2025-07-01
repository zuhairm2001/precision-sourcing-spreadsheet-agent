import type { Message } from "@/app/types"
import { Bot, User } from "lucide-react"

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
        }`}>
        {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : "text-left"}`}>
        <div
          className={`inline-block p-3 rounded-lg ${
            message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
          }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</div>
      </div>
    </div>
  )
}