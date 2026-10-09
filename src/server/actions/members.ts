'use server'

import { getCurrentUser, requireAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { profileEditSchema, ProfileEditSchema } from '@/lib/profileEditSchema'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

export async function getMembers() {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  try {
    return prisma.member.findMany({
      where: {NOT: {userId: currentUser.id}}
    })
  } catch (error) {
    console.log(error)
  }
}

export const getMemberByUserId = cache(
  (userId: string) => {
    try {
      return prisma.member.findUnique({where: {userId}})
    } catch (error) {
      console.log(error)
    }
  }
)

export async function updateProfile(data: ProfileEditSchema) {
  try {
    const user = await requireAuthUser()
    const validated = profileEditSchema.safeParse(data)

    if (!validated.success) throw new Error('Failed validation.')
    
    const {name, description, city, country} = validated.data

    const member = await prisma.member.update({
      where: { userId: user.id },
      data: {
        name,
        description,
        city,
        country,
        user: {
          update: {name: data.name}
        }
      }
    })

    revalidatePath('/members')
    revalidatePath(`/members/${member.userId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}