import { Button } from '@heroui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='p-10'>
      <h1 className='logo text-3xl'>
        Lumina
      </h1>
      <Button>
        <Link href='/members'>
         Members
        </Link>
      </Button>
    </div>
  )
}