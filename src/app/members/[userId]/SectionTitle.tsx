'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  sections: {
    segment: string | null,
    name: string,
    path: string
  }[]
}

export default function SectionTitle({sections}: Props) {
  const active = useSelectedLayoutSegment()
  const title = sections.find(x => x.segment === active)?.name ?? ''

  return (
    <h2 className='text-xl font-medium capitalize text-main'>
      {title}
    </h2>
  )
}