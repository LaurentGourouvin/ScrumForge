import { PrismaClient } from "../../../prisma/generated/prisma/client.ts";
import { execSync } from "child_process";
import { testConfig, getDatabaseUrl } from "../config.ts";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient | null = null;

export async function setupTestDatabase() {
  if (prisma) return prisma;

  console.log("🚀 Setting up test database...");

  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: getDatabaseUrl() }),
    log: testConfig.debug ? ["query", "info", "warn", "error"] : ["error"],
  });

  await waitForDb(prisma);
  await runMigrations();

  console.log("✅ Test database ready");

  return prisma;
}

async function waitForDb(client: PrismaClient, maxRetries = 10): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await client.$queryRaw`SELECT 1`;
      console.log("✅ Database connection established");
      return;
    } catch (error) {
      console.log(`⏳ Waiting for database to be ready... (${i + 1}/${maxRetries})`);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
  throw new Error("❌ Test database not available after max retries");
}

async function runMigrations(): Promise<void> {
  try {
    console.log("🔄 Running migrations on test database...");
    const env = {
      ...process.env,
      DATABASE_URL: getDatabaseUrl(),
    };

    execSync("npx prisma migrate deploy", {
      env,
      stdio: testConfig.debug ? "inherit" : "pipe", // Afficher les logs en mode debug
    });

    console.log("✅ Migrations applied successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

export async function cleanDatabase(client: PrismaClient): Promise<void> {
  if (testConfig.debug) {
    console.log("🔍 [DEBUG] Skipping database cleanup");
    return;
  }

  try {
    const tables = ["AppSettings", "users", "teams", "team_members"];

    if (testConfig.debug) {
      console.log("🧹 Cleaning tables:", tables);
    }

    await client.$executeRawUnsafe("SET session_replication_role = replica;");

    for (const table of tables) {
      await client.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    }

    await client.$executeRawUnsafe("SET session_replication_role = DEFAULT;");

    if (testConfig.debug) {
      console.log("✅ Database cleaned");
    }
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
    throw error;
  }
}
export async function closeTestDatabase(): Promise<void> {
  if (!prisma) {
    return;
  }

  await prisma.$disconnect();
  prisma = null;
  console.log("👋 Test database disconnected");
}

export function getTestPrisma(): PrismaClient {
  if (!prisma) {
    throw new Error("Test database not initialized. Call setupTestDatabase() first.");
  }
  return prisma;
}

export async function resetTestDatabase(): Promise<void> {
  console.log("🔄 Resetting test database...");

  const env = {
    ...process.env,
    DATABASE_URL: getDatabaseUrl(),
  };

  try {
    execSync("npx prisma db push --force-reset --skip-generate", {
      env,
      stdio: testConfig.debug ? "inherit" : "pipe",
    });

    console.log("✅ Test database reset complete");
  } catch (error) {
    console.error("❌ Database reset failed:", error);
    throw error;
  }
}
