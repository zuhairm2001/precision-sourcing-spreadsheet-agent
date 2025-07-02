import type { Message } from "@/app/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageItem } from "./MessageItem"
import { LoadingIndicator } from "./LoadingIndicator"
import { useEffect, useRef } from "react"

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-full px-6">
      <div className="space-y-4 py-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">Start a conversation by typing a message below</div>
        )}

        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}
