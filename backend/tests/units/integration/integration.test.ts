// tests/integration/config.test.ts

import { describe, it, expect } from "vitest";
import { testConfig, getDatabaseUrl } from "../../integration/config";

describe("Test Integration Config", () => {
  it("should have correct database config", () => {
    expect(testConfig.database.host).toBe("localhost");
    expect(testConfig.database.port).toBe(5441);
    expect(testConfig.database.dbname).toBe("scrumforge_test");
  });

  it("should generate correct database URL", () => {
    const url = getDatabaseUrl();
    expect(url).toBe("postgresql://scrumforge_test:scrumforge_test@localhost:5441/scrumforge_test?schema=public");
  });

  it("should have debug mode disabled by default", () => {
    expect(testConfig.debug).toBe(false);
  });
});
