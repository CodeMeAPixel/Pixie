"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Moon, Sun, TreePine, Sunset, Waves, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/lib/themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themeIcons = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    forest: <TreePine className="h-4 w-4" />,
    ocean: <Waves className="h-4 w-4" />,
    sunset: <Sunset className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />
  };

  const currentTheme = themes.find(t => t.name === theme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-10 px-3 rounded-lg hover:bg-accent/50"
        >
          <div className="flex items-center gap-2">
            {theme === 'system' && <Monitor className="h-4 w-4" />}
            {theme === 'light' && <Sun className="h-4 w-4" />}
            {theme === 'dark' && <Moon className="h-4 w-4" />}
            {theme === 'forest' && <TreePine className="h-4 w-4" />}
            {theme === 'ocean' && <Waves className="h-4 w-4" />}
            {theme === 'sunset' && <Sunset className="h-4 w-4" />}
            <span className="text-sm font-medium">{currentTheme.label}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 backdrop-blur-lg border-border/20"
      >
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm cursor-pointer transition-colors",
            theme === "system" && "bg-accent/50"
          )}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
            {themeIcons.system}
          </div>
          <span className="flex-1">System</span>
          {theme === "system" && <Check className="h-4 w-4 opacity-70" />}
        </DropdownMenuItem>
        
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm cursor-pointer transition-colors",
              theme === t.name && "bg-accent/50"
            )}
          >
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              t.name === "light" && "bg-white text-black",
              t.name === "dark" && "bg-slate-950 text-white",
              t.name === "forest" && "bg-emerald-900 text-emerald-50",
              t.name === "ocean" && "bg-blue-900 text-blue-50",
              t.name === "sunset" && "bg-amber-700 text-amber-50"
            )}>
              {themeIcons[t.name as keyof typeof themeIcons]}
            </div>
            <span className="flex-1">{t.label}</span>
            {theme === t.name && <Check className="h-4 w-4 opacity-70" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
