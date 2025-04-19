export type Theme = {
  name: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
  };
  backgroundImage?: string;
};

export const themes: Theme[] = [
  {
    name: "light",
    label: "Light",
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(240 10% 3.9%)",
      primary: "hsl(240 5.9% 10%)",
      secondary: "hsl(240 4.8% 95.9%)",
      accent: "hsl(240 4.8% 95.9%)",
      muted: "hsl(240 4.8% 95.9%)",
      border: "hsl(240 5.9% 90%)",
    },
  },
  {
    name: "dark",
    label: "Dark",
    colors: {
      background: "hsl(240 10% 3.9%)",
      foreground: "hsl(0 0% 98%)",
      primary: "hsl(0 0% 98%)",
      secondary: "hsl(240 3.7% 15.9%)",
      accent: "hsl(240 3.7% 15.9%)",
      muted: "hsl(240 3.7% 15.9%)",
      border: "hsl(240 3.7% 15.9%)",
    },
  },
  {
    name: "forest",
    label: "Forest",
    colors: {
      background: "hsl(142.1 76.2% 36.3%)",
      foreground: "hsl(355.7 100% 97.3%)",
      primary: "hsl(355.7 100% 97.3%)",
      secondary: "hsl(142.4 71.8% 29.2%)",
      accent: "hsl(142.4 71.8% 29.2%)",
      muted: "hsl(142.4 71.8% 29.2%)",
      border: "hsl(142.4 71.8% 29.2%)",
    },
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('/images/forest-bg.jpg')",
  },
  {
    name: "ocean",
    label: "Ocean",
    colors: {
      background: "hsl(221.2 83.2% 53.3%)",
      foreground: "hsl(210 40% 98%)",
      primary: "hsl(210 40% 98%)",
      secondary: "hsl(217.2 32.6% 17.5%)",
      accent: "hsl(217.2 32.6% 17.5%)",
      muted: "hsl(217.2 32.6% 17.5%)",
      border: "hsl(217.2 32.6% 17.5%)",
    },
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('/images/ocean-bg.jpg')",
  },
  {
    name: "sunset",
    label: "Sunset",
    colors: {
      background: "hsl(24.6 95% 53.1%)",
      foreground: "hsl(60 9.1% 97.8%)",
      primary: "hsl(60 9.1% 97.8%)",
      secondary: "hsl(20.5 90.2% 48.2%)",
      accent: "hsl(20.5 90.2% 48.2%)",
      muted: "hsl(20.5 90.2% 48.2%)",
      border: "hsl(20.5 90.2% 48.2%)",
    },
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('/images/sunset-bg.jpg')",
  },
];

export function getTheme(name: string): Theme | undefined {
  return themes.find((theme) => theme.name === name);
}

export function getThemeCSSVariables(theme: Theme): string {
  return `
    --background: ${theme.colors.background};
    --foreground: ${theme.colors.foreground};
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --accent: ${theme.colors.accent};
    --muted: ${theme.colors.muted};
    --border: ${theme.colors.border};
    ${theme.backgroundImage ? `--background-image: ${theme.backgroundImage};` : ''}
  `;
}
