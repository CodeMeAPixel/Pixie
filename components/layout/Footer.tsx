"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image"

export function Footer() {
  const { theme } = useTheme();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/docs", label: "Documentation" },
        { href: "/about/#features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/chat", label: "Chat" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/blog", label: "Our Blog" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/legal/terms", label: "Terms of Service" },
        { href: "/legal/privacy", label: "Privacy Policy" },
        { href: "/legal/usage", label: "Usage Policy" },
        { href: "/legal/cookies", label: "Cookie Policy" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://github.com/VirulentChat", icon: Github, label: "GitHub" },
    { href: "https://twitter.com/VirulentChat", icon: Twitter, label: "Twitter" },
    { href: "https://discord.gg/virulent", icon: FaDiscord, label: "Discord" },
  ];

  return (
    <footer className={cn(
      "border-t",
      theme === "dark" ? "bg-background" : "bg-muted/40"
    )}>
      <div className="container px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-lg">Pixie</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced AI chat platform for seamless conversations and intelligent interactions.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Infinity Development. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/status"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Status
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              href="/sitemap"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              href="/changelog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Changelog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
