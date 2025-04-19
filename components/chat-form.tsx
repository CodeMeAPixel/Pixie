"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { 
  ArrowUpCircle, 
  Loader2, 
  User, 
  Bot, 
  Bookmark, 
  BookmarkCheck, 
  Cpu, 
  Terminal, 
  Zap,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { saveChatToHistory } from "@/lib/chat-history"
import { saveMessage, removeSavedMessage, getSavedMessages } from "@/lib/saved-messages"
import { toast } from "@/components/ui/use-toast"
import { ChatMessage } from "@/types"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { Components } from "react-markdown"

// AutoResizeTextarea component
const AutoResizeTextarea = ({ 
  value, 
  onChange, 
  onKeyDown, 
  placeholder, 
  className, 
  maxRows = 5 
}: { 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  maxRows?: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxRows * 24);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, maxRows]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
      rows={1}
    />
  );
};

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    "What's your thoughts on the current demographics of the GDP of India?", 
    "Tell me difference between Nextjs V14 and Redux", 
    "Tell me why should I like you?"
  ])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

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
      setIsThinking(false)
    },
    onError: (error) => {
      setIsThinking(false)
      toast({
        title: "System Error",
        description: "Connection failed. Rebooting interface...",
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
      setIsThinking(true)
      handleSubmit(e as unknown as React.FormEvent)
      setShowSuggestions(false)
    } else if (e.key === "Tab") {
      e.preventDefault()
      setShowSuggestions(true)
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
        title: "Memory Purged",
        description: "Message data wiped from local storage.",
      })
    } else {
      saveMessage(message)
      setSavedMessageIds(prev => new Set([...prev, message.id]))
      toast({
        title: "Memory Stored",
        description: "Message data backed up to local storage.",
      })
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion)
    setShowSuggestions(false)
    // Focus the textarea again
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }

  // Generate random circuit paths for background
  const generateCircuitPaths = (count: number) => {
    const paths = []
    for (let i = 0; i < count; i++) {
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      paths.push({
        d: `M${startX},${startY} C${startX + 20},${startY + 30} ${startX - 10},${startY + 60} ${startX + 40},${startY + 80}`,
        delay: i * 0.2,
        duration: 3 + Math.random() * 7,
      })
    }
    return paths
  }

  const circuitPaths = generateCircuitPaths(5)

  return (
    <div className={cn("flex h-full flex-col relative overflow-hidden", className)} {...props}>
      {/* Circuit background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {circuitPaths.map((path, i) => (
            <path
              key={i}
              d={path.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              className="text-primary animate-pulse"
              style={{ animationDelay: `${path.delay}s`, animationDuration: `${path.duration}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
        <div className="space-y-4 px-4 py-8 md:py-12 md:px-8 max-w-[100rem] mx-auto">
          {messages.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
            >
              <div className="relative w-32 h-32 rounded-full bg-background border border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/5 to-background backdrop-blur-lg">
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute inset-0 rounded-full border border-primary/30"
                      style={{ 
                        transform: `scale(${0.85 + i * 0.1})`,
                        opacity: 0.5 - i * 0.1,
                        animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite ${i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
                <Cpu className="h-14 w-14 text-primary drop-shadow-md" />
              </div>

              <div className="space-y-3 max-w-lg">
                <div className="relative">
                  <h2 className="text-3xl font-light tracking-wider text-foreground cyberpunk-text">
                    <span className="text-primary font-medium">Pixie</span>
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  Initialize conversation! Type or press Tab to see suggestions.
                </p>
                <div className="pt-4 flex gap-2 flex-wrap justify-center">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(suggestion)}
                      className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-md text-sm text-primary transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
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
                  "flex items-start gap-3",
                  message.role === "user" 
                    ? "max-w-[90%] md:max-w-[70%] lg:max-w-[60%] ml-auto mr-0" 
                    : "max-w-[90%] md:max-w-[70%] lg:max-w-[60%] ml-0 mr-auto"
                )}>
                  {message.role === "assistant" && (
                    <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-background backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10">
                      <Terminal className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className={cn(
                    "group relative flex-1 rounded-xl px-4 py-3 backdrop-blur-md border",
                    message.role === "user" 
                      ? "bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                      : "bg-gradient-to-br from-background to-background/80 text-foreground border-primary/20 shadow-lg"
                  )}>
                    <div className="absolute -top-2 -left-2 rounded-full px-2 py-0.5 text-xs bg-background border border-primary/30 text-primary">
                      {message.role === "user" ? "USER" : "SYSTEM"}
                    </div>
                    
                    <div className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-0.5",
                      message.role === "user" 
                        ? "bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent" 
                        : "bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    )}></div>
                    
                    <div className="flex items-start justify-between gap-2 pt-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none flex-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
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
                                      className="rounded-md border border-primary/20 shadow-md"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className={cn(className, "bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded")} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              } as Components}
                            >
                              {message.content}
                            </Markdown>
                            <span className="inline-block w-2 h-4 bg-primary animate-[blink_1s_ease-in-out_infinite]" />
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
                                    className="rounded-md border border-primary/20 shadow-md my-3"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={cn(className, "bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded")} {...props}>
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
                              "h-7 w-7 shrink-0 rounded-md border",
                              message.role === "user" 
                                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 border-primary-foreground/30" 
                                : "text-primary hover:text-primary hover:bg-primary/10 border-primary/30"
                            )}
                          >
                            {savedMessageIds.has(message.id) ? (
                              <BookmarkCheck className="h-4 w-4" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedMessageIds.has(message.id) ? "Remove from memory" : "Store in memory"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <div className="absolute top-0 right-0 -mr-1 -mt-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "absolute rounded-full",
                            message.role === "user" 
                              ? "bg-primary-foreground/30" 
                              : "bg-primary/30" 
                          )}
                          style={{ 
                            width: `${4 + i * 2}px`, 
                            height: `${4 + i * 2}px`,
                            top: `${i * -3}px`,
                            right: `${i * -3}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-background border border-primary/40 backdrop-blur-sm shadow-lg shadow-primary/5">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isThinking && messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex mb-6 justify-start"
              >
                <div className="flex items-start gap-3 max-w-[90%] md:max-w-[70%] lg:max-w-[60%] ml-0 mr-auto">
                  <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-background backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10">
                    <Cpu className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="relative flex-1 rounded-xl px-6 py-4 backdrop-blur-md border bg-gradient-to-br from-background to-background/80 text-foreground border-primary/20 shadow-lg">
                    <div className="absolute -top-2 -left-2 rounded-full px-2 py-0.5 text-xs bg-background border border-primary/30 text-primary">
                      PROCESSING
                    </div>
                    <div className="flex items-center gap-3 text-primary/80">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <div className="text-sm">Initializing response...</div>
                    </div>
                    <div className="mt-2 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/50 rounded-full animate-pulse" style={{width: "60%"}}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form
        onSubmit={(e) => {
          setIsThinking(true)
          handleSubmit(e)
          setShowSuggestions(false)
        }}
        className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/95 to-transparent p-4 backdrop-blur-sm md:p-6"
      >
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="flex items-end gap-2 rounded-xl border border-primary/30 bg-background/80 p-3 shadow-lg backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(12)].map((_, i) => (
                    <line 
                      key={i}
                      x1={`${i * 8}%`}
                      y1="0"
                      x2={`${i * 8}%`}
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary"
                      strokeDasharray="1 10"
                    />
                  ))}
                </svg>
              </div>
            
              <div className="relative w-full">
                <AutoResizeTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command... (Press Tab for suggestions)"
                  className="min-h-10 w-full resize-none bg-transparent p-3 text-sm focus-visible:outline-none text-foreground"
                  maxRows={5}
                />
                
                {/* Suggestions dropdown */}
                {showSuggestions && input.length > 0 && (
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-background/95 border border-primary/30 rounded-lg shadow-lg z-50 backdrop-blur-md overflow-hidden">
                    {suggestions
                      .filter(s => s.toLowerCase().includes(input.toLowerCase()))
                      .map((suggestion, i) => (
                        <div
                          key={i}
                          onClick={() => selectSuggestion(suggestion)}
                          className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm border-b border-primary/10 last:border-b-0 text-foreground"
                        >
                          {suggestion}
                        </div>
                      ))
                    }
                    {!suggestions.some(s => s.toLowerCase().includes(input.toLowerCase())) && (
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        No matching suggestions
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || input.trim().length === 0}
                    className={cn(
                      "h-10 w-10 shrink-0 rounded-lg transition-all relative overflow-hidden",
                      input.trim().length === 0 
                        ? "opacity-50 bg-background border border-primary/30" 
                        : "bg-primary hover:bg-primary/90 shadow-lg border border-primary",
                      isLoading && "pointer-events-none"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-primary/20 animate-pulse opacity-50"></div>
                        <Zap className="h-5 w-5" />
                      </>
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
            
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-1/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="px-2 py-0.5 bg-background text-primary text-xs border border-primary/30 rounded-sm flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                {isLoading ? "PROCESSING" : "READY"}
              </div>
            </div>
            
            {/* Helper text for Tab key */}
            <div className="absolute -top-8 right-0 px-2 py-1 bg-background/80 text-primary/70 text-xs border border-primary/20 rounded-sm">
              Press <kbd className="px-1.5 py-0.5 bg-primary/10 border border-primary/30 rounded text-primary mx-1">Tab</kbd> for suggestions
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}