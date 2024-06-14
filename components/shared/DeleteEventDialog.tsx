'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { deleteEvent } from '@/lib/actions/event.actions'

export const DeleteEventDialog = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <>
            

            <AlertDialogContent className="bg-amber-50 p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
                    <AlertDialogDescription className="p-medium-14 text-orange-600">
                        This action is permanent and irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() =>
                            startTransition(async () => {
                                await deleteEvent({ eventId, path: pathname })
                            })
                        }>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}