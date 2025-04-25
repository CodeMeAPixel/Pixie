'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={[
        'light',
        'dark',
        'forest',
        'ocean', 
        'sunset',
        'rose',
        'rosepine',
        'github',
        'nord',
        't3',
      ]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
