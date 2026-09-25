'use client'

import { useTransition, type Key } from 'react'
import { Tabs } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Member } from '../../../generated/prisma/client'
import MemberCard from '../members/MemberCard'

type Props = {
  members: Member[]
  likeIds: string[]
}

const tabs = [
  { id: 'target', label: 'Members I have liked' },
  { id: 'source', label: 'Members that like me' },
  { id: 'mutual', label: 'Mutual Likes' },
]

export default function ListTabs({ members, likeIds }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('type') ?? 'target'
  const [isPending, startTransition] = useTransition()

  function handleTabChange(id: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      params.set('type', id.toString())
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className='flex flex-col mt-10 gap-5 w-full'>
      <Tabs
        selectedKey={currentTab}
        onSelectionChange={id => handleTabChange(id)}
      >
        <Tabs.ListContainer className='w-fit'>
          <Tabs.List
            aria-label='Like tabs'
            className='p-1.5 gap-1'
          >
            {tabs.map(tab => (
              <Tabs.Tab
                key={tab.id}
                id={tab.id}
                className='whitespace-nowrap px-5 py-2 text-muted data-selected:text-white'
              >
                {tab.label}
                <Tabs.Indicator className='bg-accent' />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>

        {tabs.map(tab => (
          <Tabs.Panel
            key={tab.id}
            id={tab.id}
          >
            {members.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'>
                {members.map(member => (
                  <MemberCard
                    key={member.id}
                    likeIds={likeIds}
                    member={member}
                  />
                ))}
              </div>
            ) : (
              <div>No members for this filter.</div>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  )
}