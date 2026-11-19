'use client'

import { chatSchema, ChatSchema } from '@/lib/chatSchema'
import { Button, InputGroup } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'

export default function ChatForm() {
  const {
    register,
    handleSubmit,
    formState: {
      isValid,
      isSubmitting
    }
  } = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema)
  })

  const onSubmit = (data: ChatSchema) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col items-center gap-2'
    >
      <InputGroup className='w-full py-2'>
        <InputGroup.Input
          aria-label='chat input'
          placeholder='Enter your message...'
          className='w-full'
          {...register('text')}
        />
        <InputGroup.Suffix>
          <Button
            isIconOnly
            type='submit'
            isPending={isSubmitting}
            isDisabled={!isValid}
            className='rounded-full'
          >
            <HiPaperAirplane size={18} />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </form>
  )
}
