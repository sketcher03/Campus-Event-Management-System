'use client';

import { navItemsPrivilege, navItemsGeneral } from '@/constants/constant'
import { checkRole } from '@/utils/roles';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarItems = () => {

    const pathName = usePathname();
    //!checkRole("admin")

    return (
        <ul className="w-full flex flex-between gap-10">
            {
                (checkRole("admin") || checkRole("organizer") || checkRole("faculty")) ? (
                    <>
                        {navItemsPrivilege.map((Item) => {
                            const isActive = pathName === Item.route;

                            return (
                                <li key={Item.route} className={`${isActive && 'text-orange-500'} flex-center p-medium-16 whitespace-nowrap`}>
                                    <Link href={Item.route}>{Item.label}</Link>
                                </li>
                            )
                        })}
                    </>
                ) : (
                    <>
                        {navItemsGeneral.map((Item) => {
                            const isActive = pathName === Item.route;

                            return (
                                <li key={Item.route} className={`${isActive && 'text-orange-500'} flex-center p-medium-16 whitespace-nowrap`}>
                                    <Link href={Item.route}>{Item.label}</Link>
                                </li>
                            )
                        })}
                    </>
                )
            }
            
        </ul>
    )
}

export default NavbarItems