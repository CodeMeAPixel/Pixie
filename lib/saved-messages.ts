import { ChatMessage } from "@/types"

const SAVED_MESSAGES_KEY = "saved_messages"

export function saveMessage(message: ChatMessage) {
  const savedMessages = getSavedMessages()
  savedMessages.push(message)
  localStorage.setItem(SAVED_MESSAGES_KEY, JSON.stringify(savedMessages))
}

export function getSavedMessages(): ChatMessage[] {
  if (typeof window === "undefined") return []
  
  const saved = localStorage.getItem(SAVED_MESSAGES_KEY)
  return saved ? JSON.parse(saved) : []
}

export function removeSavedMessage(messageId: string) {
  const savedMessages = getSavedMessages()
  const filteredMessages = savedMessages.filter(msg => msg.id !== messageId)
  localStorage.setItem(SAVED_MESSAGES_KEY, JSON.stringify(filteredMessages))
}

export function clearSavedMessages() {
  localStorage.removeItem(SAVED_MESSAGES_KEY)
} 