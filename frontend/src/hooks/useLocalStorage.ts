"use client"

import { useState } from "react"

export function useLocalStorage<T = undefined>(
  key: string,
  defaultValue = null
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    }
  })

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn: React.SetStateAction<T>) => {
    let newValue
    if (typeof valueOrFn === "function") {
      // @ts-expect-error
      newValue = valueOrFn(localStorageValue)
    } else {
      newValue = valueOrFn
    }
    localStorage.setItem(key, JSON.stringify(newValue))
    setLocalStorageValue(newValue)
  }
  return [localStorageValue, setLocalStorageStateValue]
}
