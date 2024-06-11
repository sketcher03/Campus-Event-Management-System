import { getEvent } from "@/lib/actions/event.actions"
import { SearchEventParamProps } from "@/types"
import Image from "next/image";

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDateAndTime } from "@/lib/utils";
import { Calendar, Link, Link2, MapPin } from "lucide-react";
import EventRegistration from "@/components/shared/EventRegistration";


const SingleEvent = async ({ params: { id } }: SearchEventParamProps) => {
    
    const event = await getEvent(id);

    // console.log(event.image);

    return (
        <div className="px-48 py-4">
            <Separator className='bg-orange-100 mb-4 h-[2px]' />

            <section className="flex justify-center pt-6">
                <div className="grid grid-cols-1 max-w-7xl">
                    <Image
                        src={event.image}
                        alt="event cover image"
                        width={1000}
                        height={1000}
                        className="h-[480px] min-h-[300px] w-[1280px] object-cover object-center rounded-xl"
                    />
                
                    <div className="grid grid-cols-4 pt-16 pl-12 items-center">
                        <div className="max-w-[240px]">
                            <Avatar className="h-[240px] w-[240px]">
                                <AvatarImage src={event.dpImage} />
                            </Avatar>
                        </div>
                        <div className="flex justify-between col-span-3 gap-10 items-center">
                            <div className="flex flex-col gap-6 min-w-[480px] max-w-[500px]">
                                <h3 className="h3-bold text-orange-900">{event.title}</h3>

                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3 items-center">
                                        <p className="p-bold-16 rounded-lg bg-green-50 px-5 py-2 text-green-600">
                                            <span className="p-medium-16">Entry Fee: </span>{event.isFree ? 'FREE EVENT' : `$${event.price}`}
                                        </p>
                                        <p className="p-medium-16 rounded-lg bg-orange-50 px-4 py-2.5 text-orange-500">
                                            {event.category.title}
                                        </p>
                                        <Separator orientation="vertical" className='bg-orange-200 mx-4 h-[30px] w-[4px]' />
                                        <p className="p-bold-16 ml-2">
                                            by{' '}
                                            <span className="text-orange-400">{event.host}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className='flex gap-3'>
                                    <Calendar className="mr-1 h-[54px] w-[54px] text-orange-600" />
                                    <div className="p-semibold-18 flex flex-wrap items-center text-orange-500">
                                        <p>
                                            {formatDateAndTime(event.startDate).dateOnly} - {' '}
                                            {formatDateAndTime(event.startDate).timeOnly}
                                        </p>
                                        <p>
                                            {formatDateAndTime(event.endDate).dateOnly} -  {' '}
                                            {formatDateAndTime(event.endDate).timeOnly}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-regular-20 flex items-center gap-3">
                                    <MapPin className="mr-1 h-[32px] w-[32px] text-orange-600" />
                                    <p className="p-semibold-18 text-orange-500">{event.venue}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-4 pt-16 pl-12 items-start">
                        <div className="max-w-[240px]">
                            <h3 className="p-semibold-18 text-orange-800 flex gap-2 items-center"><Link className="w-[20px] h-[20px]" />Event URL</h3>
                            <Separator className='bg-orange-200 my-4 h-[1px] w-[100px]' />
                            <p className="p-regular-18 text-orange-500 underline">{event.url}</p>
                        </div>
                        <div className="flex justify-between col-span-3 gap-10">
                            <div className="flex flex-col gap-2">
                                <p className="p-bold-20 text-orange-600">Event Description:</p>
                                <p className="p-regular-18">{event.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="flex justify-center mt-16 bg-amber-100 rounded-xl">
                <EventRegistration event={event} />
            </section>
        </div>
    )
}

export default SingleEvent