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

    // need to build a Browse events page with the data

    return (
        <div className='wrapper'>
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
