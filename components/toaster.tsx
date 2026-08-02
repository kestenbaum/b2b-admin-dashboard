"use client"

import { X, CheckCircle2 } from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast";

export function Toaster() {
    const { toasts, dismiss } = useToast()

    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none p-4 sm:p-0">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className="pointer-events-auto flex items-start gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-xl transition-all animate-in fade-in slide-in-from-bottom-5"
                >
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                        {t.title && <p className="text-sm font-semibold leading-none">{t.title}</p>}
                        {t.description && (
                            <p className="text-xs text-muted-foreground">{t.description}</p>
                        )}
                    </div>
                    <button
                        onClick={() => dismiss(t.id!)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}