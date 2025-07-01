"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { MessageList } from "@/components/chat/MessageList"
import { MessageInput } from "@/components/chat/MessageInput"
import type { Message, ChatHistoryList, ChatHistory } from "@/app/types"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("/get");
        const historyData: ChatHistoryList = await response.json();
        // Transform backend ChatHistory to frontend Message format
        const transformedMessages: Message[] = historyData.history.flatMap((chat: ChatHistory) => [
          {
            id: `user-${chat.user_timestamp}`,
            role: "user" as const,
            content: chat.user_message.message,
            timestamp: new Date(chat.user_timestamp)
          },
          {
            id: `system-${chat.agent_timestamp}`,
            role: "system" as const,
            content: chat.agent_message.message,
            timestamp: new Date(chat.agent_timestamp)
          }
        ]);
        
        setMessages(transformedMessages);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const responseText = await response.json()

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: responseText.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, systemMessage])
    } catch (error) {
      console.error("Error fetching response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = () => {
    // Placeholder for upload functionality
    console.log("Upload button clicked - functionality not implemented yet")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <ChatHeader />
        <CardContent className="flex-1 p-0">
          <MessageList messages={messages} isLoading={isLoading} />
        </CardContent>
        <CardFooter className="flex-shrink-0 p-4 border-t">
          <MessageInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            handleUpload={handleUpload}
            isLoading={isLoading}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
