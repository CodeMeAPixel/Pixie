"use client"

import { useEffect, useState } from "react"
import { ChatMessage } from "@/types"
import { getSavedMessages, removeSavedMessage, clearSavedMessages } from "@/lib/saved-messages"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Download } from "lucide-react"

export default function SavedChatsPage() {
  const [savedMessages, setSavedMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    setSavedMessages(getSavedMessages())
  }, [])

  const handleClearAll = () => {
    clearSavedMessages()
    setSavedMessages([])
    toast({
      title: "Cleared Saved Messages",
      description: "All saved messages have been removed.",
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    removeSavedMessage(messageId)
    setSavedMessages(prev => prev.filter(msg => msg.id !== messageId))
    toast({
      title: "Message Removed",
      description: "The message has been removed from your saved messages.",
    })
  }

  const handleDownloadMessage = (message: ChatMessage) => {
    const blob = new Blob([message.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `saved-message-${message.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-light tracking-tight">Saved Messages</h1>
        {savedMessages.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {savedMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <p className="text-muted-foreground">No saved messages yet.</p>
          <p className="text-sm text-muted-foreground">
            Save messages by clicking the bookmark icon in the chat.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-4 pr-4">
            {savedMessages.map((message) => (
              <div
                key={message.id}
                className="group relative rounded-lg border border-border/10 bg-background/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {message.role === "user" ? "You" : "Assistant"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.timestamp), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownloadMessage(message)}
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMessage(message.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
} 