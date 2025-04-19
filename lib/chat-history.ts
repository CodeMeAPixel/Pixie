import { ChatMessage } from "@/types"

export interface ChatHistoryItem {
  id: string
  messages: ChatMessage[]
  timestamp: number
}

const CHAT_HISTORY_KEY = "chat_history"

export function saveChatToHistory(messages: ChatMessage[]) {
  if (messages.length === 0) return

  const chatItem: ChatHistoryItem = {
    id: crypto.randomUUID(),
    messages,
    timestamp: Date.now()
  }

  const history = getChatHistory()
  history.unshift(chatItem)
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history))
}

export function getChatHistory(): ChatHistoryItem[] {
  if (typeof window === "undefined") return []
  
  const history = localStorage.getItem(CHAT_HISTORY_KEY)
  return history ? JSON.parse(history) : []
}

export function clearChatHistory() {
  localStorage.removeItem(CHAT_HISTORY_KEY)
}

export function deleteChatFromHistory(id: string) {
  const history = getChatHistory()
  const filteredHistory = history.filter(chat => chat.id !== id)
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(filteredHistory))
} 