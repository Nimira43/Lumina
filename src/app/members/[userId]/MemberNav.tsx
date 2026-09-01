'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const sections = [
  {name: 'Profile', path: '', segment: null},
  {name: 'Photo', path: '/photos', segment: 'photos'},
  {name: 'Chat', path: '/chat', segment: 'chat'},
]

export default function MemberNav({userId}: {userId: string}) {
  const active = useSelectedLayoutSegment()
  const base = `/members/${userId}`

  return (
    <nav className='flex flex-col p-4 ml-4 text-xl gap-2'>
      {sections.map(({ name, path, segment }) => (
        <Link
          key={name}
          href={`${base}${path}`}
          className={`block rounded ${active === segment ? 'text-main' : 'hover:text-main/50'}`}
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}