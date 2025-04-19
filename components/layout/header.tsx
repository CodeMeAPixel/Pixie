"use client";

import { cn } from "@/lib/utils";
import { MessageSquareText, Sparkles, Menu, X, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  className?: string;
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export function Header({ className, isSidebarOpen, onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md",
        "bg-background/80 border-b border-border/20",
        className
      )}
    >
      <div className="flex w-full h-16 items-center px-4 md:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
              <MessageSquareText className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-semibold tracking-tight">Pixie</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="https://github.com/codemeapixel/pixie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/20"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Open Source</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
