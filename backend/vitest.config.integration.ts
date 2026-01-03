import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/integration/**/*.test.ts"],
    exclude: ["tests/**/*.spec.ts"],
    setupFiles: ["tests/integration/setup-env.ts"],
    fileParallelism: false,
  },
});
