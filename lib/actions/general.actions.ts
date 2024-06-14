'use server'
 
import { redirect } from 'next/navigation'

import { clerkClient } from "@clerk/nextjs/server";
 
export async function navigate(route: string) {
    redirect(`/${route}`)
}

export async function getUsersList(query: string) {
    return (await clerkClient.users.getUserList({ query })).data
}