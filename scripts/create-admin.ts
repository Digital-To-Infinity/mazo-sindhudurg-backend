import { db } from '../src/config/database'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q: string) => new Promise<string>((res) => rl.question(q, res))

async function main() {
  console.log('🔑 Create Admin User')
  const email = await ask('Email: ')
  const password = await ask('Password (min 8 chars): ')

  if (password.length < 8) {
    console.error('❌ Password too short')
    process.exit(1)
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await db.user.upsert({
    where: { email },
    update: { password: hashed, role: 'ADMIN' },
    create: { email, password: hashed, role: 'ADMIN' },
  })

  console.log(`✅ Admin created: ${user.email}`)
  rl.close()
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
