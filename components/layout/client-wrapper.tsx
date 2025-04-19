"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header 
        isSidebarOpen={isSidebarOpen}
        onMenuClick={toggleSidebar} 
      />
      
      <div className="flex flex-1">
        <div className={cn(
          "fixed md:sticky top-16 z-40",
          isMobile ? "w-0" : "w-60"
        )}>
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        </div>
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          isMobile ? "w-full" : "w-[calc(100%-240px)]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
} 