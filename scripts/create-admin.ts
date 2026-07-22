import { db } from '../src/config/database'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q: string) => new Promise<string>((res) => rl.question(q, res))

async function main() {
  console.log('🔑 Create Admin User')
  const email = await ask('Email: ')
  console.log('Admin creation via script is disabled to protect live DB.')
  rl.close()
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
