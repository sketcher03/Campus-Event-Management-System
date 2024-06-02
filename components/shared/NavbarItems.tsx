'use client';

import { navItems } from '@/constants/constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarItems = () => {

    const pathName = usePathname();

    return (
        <ul className="w-full flex flex-between gap-6">
            {navItems.map((Item) => {
                const isActive = pathName === Item.route;

                return (
                    <li key={Item.route} className={`${isActive && 'text-orange-500'} flex-center p-medium-16 whitespace-nowrap`}>
                        <Link href={Item.route}>{Item.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavbarItems