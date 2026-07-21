const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  const user = await db.user.create({
    data: {
      email: 'admin@mazosindhudurg.com',
      password_hash: hash,
      name: 'Admin',
      role_id: 1, // BigInt in JS can be passed as BigInt(1) or if Prisma supports it, 1
    },
  });
  console.log('Created user:', user);
}

main().catch(console.error).finally(() => db.$disconnect());
