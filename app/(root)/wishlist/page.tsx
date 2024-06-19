
import { getWishlistByUserId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { formatDateAndTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import RemoveFromWishlistButton from "./_delete";

const Wishlist = async () => {
    
    const { sessionClaims } = auth();
    const userId = sessionClaims?.metadata.userId as string;

    const user = await getWishlistByUserId(userId);
    
    type EventType = {
        _id: string
        title: string
        host: string
        startDate: Date
        status: string
    }

    //console.log(user.wishlist)

    return (
        <>
            <section className="bg-orange-50 bg-center py-8 my-2 mb-6">
                <h3 className="h3-bold text-center text-orange-500 py-2">Your Wishlist</h3>
                <p className="text-center text-orange-300">Events added to your wishlist will appear here</p>
            </section>

            <div className="flex flex-col items-center">
                <h4 className="py-4 mt-4 font-semibold text-sm text-orange-500">Current Wishlist</h4>
                <Table className="wrapper pt-4 border-y-2 border-orange-200 rounded-xl">
                    <TableHeader className="h-[60px]">
                        <TableRow>
                            <TableHead className="text-orange-600">Title</TableHead>
                            <TableHead className="text-orange-600">Host</TableHead>
                            <TableHead className="text-orange-600">Status</TableHead>
                            <TableHead className="text-orange-600">Starts At</TableHead>
                            <TableHead className="text-orange-600">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            user.wishlist.length > 0 && user.wishlist.map((event: EventType) => (
                                <TableRow>
                                    <TableCell className='text-orange-600 font-semibold underline'><Link href={`/event/${event._id}`}>{ event.title }</Link></TableCell>
                                    <TableCell className='text-orange-600 font-semibold'>{ event.host }</TableCell>
                                    <TableCell className='capitalize'><Badge variant="destructive" className={event.status === "live" ? `bg-green-600 hover:bg-green-700` : `bg-orange-500 hover:bg-orange-600`}>{ event.status }</Badge></TableCell>
                                    <TableCell className="overflow-hidden">{ formatDateAndTime(event.startDate).dateOnly }</TableCell>
                                    <TableCell>
                                        <RemoveFromWishlistButton eventId={event._id} userId={userId} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default Wishlist