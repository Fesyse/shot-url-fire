"use client"

import { useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function Provider({ children, ...props }: ThemeProviderProps) {
  const [client] = useState(new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryClientProvider>
  )
}
