'use client'

import { AdminEventProps } from '@/types'
import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

import { DeleteEventDialog } from '@/components/shared/DeleteEventDialog';
import { ApproveEventDialog } from '@/components/shared/ApproveEventDialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { ArchiveEventDialog } from '@/components/shared/ArchiveEventDialog';

const AdminEventsDialogs = (props: AdminEventProps) => {
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-transparent text-orange-600 border-2 p-1 border-orange-200 hover:border-orange-300 hover:bg-transparent"><Ellipsis /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='text-orange-500 font-semibold' onClick={() => setIsApproveDialogOpen(true)}>
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500 font-semibold' onClick={() => setIsDeleteDialogOpen(true)}>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-lime-700 font-semibold' onClick={() => setIsArchiveDialogOpen(true)}>
                            Archive
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                <ApproveEventDialog eventId={props.eventId} />
            </AlertDialog>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DeleteEventDialog eventId={props.eventId} />
            </AlertDialog>
            <AlertDialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
                <ArchiveEventDialog eventId={props.eventId} />
            </AlertDialog>
        </>
    )
}

export default AdminEventsDialogs