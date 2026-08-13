import { LiaDoveSolid } from 'react-icons/lia'
import { buttonVariants } from '@heroui/styles'
import Link from 'next/link'
import NavLink from './NavLink'
import { getCurrentUser } from '@/lib/auth'
import UserMenu from './UserMenu'

const navLinks = [
  {
    href: '/members',
    label: 'Matches'
  },
  {
    href: '/lists',
    label: 'Lists'
  },
  {
    href: '/messages',
    label: 'Messages'
  },
]

export default async function NavBar() {
  const user = await getCurrentUser()
  
  return (
    <header className='p-3 w-full fixed top-0 z-50 bg-light/85 shadow'>
      <div className='flex justify-between items-center px-10 mx-auto gap-6'>
        <Link
          href='/'
          className='logo text-main text-3xl font-bold flex items-center gap-1'
        >
          <LiaDoveSolid />
          Lumina
        </Link>
        <nav className='flex gap-3 text-lg text-dark'>
          {navLinks.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
            />
          ))}
        </nav>
        <div className='flex items-center gap-3'>
          {user ? (
            <UserMenu
              user={user}
            />
          ) : (
            <>
              <Link
                href='/login'
                className={
                  buttonVariants({
                    variant: 'primary'
                  })
                }
              >
                Login
              </Link>
              <Link
                href='/register'
                className={
                  buttonVariants({
                    variant: 'primary'
                  })
                }
              >
                Register
              </Link>
            </>  
          )}
        </div>
      </div>
    </header>
  )
}