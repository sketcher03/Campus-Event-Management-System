import EventCollection from '@/components/shared/EventCollection'
import { getAllEvents } from '@/lib/actions/event.actions'
import React from 'react'

export default async function BrowseEvents() {
    
    const events = await getAllEvents({
        query: '',
        limit: 6,
        page: 1,
        category: ''
    });
    
    //console.log(events);

    return (
        <div>
            <section className="bg-orange-50 bg-center py-8 my-2 mb-6">
                <h3 className="h3-bold text-center text-orange-500 py-2">Browse Events</h3>
                <p className="text-center text-orange-300">Search and Filter to Find your Desired Event</p>
            </section>

            <EventCollection
                data={events?.data}
                emptyTitle="No Events Found"
                emptyStateSubtext="Come back later"
                collectionType="AllEvents"
                limit={6}
                page={1}
                totalPages={events?.totalPages}
            />
        </div>
    )
}
