'use client'
 
import { Button, Card } from '@heroui/react'
import { useEffect } from 'react'
import { LiaDoveSolid } from 'react-icons/lia'
 
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col items-center justify-center gap-2 h-[calc(100vh-6rem)]'>
      <Card className='w-2/5 mx-auto shadow py-10'>
        <Card.Header className='flex flex-col items-center justify-center'>
          <div className='flex flex-col gap-2 items-center text-main'>
            <LiaDoveSolid size={60} />
            <h1 className='className=text-3xl font-medium'>
              Server Error
            </h1>
          </div>
        </Card.Header>
        <Card.Content>
          <div className='flex justify-center'>
            {error.message}
          </div>
        </Card.Content>
        <Card.Footer className='flex justify-center'>
          <Button
            onClick={
              () => unstable_retry()
            }
            >
            Try Again
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}