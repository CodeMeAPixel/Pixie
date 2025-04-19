"use client"

import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme={undefined}
      themes={["light", "dark", "forest", "ocean", "sunset"]}
    >
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
