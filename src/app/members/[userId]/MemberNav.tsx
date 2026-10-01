'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  userId: string
  sections: {
    segment: string | null,
    name: string,
    path: string
  }[]
}

export default function MemberNav({ userId, sections }: Props) {
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