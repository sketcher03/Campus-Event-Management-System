'use client'

import { BanProps } from "@/types";
import { setRole } from "./_actions";
import { Button } from "@/components/ui/button";

export function BanSection(props: BanProps) {
    return (
        <>
            {
                (props.role == "unbanned") ?
                    (
                        <div className="mt-4">
                            <h1 className="text-red-400">Give the user a new Role</h1>
                            <form className="mt-4" onSubmit={() => setRole(props.id, "banned")}>
                                <input type="hidden" value={props.id} name="id" />
                                <input type="hidden" value="banned" name="role" />
                                <Button type="submit" className="w-fit rounded-xl bg-red-500 hover:bg-orange-600" >Ban User</Button>
                            </form>
                        </div>
                    ) :
                    (
                        <div>
                            <form onSubmit={() => setRole(props.id, "unbanned")}>
                                <input type="hidden" value={props.id} name="id" />
                                <input type="hidden" value="unbanned" name="role" />
                                <Button type="submit" className="w-fit rounded-xl bg-red-500 hover:bg-orange-600" >Lift Ban</Button>
                            </form>
                        </div>
                    )
            }
        </>
    );
}