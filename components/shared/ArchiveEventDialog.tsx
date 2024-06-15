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

import { archiveEvent } from '@/lib/actions/event.actions'

export const ArchiveEventDialog = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <>
            <AlertDialogContent className="bg-amber-50 p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to archive this event?</AlertDialogTitle>
                    <AlertDialogDescription className="p-medium-14 text-orange-600">
                        This will move this event to the archived event section.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() =>
                            startTransition(async () => {
                                await archiveEvent({ eventId, path: pathname })
                            })
                        }>
                        {isPending ? 'Archiving...' : 'Archive'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}