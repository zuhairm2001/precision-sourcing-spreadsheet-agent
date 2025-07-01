import { CardHeader, CardTitle } from "@/components/ui/card"
import { Bot } from "lucide-react"

export function ChatHeader() {
  return (
    <CardHeader className="flex-shrink-0">
      <CardTitle className="flex items-center gap-2">
        <Bot className="w-5 h-5" />
        Chat Interface
      </CardTitle>
    </CardHeader>
  )
}