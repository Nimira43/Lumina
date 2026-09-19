import Link from 'next/link'
import { Member } from '../../../generated/prisma/client'
import { Card, CardFooter } from '@heroui/react'
import Image from 'next/image'
import { calculateAge } from '@/lib/utils'
import LikeButton from '@/components/LikeButton'

type Props = {
  member: Member
  likeIds?: string[]
}

export default function MemberCard({ member, likeIds }: Props) {
  const hasLiked = likeIds?.includes(member.userId)

  return (
    <Link href={`/members/${member.userId}`}>
      <Card className='p-0 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
        <Image 
          alt={member.name}
          width={500}
          height={500}
          loading='eager'
          sizes='(max-width: 768px) 100vw, 33vw'
          src={member?.image || '/images/user.png'}
          className='relative aspect-ratio object-cover rounded'
        />
        <div className='absolute top-3 right-3 z-50'>
          <LikeButton
            targetUserId={member.userId}
            hasLiked={hasLiked}
          ></LikeButton>
        </div>
        <CardFooter className='flex w-full justify-start absolute bottom-0 z-10 overflow-hidden bg-linear-to-t from-dark'>
          <div className='flex flex-col text-light p-2'>
            <span className='font-medium'>
              {member.name}, {calculateAge(member.dateOfBirth)}
            </span>
            <span className='text-sm'>
              {member.city}             
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}