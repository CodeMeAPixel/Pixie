"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getTheme } from "@/lib/themes";

export function DynamicThemeStyles() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = getTheme(theme || "light");
  const colors = currentTheme.colors;

  // Set CSS variables for the current theme
  const cssVariables = {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--card": colors.card,
    "--card-foreground": colors.cardForeground,
    "--popover": colors.popover,
    "--popover-foreground": colors.popoverForeground,
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--destructive": colors.destructive,
    "--destructive-foreground": colors.destructiveForeground,
    "--border": colors.border,
    "--input": colors.input,
    "--ring": colors.ring,
  };

  // Set background image if available
  let backgroundStyles = {};
  if (currentTheme.backgroundImage) {
    backgroundStyles = {
      backgroundImage: currentTheme.backgroundImage,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    };
  }

  return (
    <style jsx global>{`
      :root {
        ${Object.entries(cssVariables)
          .map(([key, value]) => `${key}: ${value};`)
          .join("\n")}
      }

      body {
        ${currentTheme.backgroundImage ? `
          background-image: ${currentTheme.backgroundImage};
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        ` : ''}
      }

      /* Add a subtle overlay to improve readability when using background images */
      ${currentTheme.backgroundImage ? `
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: -1;
        }
      ` : ''}
    `}</style>
  );
}
