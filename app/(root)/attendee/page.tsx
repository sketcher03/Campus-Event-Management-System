import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { formatDateAndTime, formatPrice } from "@/lib/utils";
import { SearchEventParamProps } from "@/types";
import { getRegistrationsByEvent } from "@/lib/actions/registration.actions";
import { IRegistrationItem } from "@/lib/db/models/registration.model";
import Search from "@/components/shared/Search";

const AttendedList = async ({ searchParams }: SearchEventParamProps) => {

    const eventId = (searchParams?.eventId as string) || ''
    const searchText = (searchParams?.query as string) || ''

    const registrations = await getRegistrationsByEvent({ eventId, searchString: searchText })

    console.log(registrations);

    return (
        <>
            <section className="bg-orange-50 bg-center py-8 my-2 mb-6">
                <h3 className="h3-bold text-center text-orange-500 py-2">Attendee List</h3>
                <p className="text-center text-orange-300">Users who registered for this event appear here</p>
            </section>

            <section className="wrapper mt-8">
                <Search placeholder="Search Attendee name..." />
            </section>

            <div className="flex flex-col items-center">
                <h4 className="py-4 mt-4 font-semibold text-sm text-orange-500">Current Attendee List</h4>
                <Table className="wrapper pt-4 border-y-2 border-orange-200 rounded-xl">
                    <TableHeader className="h-[60px]">
                        <TableRow>
                            <TableHead className="text-orange-600">Registration Date</TableHead>
                            <TableHead className="text-orange-600">Attendee Name</TableHead>
                            <TableHead className="text-orange-600">Event Title</TableHead>
                            <TableHead className="text-orange-600">Fees</TableHead>
                            <TableHead className="text-orange-600">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            registrations && registrations.length === 0 ? (
                                <TableRow >
                                    <TableCell colSpan={5} className="text-center text-red-500">No Attendees Yet</TableCell>
                                    
                                </TableRow>
                            ) : (
                                <>
                                    {
                                        registrations && registrations.map((item: IRegistrationItem) => (
                                            <TableRow key={item._id}>
                                                <TableCell className="overflow-hidden">{formatDateAndTime(item.createdAt).dateAndTime}</TableCell>
                                                <TableCell className='text-orange-600 font-semibold'>{item.attendee}</TableCell>
                                                <TableCell className='text-orange-600 font-semibold'>{item.eventTitle}</TableCell>
                                                <TableCell className='text-orange-600 font-semibold'>{formatPrice(item.fees)}</TableCell>
                                                <TableCell className='text-orange-600 font-semibold'>
                                                    ---
                                                </TableCell>
                                            </TableRow>

                                        ))

                                    }

                                </>
                            )
                        }

                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default AttendedList