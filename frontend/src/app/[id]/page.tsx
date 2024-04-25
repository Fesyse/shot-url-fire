"use client"

import { urlService } from "@/services/url.service"
import { useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const { data, isError } = useQuery({
    queryKey: ["url"],
    queryFn: () => urlService.getUrl({ uid: params.id }),
  })
  useEffect(() => {
    if (!data || typeof data.data === "string" || isError) return
    else redirect(data.data.url)
  }, [data])
}
