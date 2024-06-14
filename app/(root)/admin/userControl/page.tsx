import { redirect } from "next/navigation";
import {sendRole } from "@/utils/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";

import { BanSection } from "./_ban";
import { RoleItems } from "./_roleItems";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

export default async function UserControl(params: {
    searchParams: { search?: string };
}) {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin") {
        redirect("/");
    }

    const query = params.searchParams.search;

    const users = query ? (await clerkClient.users.getUserList({ query })).data : [];


    return (
        <>
            <section className="bg-orange-50 py-16 mt-5 ">
                <div className="wrapper flex flex-col items-center">
                    <h1 className="h5-bold text-orange-400">User Control</h1>
                    <p className="my-4 text-orange-300">Search for usernames or email addresses of users</p>

                    <SearchUsers />

                    {users.map((user) => {
                        const role = user.publicMetadata.role as string;
                        return (
                            <div key={user.id} className="p-8 border-y-4 border-orange-200">
                                <div>
                                    <span className="text-orange-500">Name: </span> {user.firstName} {user.lastName}
                                </div>
                                <div>
                                    <span className="text-orange-500" >Email Address: </span>
                                    {
                                        user.emailAddresses.find(
                                            (email) => email.id === user.primaryEmailAddressId
                                        )?.emailAddress
                                    }
                                </div>
                                <div>
                                    <span className="text-orange-500" >Current Role: </span>
                                    {role}
                                </div>

                                {
                                    (role != "banned") ? (
                                        <RoleItems id={user.id} role={role} />
                                    ) : (
                                        <Alert className="my-5" variant="destructive">
                                            <AlertCircle className="h-8 w-8" />
                                            <div className="pt-1 ml-5">
                                                <AlertTitle>Status: Banned</AlertTitle>
                                                <AlertDescription>
                                                    User is Currently Banned.
                                                </AlertDescription>
                                            </div>
                                        </Alert>
                                    )
                                }
                                
                                <BanSection id={user.id} role={role} />
                            </div>
                        );
                    })}

                </div>
            </section>
        </>
    );
}
