"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Download, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import { ChatHistoryItem, clearChatHistory, deleteChatFromHistory, getChatHistory } from "@/lib/chat-history"
import { useToast } from "@/hooks/use-toast"

export default function HistoryPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [history, setHistory] = useState<ChatHistoryItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setHistory(getChatHistory())
  }, [])

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const handleClearHistory = () => {
    clearChatHistory()
    setHistory([])
    toast({
      title: "History cleared",
      description: "All chat history has been removed.",
    })
  }

  const handleDeleteChat = (id: string) => {
    deleteChatFromHistory(id)
    setHistory(history.filter(item => item.id !== id))
    toast({
      title: "Chat deleted",
      description: "The chat has been removed from history.",
    })
  }

  const handleDownloadChat = (chat: ChatHistoryItem) => {
    const content = chat.messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'Assistant'}: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-${chat.date}-${chat.time}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-3xl font-bold">Chat History</h1>
        <p className="text-muted-foreground">
          No chat history available yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chat History</h1>
        <p className="text-muted-foreground">
          Review your past conversations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Past Conversations</CardTitle>
              <CardDescription>
                View your previous chats
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearHistory}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {history.map((chat) => (
                <Card key={chat.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold">Conversation</h3>
                          <p className="text-muted-foreground">
                            {chat.messages.length} messages
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {chat.date} at {chat.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownloadChat(chat)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleItem(chat.id)}
                        >
                          {expandedItems.has(chat.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteChat(chat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {expandedItems.has(chat.id) && (
                      <div className="mt-4 space-y-4">
                        {chat.messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={cn(
                              "p-3 rounded-lg",
                              message.role === "user" 
                                ? "bg-muted" 
                                : "bg-primary/10"
                            )}
                          >
                            <p className="text-sm font-medium mb-1">
                              {message.role === "user" ? "You" : "Assistant"}
                            </p>
                            <p className="text-sm">
                              {message.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
} 