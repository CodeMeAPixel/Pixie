"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon, Loader2, User, Bot, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { saveChatToHistory } from "@/lib/chat-history"
import { saveMessage, removeSavedMessage, getSavedMessages } from "@/lib/saved-messages"
import { toast } from "@/components/ui/use-toast"
import { ChatMessage } from "@/types"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { Components } from "react-markdown"
import type { SyntaxHighlighterProps } from "react-syntax-highlighter"
import type { CSSProperties } from "react"

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onFinish: (message) => {
      // Save to history
      const chatMessages: ChatMessage[] = messages
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
          id: msg.id,
          role: msg.role as "user" | "assistant",
          content: msg.content,
          timestamp: Date.now()
        }))
      saveChatToHistory(chatMessages)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
    },
    body: {
      format: "markdown"
    }
  })

  // Load saved message IDs on mount
  useEffect(() => {
    const savedMessages = getSavedMessages()
    setSavedMessageIds(new Set(savedMessages.map(msg => msg.id)))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const handleSaveMessage = (message: ChatMessage) => {
    const isSaved = savedMessageIds.has(message.id)
    if (isSaved) {
      removeSavedMessage(message.id)
      setSavedMessageIds(prev => {
        const next = new Set(prev)
        next.delete(message.id)
        return next
      })
      toast({
        title: "Message Unsaved",
        description: "Message has been removed from saved messages.",
      })
    } else {
      saveMessage(message)
      setSavedMessageIds(prev => new Set([...prev, message.id]))
      toast({
        title: "Message Saved",
        description: "Message has been saved to your collection.",
      })
    }
  }

  return (
    <div className={cn("flex h-full flex-col", className)} {...props}>
      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
        <div className="space-y-4 px-4 py-8 md:py-12 md:px-8 max-w-[100rem] mx-auto">
          {messages.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
            >
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
                <Bot className="h-12 w-12 text-primary/80" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-light tracking-tight text-foreground">Welcome to the Chat</h2>
                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  Start a conversation by typing your message below. I'm here to help with any questions you might have.
                </p>
              </div>
            </motion.div>
          )}
          
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.05, 
                  ease: "easeOut"
                }}
                className={cn(
                  "flex mb-6",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex items-start gap-2.5",
                  message.role === "user" 
                    ? "max-w-[85%] md:max-w-[65%] lg:max-w-[50%] ml-auto mr-0" 
                    : "max-w-[85%] md:max-w-[65%] lg:max-w-[50%] ml-0 mr-auto"
                )}>
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-muted-foreground/5 to-muted-foreground/0 backdrop-blur-sm">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className={cn(
                    "group relative flex-1 rounded-2xl px-4 py-3 backdrop-blur-sm",
                    message.role === "user" 
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/10" 
                      : "bg-gradient-to-br from-muted/20 to-muted/10 text-foreground shadow-lg shadow-muted-foreground/5"
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none flex-1">
                        {message.role === "assistant" && isLoading && message.id === messages[messages.length - 1].id ? (
                          <>
                            <Markdown
                              components={{
                                code({ node, className, children, ...props }) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return match ? (
                                    <SyntaxHighlighter
                                      style={vscDarkPlus as any}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              } as Components}
                            >
                              {message.content}
                            </Markdown>
                            <span className="inline-block w-2 h-4 bg-foreground animate-[blink_1s_ease-in-out_infinite]" />
                          </>
                        ) : (
                          <Markdown
                            components={{
                              code({ node, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus as any}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              }
                            } as Components}
                          >
                            {message.content}
                          </Markdown>
                        )}
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSaveMessage({
                              id: message.id,
                              role: message.role as "user" | "assistant",
                              content: message.content,
                              timestamp: Date.now()
                            })}
                            className={cn(
                              "h-6 w-6 shrink-0 rounded-full",
                              message.role === "user" 
                                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" 
                                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                            )}
                          >
                            {savedMessageIds.has(message.id) ? (
                              <BookmarkCheck className="h-3.5 w-3.5" />
                            ) : (
                              <Bookmark className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedMessageIds.has(message.id) ? "Unsave message" : "Save message"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-primary/5 to-primary/0 backdrop-blur-sm">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/95 to-transparent p-4 backdrop-blur-sm md:p-6"
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-border/10 bg-background/80 p-3 shadow-lg backdrop-blur-sm">
            <AutoResizeTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-10 w-full resize-none bg-transparent p-3 text-sm focus-visible:outline-none"
              maxRows={5}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || input.trim().length === 0}
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-full transition-all",
                    input.trim().length === 0 
                      ? "opacity-70" 
                      : "bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/10"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
    </div>
  )
}