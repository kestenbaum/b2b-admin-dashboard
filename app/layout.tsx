import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/(dashboard)/_components/toaster";
import { ModalProvider } from "@/app/(dashboard)/_components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TradeMinds B2B Dashboard",
    description: "Enterprise management system",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
            <ModalProvider>
                {children}
            </ModalProvider>
                <Toaster />
            </body>
        </html>
    );
}