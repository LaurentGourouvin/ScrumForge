import seedUsers from "./seed.users";
import seedAdmin from "./seed.admin";
import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.user.deleteMany();
  await seedUsers();
  await seedAdmin(); // Need to create your own admin seed.admin.ts
}

main();
