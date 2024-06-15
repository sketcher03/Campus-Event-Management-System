import { formatDateAndTime } from '@/lib/utils';
import { EventCardProps } from '@/types'
import { auth } from '@clerk/nextjs/server';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DeleteEventDialog } from './DeleteEventDialog';
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog';

const EventCard = (props: EventCardProps) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.metadata.userId as string;

    //console.log(props.event.category);

    const isEventCreator = userId === props.event.organizer._id;

    return (
        <div className="group relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-amber-50 shadow-md transition-all hover:shadow-lg min-h-[438px]">
            <Link href={`/event/${props.event._id}`} style={{ backgroundImage: `url(${props.event.image})` }} className="flex-center flex-grow bg-amber-50 bg-cover bg-center text-orange-500" />

            {
                isEventCreator && !props.hidePrice && (
                    <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl p-2 bg-orange-100 shadow-sm transition-all cursor-pointer">
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Ellipsis className='h-[20px] w-[22px] text-orange-400 p-0' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href={`/event/${props.event._id}/update`}>Update</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger>
                                                Delete
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DeleteEventDialog eventId={props.event._id} />
                        </AlertDialog>
                    </div>
                )
            }

            <div className="absolute right-2 top-[180px] flex flex-col gap-4 mr-3 rounded-full shadow-lg transition-all">
                <Avatar className="h-[96px] w-[96px]">
                    <AvatarImage src={props.event.dpImage} />
                </Avatar>
            </div>

            <div className="flex min-h-[200px] flex-col gap-3 p-5">
                {
                    !props.hidePrice && (
                        <div className="flex gap-2">
                            <h1 className='p-semibold-14 rounded-full bg-green-200 px-4 py-1 text-green-60'>{props.event.isFree ? 'FREE' : `BDT. ${props.event.price}`}</h1>
                            <p className="p-semibold-14 rounded-full bg-orange-500 px-4 py-1 text-white line-clamp-1">{props.event.category.title}</p>
                        </div>
                    )
                }

                <p className="p-medium-16 text-orange-500">
                    {formatDateAndTime(props.event.startDate).dateAndTime}
                </p>

                <Separator className='bg-orange-200' />

                <Link href={`/event/${props.event._id}`}>
                    <p className="p-bold-20 line-clamp-2 flex-1 text-orange-800">{props.event.title}</p>
                </Link>

                <p className="p-medium-14 text-amber-500">
                    <span className='font-semibold'>Host:</span> {props.event.host}
                </p>
            </div>
        </div>
    )
}

export default EventCard