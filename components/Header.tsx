
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navitems from './Navitems'
import UserDropdown from './userDropdown'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className='header-wrapper container'>
            <Link href={'/'} className='text-2xl font-bold'>
            <Image src="/assets/icons/logo.svg" alt="Logo" width={140} height={32} className='h-8 w-auto cursor-pointer'/>
            </Link>

            <nav className='hidden sm:block'>
                <Navitems />
            </nav>

            <UserDropdown />

        </div>
    </header>
  )
}

export default Header