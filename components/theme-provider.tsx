'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { themes, getTheme, getThemeCSSVariables } from '@/lib/themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
      <ThemeStyles />
    </NextThemesProvider>
  )
}

function ThemeStyles() {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState<string>()

  React.useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  React.useEffect(() => {
    if (!mounted || !theme) return

    const themeData = getTheme(theme)
    if (!themeData) return

    const root = document.documentElement
    const cssVariables = getThemeCSSVariables(themeData)
    root.style.cssText = cssVariables

    if (themeData.backgroundImage) {
      root.style.backgroundImage = themeData.backgroundImage
      root.style.backgroundSize = "cover"
      root.style.backgroundPosition = "center"
      root.style.backgroundAttachment = "fixed"
    }
  }, [mounted, theme])

  if (!mounted) return null

  return null
}
