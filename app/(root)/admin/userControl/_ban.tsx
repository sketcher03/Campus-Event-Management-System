'use client'

import { BanProps } from "@/types";
import { setRole } from "./_actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function BanSection(props: BanProps) {
    const router = useRouter();

    const handleBan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            variant: "destructive",
            title: "User Banned",
            action: <ToastAction altText="Refresh"><Button className="bg-transparent hover:bg-transparent" onClick={() => router.refresh()}>Refresh</Button></ToastAction>
        })
        setRole(props.id, "banned")
    }

    const handleLiftBan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Ban Lifted",
            action: <ToastAction altText="Refresh"><Button className="bg-transparent hover:bg-transparent text-black" onClick={() => router.refresh()}>Refresh</Button></ToastAction>
        })
        setRole(props.id, "unbanned")
    }

    return (
        <>
            {
                (props.role != "banned") ?
                    (
                        <div className="mt-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-fit rounded-xl bg-red-500 hover:bg-orange-600">Ban User</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className=" bg-orange-50">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            The User will be Banned until an Admin lifts the ban. This will Restrict the User from the System.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <form onSubmit={handleBan}>
                                            <input type="hidden" value={props.id} name="id" />
                                            <input type="hidden" value="banned" name="role" />
                                            <AlertDialogAction type="submit" className="bg-red-500 hover:bg-red-600" >Ban User</AlertDialogAction>
                                        </form>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) :
                    (
                        <div>
                            
                            <form onSubmit={handleLiftBan}>
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