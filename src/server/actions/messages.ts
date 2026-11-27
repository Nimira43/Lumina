'use server'

import { chatSchema, ChatSchema } from '@/lib/chatSchema'
import { ActionResult } from '@/lib/types'
import { Message } from '../../../generated/prisma/client'
import { requireAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

export async function createMessage(recipientUserId: string, data: ChatSchema): Promise<ActionResult<Message>>{
  try {
    const user = await requireAuthUser()
    const validated = chatSchema.safeParse(data)

    if (!validated.success) return {
      status: 'error',
      error: validated.error.issues[0].message
    }

    const { text } = validated.data

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: user.id
      }
    })

    revalidatePath(`/messages/${recipientUserId}/chat`)

    return { status: 'success', data: message }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {status: 'error', error: error.message }
    } else {
      return {status: 'error', error: 'Something went wrong.' }
    }
  }
}