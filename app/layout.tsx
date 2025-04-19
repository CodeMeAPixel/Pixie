import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { ClientWrapper } from "@/components/layout/client-wrapper";
import { cn } from "@/lib/utils";
import { metadata } from "./metadata";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}