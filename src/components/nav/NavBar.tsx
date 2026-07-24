import { LiaDoveSolid } from 'react-icons/lia'
import { buttonVariants } from '@heroui/styles'
import Link from 'next/link'

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

export default function NavBar() {
  return (
    <header className='p-3 w-full fixed top-0 z-50 bg-main-light/85 shadow'>
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
            <Link
              key={link.href}
              href={link.href}
              className='font-medium transitioning hover:text-main'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-3'>
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
            href='/login'
            className={
              buttonVariants({
                variant: 'primary'
              })
            }
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}