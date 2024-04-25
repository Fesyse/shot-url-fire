import type { FC, PropsWithChildren } from "react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <>
      <Button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        className={cn(
          "absolute top-4 right-4 bg-transparent w-12 h-12 aspect-square rounded-full border p-2.5",
          {
            "text-white hover:text-black border-white": resolvedTheme == "dark",
            "text-black hover:text-white border-black":
              resolvedTheme == "light",
          }
        )}
      >
        {resolvedTheme === "dark" ? <Moon size={30} /> : <Sun size={30} />}
      </Button>
      {children}
    </>
  )
}

export default Layout
