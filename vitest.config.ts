import {defineConfig} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: "/src/setupTest.ts",
        globals: true,
        coverage: {
            reporter: ["text", "html"],
            include: ["src/components/table/**/*.{ts,tsx}"],
        },
    },
});
