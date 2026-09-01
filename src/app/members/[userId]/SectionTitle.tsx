'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { sections } from './MemberNav'

export default function SectionTitle() {
  const active = useSelectedLayoutSegment()
  const title = sections.find(x => x.segment === active)?.name ?? ''

  return (
    <h2 className='text-xl font-medium capitalize text-main'>
      {title}
    </h2>
  )
}