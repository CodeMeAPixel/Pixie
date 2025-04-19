"use client"

import { cn } from "@/lib/utils"
import React, { useRef, useEffect, type TextareaHTMLAttributes } from "react"

interface AutoResizeTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  maxRows?: number
}

export function AutoResizeTextarea({ 
  className, 
  value, 
  onChange, 
  maxRows = 5, 
  ...props 
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const handleResize = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    // Reset height to calculate actual scroll height
    textarea.style.height = 'auto'
    
    // Calculate required height based on content
    const newHeight = Math.min(
      textarea.scrollHeight,
      // Approximate line height * max rows
      24 * maxRows
    )
    
    textarea.style.height = `${newHeight}px`
  }
  
  useEffect(() => {
    handleResize()
  }, [value])
  
  return (
    <textarea
      ref={textareaRef}
      className={cn(
        "resize-none overflow-y-auto transition-all duration-200",
        className
      )}
      value={value}
      onChange={(e) => {
        onChange(e)
        handleResize()
      }}
      {...props}
    />
  )
}
