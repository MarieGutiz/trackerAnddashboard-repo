'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import classNames from 'classnames';


const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
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
                     className={classNames({
                          'text-zinc-900': currentPath === link.href,
                          'text-zinc-500': currentPath !== link.href,
                          'hover:text-zinc-800 transition-colors': true,

                     })}>{link.label}</Link>
                )
            }
           
        </ul>
    </nav>
  )
}

export default NavBar