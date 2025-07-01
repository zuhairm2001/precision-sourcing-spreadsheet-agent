import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Send } from "lucide-react"

interface MessageInputProps {
  input: string
  setInput: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  handleUpload: () => void
  isLoading: boolean
}

export function MessageInput({
  input,
  setInput,
  handleSubmit,
  handleUpload,
  isLoading,
}: MessageInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleUpload}
        className="flex-shrink-0 bg-transparent">
        <Upload className="w-4 h-4" />
      </Button>

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading || !input.trim()} className="flex-shrink-0">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  )
}