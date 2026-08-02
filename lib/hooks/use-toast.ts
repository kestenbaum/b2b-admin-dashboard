"use client"

import { useState, useEffect } from "react"

export interface ToastOptions {
    id?: string
    title?: string
    description?: string
    variant?: "default" | "destructive" | "success"
}

let listeners: ((toasts: ToastOptions[]) => void)[] = []
let memoryToasts: ToastOptions[] = []

export function toast(options: Omit<ToastOptions, "id">) {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...options }
    memoryToasts = [...memoryToasts, newToast]
    listeners.forEach((listener) => listener(memoryToasts))

    setTimeout(() => {
        memoryToasts = memoryToasts.filter((t) => t.id !== id)
        listeners.forEach((listener) => listener(memoryToasts))
    }, 3000)
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastOptions[]>(memoryToasts)

    useEffect(() => {
        listeners.push(setToasts)
        return () => {
            listeners = listeners.filter((l) => l !== setToasts)
        }
    }, [])

    return {
        toasts,
        toast,
        dismiss: (id: string) => {
            memoryToasts = memoryToasts.filter((t) => t.id !== id)
            listeners.forEach((listener) => listener(memoryToasts))
        },
    }
}