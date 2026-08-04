"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ModalContextType {
    openModal: (content: ReactNode, title?: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>();

    const openModal = (newContent: ReactNode, newTitle?: string) => {
        setContent(newContent);
        setTitle(newTitle);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
        setTitle(undefined);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={closeModal}
                    />

                    <div className="relative z-10 w-full max-w-lg rounded-xl border bg-background shadow-xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 z-20 border-b bg-background p-6 pb-4">
                            <div className="flex items-center justify-between">
                                {title ? (
                                    <h2 className="text-lg font-semibold">{title}</h2>
                                ) : (
                                    <div />
                                )}
                                <button
                                    onClick={closeModal}
                                    className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 pt-4">{content}</div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
