import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  const roles = await db.roles.findMany();
  console.log(roles);
}
main().catch(console.error).finally(() => db.$disconnect());
