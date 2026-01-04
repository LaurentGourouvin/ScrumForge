import { Role } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";

export default async function seedUsers() {
  const plainPassword = "password123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const usersData = Array.from({ length: 30 }).map((_, index) => ({
    email: `user${index + 1}@example.com`,
    name: `User ${index + 1}`,
    passwordHash: hashedPassword,
    role: index === 0 ? Role.ADMIN : Role.DEVELOPER,
    isActive: true,
  }));

  await prisma.user.createMany({ data: usersData });

  console.log(`✅ Seed terminé : ${usersData.length} users créés`);
  console.log(`🔑 Mot de passe de test pour tous : "${plainPassword}"`);
}

// main()
//   .catch((e) => {
//     console.error("❌ Erreur pendant le seed :", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
