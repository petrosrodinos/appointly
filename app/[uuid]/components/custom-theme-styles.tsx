"use client";

import { AccountTheme } from "@/features/account-themes/interfaces/account-themes.interfaces";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CustomThemeStylesProps {
  theme: AccountTheme | null;
}

export const CustomThemeStyles = ({ theme }: CustomThemeStylesProps) => {
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) return null;

  const isDarkMode = resolvedTheme === "dark" || currentTheme === "dark";

  if (isDarkMode) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root:not(.dark) {
            ${theme.primary ? `--color-primary: ${theme.primary};` : ""}
            ${theme.secondary ? `--color-secondary: ${theme.secondary};` : ""}
            ${theme.background ? `--color-background: ${theme.background};` : ""}
            ${theme.foreground ? `--color-foreground: ${theme.foreground};` : ""}
            ${theme.muted ? `--color-muted: ${theme.muted};` : ""}
            ${theme.accent ? `--color-accent: ${theme.accent};` : ""}
          }
          body {
            ${theme.font_family ? `--font-family: ${theme.font_family};` : ""}
            ${theme.font_size ? `--font-size: ${theme.font_size};` : ""}
            ${theme.line_height ? `--line-height: ${theme.line_height};` : ""}
            ${theme.letter_spacing ? `--letter-spacing: ${theme.letter_spacing};` : ""}
          }
        `,
      }}
    />
  );
};
