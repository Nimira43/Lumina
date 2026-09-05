import { Spinner } from '@heroui/react'

export default function Loading() {
  return (
    <div className='flex flex-col justufy-center items-center h-full gap-2'>
      <Spinner className='size-10 text-main' />
      <span className='text-foreground/50'>
        Loading...
      </span>
    </div>
  )
}