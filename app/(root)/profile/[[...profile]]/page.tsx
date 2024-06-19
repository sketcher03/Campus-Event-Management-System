import EventCollection from '@/components/shared/EventCollection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getRegistrationsByUser } from '@/lib/actions/registration.actions';
import { IRegistration } from '@/lib/db/models/registration.model';
import { SearchEventParamProps } from '@/types';
import { UserProfile } from '@clerk/nextjs';

import { auth } from '@clerk/nextjs/server';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

const Profile = async ({ searchParams }: SearchEventParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.metadata.userId as string;

    const registeredPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const registrations = await getRegistrationsByUser({ userId, page: registeredPage })

    const registeredEvents = registrations?.data.map((registration: IRegistration) => registration.event) || [];
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

    //console.log(organizedEvents);

    return (
        <>
            <section className="wrapper py-6 flex flex-col items-center">
                <h3 className="h5-bold text-center text-orange-500 mt-5">Profile Information</h3>
                <p className="text-center text-orange-300">Managed By Clerk</p>
                
                <Separator className='mt-4 mb-6 h-[1.5px] bg-orange-100 ' />
                <UserProfile path='/profile' />

                <Separator className='my-8 h-[1.5px] bg-orange-100 ' />
                <div className='flex flex-row items-center gap-10'>
                    <Button className='bg-orange-500 hover:bg-orange-600 p-8'>
                        <Link className='text-lg font-semibold flex gap-2 items-center' href='/wishlist'>Your Wishlist <SquareArrowOutUpRight /></Link>
                    </Button>
                </div>
                
                <Separator className='mt-8 h-[1.5px] bg-orange-100 ' />
                <h3 className="h5-bold text-center text-orange-500 py-2 mt-6">Your Proposed Events</h3>
                <Separator className='my-4 h-[1.5px] bg-orange-100' />
                
                <EventCollection
                    data={organizedEvents?.data}
                    emptyTitle="You Have Not Proposed Any Events Yet"
                    emptyStateSubtext="Your Proposed Events Will Show Up Here"
                    collectionType="Organized"
                    limit={3}
                    page={eventsPage}
                    urlParamName="eventsPage"
                    totalPages={organizedEvents?.totalPages}
                />

                <Separator className='mt-8 h-[1.5px] bg-orange-100 ' />
                <h3 className="h5-bold text-center text-orange-500 py-2 mt-6">Your Registered Events</h3>
                <Separator className='my-4 h-[1.5px] bg-orange-100' />

                <EventCollection
                    data={registeredEvents}
                    emptyTitle="You Have Not Proposed Any Events Yet"
                    emptyStateSubtext="Your Proposed Events Will Show Up Here"
                    collectionType="Organized"
                    limit={3}
                    page={eventsPage}
                    urlParamName="eventsPage"
                    totalPages={registeredEvents?.totalPages}
                />
            </section>
        </>
    )
}

export default Profile