import { getAllEvents } from '@/lib/actions/event.actions'
import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { formatDateAndTime } from '@/lib/utils';
import { Badge } from "@/components/ui/badge"
import AdminEventsDialogs from './_render';
import Link from 'next/link';
import Search from '@/components/shared/Search';
import { SearchEventParamProps } from '@/types';
import CategoryFilter from '@/components/shared/CategoryFilter';

export default async function ApproveEvents({ searchParams }: SearchEventParamProps) {

    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin") {
        redirect("/");
    }

    const events = await getAllEvents({
        query: searchText,
        limit: 6,
        page,
        category
    });

    const data = events?.data;

    //console.log(events);

    type EventType = {
        _id: string
        title: string
        createdAt: Date
        startDate: Date
        status: string
        category: { _id: string, title: string }
        organizer: { _id: string, username: string }
    }

    return (
        <>
            <section className="bg-orange-50 bg-center py-10">
                <h3 className="h3-bold text-center text-orange-500 py-2">Approve Events</h3>
                <p className="text-center text-orange-300">Approved Events will show up in the "Browse Events" Section</p>
            </section>

            <div className="wrapper flex w-full gap-5 flex-row mt-8">
                <Search />
                <div className='max-w-[400px]'><CategoryFilter /></div>
            </div>

            <div className="flex flex-col items-center">
                <h4 className="py-4 mt-4 font-semibold text-sm text-orange-500">Current List of Unapproved Events</h4>
                <Table className="wrapper pt-4 border-y-2 border-orange-200 rounded-xl">
                    <TableHeader className="h-[60px]">
                        <TableRow>
                            <TableHead className="text-orange-600">Category</TableHead>
                            <TableHead className="text-orange-600">Title</TableHead>
                            <TableHead className="text-orange-600">Created At</TableHead>
                            <TableHead className="text-orange-600">Starts At</TableHead>
                            <TableHead className="text-orange-600">Status</TableHead>
                            <TableHead className="text-orange-600">Created By</TableHead>
                            <TableHead className="text-orange-600">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.length > 0 && data.map((event: EventType) => (
                                <TableRow key={event._id}>
                                    <TableCell className="overflow-hidden">{event.category.title}</TableCell>
                                    <TableCell className='text-orange-600 font-semibold underline'><Link href={`/event/${event._id}`}>{event.title}</Link></TableCell>
                                    <TableCell className="overflow-hidden">{formatDateAndTime(event.createdAt).dateOnly}</TableCell>
                                    <TableCell className="overflow-hidden">{formatDateAndTime(event.startDate).dateOnly}</TableCell>
                                    <TableCell className='capitalize'><Badge variant="destructive" className={event.status === "live" ? `bg-green-600 hover:bg-green-700` : `bg-orange-500 hover:bg-orange-600`}>{event.status}</Badge></TableCell>
                                    <TableCell className="overflow-hidden">{event.organizer.username}</TableCell>
                                    <TableCell>
                                        <AdminEventsDialogs eventId={event._id} />
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
