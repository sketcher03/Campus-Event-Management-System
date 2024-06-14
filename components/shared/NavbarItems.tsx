'use client';

import { navItemsPrivilege, navItemsGeneral } from '@/constants/constant'
import { sendRole } from '@/utils/roles';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NavbarItems = () => {

    const [role, setRole] = useState(false); 

    const pathName = usePathname();

    useEffect(() => {

        const f = async () => {
            const res = await sendRole();

            if (res == "admin" || res == "organizer" || res == "faculty") {
                setRole(true)
            }
        }
        
        f();

    }, [])

    return (
        <ul className="w-full flex flex-between gap-10">
            {
                (role) ? (
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