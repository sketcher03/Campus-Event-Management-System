"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export const SearchUsers = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div>
            <form
                className="wrapper flex flex-row items-center"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const queryTerm = formData.get("search") as string;
                    router.push(pathname + "?search=" + queryTerm);
                }}
            >
                <label className="mr-5" htmlFor="search">Search Users: </label>
                <Input type="text" placeholder="Type Here..." id="search" name="search" className="mr-5" />
                <Button className="w-fit rounded-xl bg-orange-500 hover:bg-orange-700" type="submit">Submit</Button>
            </form>
        </div>
    );
};