"use client";

import { PostContextProvider } from "@/context/PostContext";
import { ThemeContextProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <PostContextProvider>{children}</PostContextProvider>
    </ThemeContextProvider>
  );
}
