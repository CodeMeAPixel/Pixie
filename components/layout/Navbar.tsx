"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
// Import TooltipProvider
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, MessageSquare, User, MonitorSmartphone, Receipt, Home, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Navbar() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TooltipProvider>
      {/* Wrap your component with TooltipProvider */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full border-b",
          isScrolled ?
            "bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm" :
            "bg-card/40 backdrop-blur-sm supports-[backdrop-filter]:bg-background/20",
          theme?.id === "dark" ? "border-muted/40" : "border-muted/60"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Rest of your component code */}
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <span className="font-bold text-lg tracking-tight">Pixie</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { href: "/", label: "Home", icon: <Home className="w-4 h-4 mr-1" /> },
                { href: "/about/#features", label: "Features", icon: <MonitorSmartphone className="w-4 h-4 mr-1" /> },
                { href: "/pricing", label: "Pricing", icon: <Receipt className="w-4 h-4 mr-1" /> },
                { href: "/chat", label: "Chat", icon: <MessageSquare className="w-4 h-4 mr-1" /> }
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-medium px-4 py-2 rounded-full text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                  >
                    {item.icon && item.icon}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Theme Toggle and GitHub Link */}
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div whileHover={{ rotate: 5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Link href="https://github.com/VirulentChat" className="flex items-center">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Source Code</p>
                </TooltipContent>
              </Tooltip>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full ml-0.5">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={isSheetOpen ? "close" : "open"}
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isSheetOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className={cn(
                      "w-[80vw] sm:w-[350px] border-l flex flex-col space-y-8 h-full",
                      theme?.id === "dark" ? "bg-background border-muted/40" : "bg-card border-muted/60"
                    )}
                  >
                    <div className="flex items-center mt-6 mb-2">
                      <span className="font-bold">Pixie</span>
                    </div>

                    <div className="px-1 py-2">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-4">NAVIGATION</h3>
                      <nav className="space-y-1">
                        {[
                          { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
                          { href: "/about/#features", label: "Features", icon: <MonitorSmartphone className="h-5 w-5" /> },
                          { href: "/pricing", label: "Pricing", icon: <Receipt className="h-5 w-5" /> },
                          { href: "/chat", label: "Chat", icon: <MessageSquare className="h-5 w-5" /> }
                        ].map((item, i) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center py-3 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                              onClick={() => setIsSheetOpen(false)}
                            >
                              <span className="bg-primary/10 p-2 rounded-md mr-3 text-primary">
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </nav>
                    </div>

                    <div className="px-1 py-2 border-t">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-4 mt-3">ACCOUNT</h3>

                      <div className="mt-auto px-4 pb-8 text-center text-sm text-muted-foreground">
                        <p>© 2024 Pixie. All rights reserved.</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </TooltipProvider>
  );
}
