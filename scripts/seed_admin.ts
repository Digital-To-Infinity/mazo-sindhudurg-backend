import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  // const hash = await bcrypt.hash('admin123', 10);
  // const user = await db.user.create({
  //   data: {
  //     email: 'admin@mazosindhudurg.com',
  //     password_hash: hash,
  //     name: 'Admin',
  //     role_id: 1n,
  //   },
  // });
  // console.log('Created user:', user);
  console.log('Seed admin via script is disabled to protect live DB.');
}

main().catch(console.error).finally(() => db.$disconnect());
