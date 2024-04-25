import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import { Provider } from "@/app/provider"
import Layout from "@/components/Layout"

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Shot to URL",
  description: "URL shortener",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
