import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { 
  MessageSquareText, 
  Settings, 
  History, 
  Bookmark, 
  HelpCircle,
  X
} from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ className, isOpen, onClose }: SidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <>
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? "240px" : "0px",
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed md:sticky left-0 top-16 z-40 h-[calc(100vh-64px)] overflow-hidden",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "border-r border-border/10",
          className
        )}
      >
        <div className="flex h-full w-[240px] flex-col">
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="flex flex-col gap-1">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === "/" && "bg-accent"
                  )}
                >
                  <MessageSquareText className="h-5 w-5" />
                  <span>Chat with Pixie</span>
                </Button>
              </Link>
              
              <Link href="/history">
                <Button
                  variant={pathname === "/history" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === "/history" && "bg-accent"
                  )}
                >
                  <History className="h-5 w-5" />
                  <span>Chat History</span>
                </Button>
              </Link>
              
              <Link href="/saved">
                <Button
                  variant={pathname === "/saved" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === "/saved" && "bg-accent"
                  )}
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Saved Messages</span>
                </Button>
              </Link>
            </nav>
          </div>

          <div className="border-t border-border/10 p-2">
            <div className="flex flex-col gap-1">
              <Link href="/help">
                <Button
                  variant={pathname === "/help" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === "/help" && "bg-accent"
                  )}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help & FAQ</span>
                </Button>
              </Link>
              
              <Link href="/settings">
                <Button
                  variant={pathname === "/settings" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === "/settings" && "bg-accent"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
              </Link>

              <div className="mt-2">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
          )}
        </AnimatePresence>
      )}
    </>
  );
} 