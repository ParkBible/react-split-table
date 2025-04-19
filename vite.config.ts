import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env.NODE_ENV": '"production"',
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "ReactSplitTable",
            fileName: "index",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
