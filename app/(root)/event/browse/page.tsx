import CategoryFilter from '@/components/shared/CategoryFilter';
import EventCollection from '@/components/shared/EventCollection'
import Search from '@/components/shared/Search';
import { getAllLiveEvents } from '@/lib/actions/event.actions'
import { SearchEventParamProps } from '@/types';
import React from 'react'

export default async function BrowseEvents({ searchParams }: SearchEventParamProps) {

    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const events = await getAllLiveEvents({
        query: searchText,
        limit: 6,
        page,
        category
    });
    
    //console.log(events);

    return (
        <div>
            <section className="bg-orange-50 py-8 my-2 mb-6">
                <h3 className="h3-bold text-center text-orange-500 py-2">Browse Events</h3>
                <p className="text-center text-orange-300">Search and Filter to Find your Desired Event</p>
            </section>

            <div className="wrapper flex w-full gap-5 flex-row mt-8">
                <Search />
                <div className='max-w-[400px]'><CategoryFilter /></div>
                
            </div>

            <EventCollection
                data={events?.data}
                emptyTitle="No Events Found"
                emptyStateSubtext="Come back later"
                collectionType="AllEvents"
                limit={6}
                page={page}
                totalPages={events?.totalPages}
            />
        </div>
    )
}
