'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { approveEvent } from '@/lib/actions/event.actions'

export const ApproveEventDialog = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <>
            <AlertDialogContent className="bg-amber-50 p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to approve this event?</AlertDialogTitle>
                    <AlertDialogDescription className="p-medium-14 text-orange-600">
                        This will make the event live.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() =>
                            startTransition(async () => {
                                await approveEvent({ eventId, path: pathname })
                            })
                        }>
                        {isPending ? 'Approving...' : 'Approve'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}