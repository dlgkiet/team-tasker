import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./resources/frontend/src/"),
            },
        ],
    },
    plugins: [
        laravel({
            input: ["resources/frontend/src/main.tsx"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        port: 5173,
    },
});
