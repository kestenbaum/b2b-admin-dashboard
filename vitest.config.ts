import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        env: {
            API_BASE_URL: "https://mock-api.local",
        },
        globals: true,
        setupFiles: "./vitest.setup.ts",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
});