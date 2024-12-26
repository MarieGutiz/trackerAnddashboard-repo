import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";


const NavBar = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]
  return (
    <nav className='flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoBugSharp />
        </Link>
        <ul className='flex space-x-6'>
            {
                links.map(link =>                     
                    <Link key={link.href}
                     href={link.href}
                     className='text-zinc-500 hover:text-zinc-800 transition-colors'>{link.label}</Link>
                )
            }
           
        </ul>
    </nav>
  )
}

export default NavBar