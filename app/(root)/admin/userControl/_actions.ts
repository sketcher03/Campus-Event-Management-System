"use server";

import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(id: string, role: string) {
    // Check that the user trying to set the role is an admin
    if (!checkRole("admin")) {
        return { message: "Not Authorized" };
    }

    const { sessionClaims } = auth();

    const userId = sessionClaims?.metadata.userId as string;

    try {
        const res = await clerkClient.users.updateUser(
            id,
            {
                publicMetadata: {
                    role: role,
                    userId: userId
                },
            }
        );
        return { message : res.publicMetadata }
    } catch (err) {
        return { message: err };
    }
}