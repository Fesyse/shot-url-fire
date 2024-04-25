import { cn } from "@/lib/utils"
import { Loader as LucideLoader, LucideProps } from "lucide-react"
import type { FC } from "react"

const Loader: FC<LucideProps> = props => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <LucideLoader
        {...props}
        className={cn("animate-spin", props.className)}
      />
    </div>
  )
}

export default Loader
