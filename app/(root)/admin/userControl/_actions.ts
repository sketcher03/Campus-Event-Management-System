"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function setRole(id: string, role: string) {
    // Check that the user trying to set the role is an admin
    if (!checkRole("admin")) {
        return { message: "Not Authorized" };
    }

    try {
        const res = await clerkClient.users.updateUser(
            id,
            {
                publicMetadata: { role: role },
            }
        );
        return { message : res.publicMetadata }
    } catch (err) {
        return { message: err };
    }
}