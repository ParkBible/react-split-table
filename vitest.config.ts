import {defineConfig} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    test: {
        coverage: {
            reporter: ["text", "html"],
            include: ["src/components/table/**/*.{ts,tsx}"],
        },
    },
});
