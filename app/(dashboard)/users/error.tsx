"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function UsersError({error, reset}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Users API Error:", error);
    }, [error]);

    return (
        <div className="flex h-[400px] flex-col items-center justify-center space-y-4 rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Failed to load customers</h2>
                <p className="text-muted-foreground">
                    An error occurred while fetching the client base. The API might be temporarily unavailable.
                </p>
            </div>
            <Button onClick={() => reset()} variant="default">
                Try again
            </Button>
        </div>
    );
}