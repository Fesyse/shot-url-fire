"use client"

import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { urlService } from "@/services/url.service"
import { type TUrl } from "@/types/url.type"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  url: z.string().url(),
})

export default function Home() {
  if (typeof window === "undefined") return
  // @ts-expect-error
  const [savedUrls, setSavedUrls] = useLocalStorage<TUrl[]>("savedUrls", [])

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = async ({ url }: z.infer<typeof formSchema>) => {
    const { data } = await urlService.createUid({ url })
    setSavedUrls((prev: TUrl[]) => [...prev, data])
  }

  return (
    <Layout>
      <main className='flex flex-col items-center justify-center gap-6 min-h-screen'>
        <section className='flex items-center flex-col'>
          <h1 className='text-3xl bold'>Shot URL 🔥</h1>
          <h2 className='text-xs opacity-75'>A tool to short your URL's</h2>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-3'
          >
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your long URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Type your long URL here'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Shot 🔥</Button>
          </form>
        </Form>
        <div className='flex flex-col gap-2 items-center'>
          {savedUrls.length > 0 ? (
            <h3 className='text-sm opacity-75'>Your last shorten URL's:</h3>
          ) : (
            <h3 className='text-sm opacity-75'>
              There's will be your last shorten URL's 🔥
            </h3>
          )}
          <ScrollArea className='max-h-[300px] flex flex-col items-center justify-center gap-1'>
            {savedUrls.map(url => (
              <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-2'>
                  <span>Shorten url:</span>
                  <Link className='text-blue-500' href={`/${url.uid}`}>
                    {`${
                      process.env.NEXT_PUBLIC_BASE_URL ?? "localhost:3000"
                    }/` + url.uid}
                  </Link>
                </div>
                <div className='flex gap-2'>
                  <span>Actual url:</span>
                  <Link className='text-blue-500' href={url.url}>
                    {url.url}
                  </Link>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </main>
    </Layout>
  )
}
