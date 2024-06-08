import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import { setRole } from "./_actions";
import { roles } from '@/constants/constant';

import { BanSection } from "./_ban";
import { RoleItems } from "./_roleItems";

export default async function UserControl(params: {
    searchParams: { search?: string };
}) {

    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {
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
                                
                                <RoleItems id={user.id} role={role} />
                                
                                <BanSection id={user.id} role={role} />
                            </div>
                        );
                    })}

                </div>
            </section>
        </>
    );
}

/*
<div key={Item.label}>
    <h1 className="text-red-400">{Item.description}</h1>
    <form action={setRole}>
        <SelectItem value={Item.label} className="text-orange-700">
            <input type="hidden" value={user.id} name="id" />
            <input type="hidden" value={Item.label} name="role" />
            <button type="submit">{Item.description}</button>
        </SelectItem>
    </form>
</div>
*/