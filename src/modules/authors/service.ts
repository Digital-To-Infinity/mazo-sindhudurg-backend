import { db } from '@/config/database'

export async function getAllAuthors() {
  const authors = await db.authors.findMany({
    where: {
      status: 'active',
      deleted_at: null
    },
    select: {
      id: true,
      user_id: true,
      name: true,
      slug: true,
      designation: true,
      profile_media_id: true,
      email: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  
  // We can serialize BigInts safely later, but since Prisma returns BigInt, 
  // the backend should have a JSON replacer configured.
  return authors
}
