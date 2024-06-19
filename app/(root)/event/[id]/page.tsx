import { getEvent, getEventWishCount, getRelatedEventsByCategory } from "@/lib/actions/event.actions"
import { SearchEventParamProps } from "@/types"
import Image from "next/image";
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { formatDateAndTime, formatPrice } from "@/lib/utils";
import { Calendar, Heart, Link2, MapPin } from "lucide-react";
import EventRegistration from "@/components/shared/EventRegistration";
import EventCollection from "@/components/shared/EventCollection";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/shared/CountDownTimer";
import DisqusComments from "@/components/shared/DisqusComments";
import { auth } from "@clerk/nextjs/server";
import AddToWishlist from "@/components/shared/AddToWishlist";
import { getUserById } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";

const timerLabels = ['days', 'hours', 'minutes', 'seconds']

const SingleEvent = async ({ params: { id }, searchParams }: SearchEventParamProps) => {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.metadata.userId as string;
    const role = sessionClaims?.metadata.role as string;

    const event = await getEvent(id);
    const user = await getUserById(userId);
    const eventWishCount = await getEventWishCount(id);

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string,
    })

    const isEventCreator = userId === event.organizer._id;

    const isAddedToWishlist = user.wishlist.includes(id);
    const isEventOver = new Date(event.endDate) < new Date();

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

                    <div className="group relative grid grid-cols-4 pt-16 pl-12 items-center">
                        {
                            !isAddedToWishlist ? (
                                <AddToWishlist eventId={event._id} userId={userId} />
                            ) : (
                                <div className="p-2 absolute top-[40px] right-[20px] border-2 border-orange-500 rounded-xl bg-transparent hover:bg-transparent">
                                    <div className="flex flex-row gap-2">
                                        <Heart fill="true" className="text-red-600 fill-red-600" />
                                        <Link href="/wishlist" >
                                            <p className="text-orange-500 font-semibold">Added To Wishlist!</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                        <p className="absolute top-[95px] right-[20px] text-base text-orange-300 font-semibold">{eventWishCount} users interested!</p>

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
                                            <span className="p-medium-16">Entry Fee: </span>{event.isFree ? 'FREE EVENT' : `${formatPrice(event.price)}`}
                                        </p>
                                        <Separator orientation="vertical" className='bg-orange-200 mx-4 h-[30px] w-[4px]' />
                                        <p className="p-medium-16 rounded-lg bg-orange-50 px-4 py-2.5 text-orange-500">
                                            {event.category.title}
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold ml-2 mt-4">
                                        by{' '}
                                        <span className="text-orange-400">{event.host}</span>
                                    </p>
                                    <h3 className=" ml-2">Status: <Badge variant="destructive" className={event.status === "live" ? `bg-green-600 hover:bg-green-700 h-8 text-base rounded-xl p-5 capitalize ml-2` : `bg-orange-500 hover:bg-orange-600 h-8 text-base rounded-xl p-5 capitalize ml-2`}>{event.status}</Badge></h3>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="grid grid-cols-4 pt-16 pl-12 items-start gap-12">
                        <div className="flex flex-col gap-5">
                            <div className='flex gap-4'>
                                <Calendar className="mr-1 h-[54px] w-[54px] text-orange-600" />
                                <div className="p-semibold-18 flex flex-wrap items-center text-orange-500">
                                    <div>
                                        <span className="text-orange-300">From:</span>
                                        <Separator className='bg-orange-200 my-1 h-[2px] w-[100px]' />
                                        <p>
                                            {formatDateAndTime(event.startDate).dateOnly} <br /> {' '}
                                            {formatDateAndTime(event.startDate).timeOnly}
                                        </p>
                                    </div>
                                    <div className=" mt-3">
                                        <span className="text-orange-300">To:</span>
                                        <Separator className='bg-orange-200 my-1 h-[2px] w-[100px]' />
                                        <p className="mt-2">
                                            {formatDateAndTime(event.endDate).dateOnly} <br /> {' '}
                                            {formatDateAndTime(event.endDate).timeOnly}
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="p-regular-20 flex items-center gap-3 mt-4">
                                <MapPin className="mr-1 h-[32px] w-[32px] text-orange-600" />
                                <p className="p-semibold-18 text-orange-500">{event.venue}</p>
                            </div>

                        </div>

                        <div className="flex flex-col justify-between col-span-3 gap-10">
                            <div className="flex flex-col gap-2">
                                <p className="p-bold-20 text-orange-600">Event Description:</p>
                                <p className="p-regular-18">{event.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <div className="px-24 pt-16 grid grid-cols-2 gap-24">
                <div>
                    <h3 className="p-semibold-18 text-orange-800 flex gap-2 items-center"><Link2 className="w-[20px] h-[20px]" />Event URL</h3>
                    <Separator className='bg-orange-200 my-4 h-[1px] w-[100px]' />
                    <p className="p-regular-18 text-orange-500 underline">{event.url}</p>
                    {
                        (role === "admin" || "organizer") && isEventCreator && (
                            <Button className="bg-orange-400 hover:bg-orange-500 mt-6">
                                <Link href={`/attendee?eventId=${event._id}`}>
                                    Registration Details
                                </Link>
                            </Button>

                        )
                    }
                </div>
                <CountdownTimer targetDate={event.endDate} labels={timerLabels} />
            </div>

            


            <section className="flex justify-center mt-16 bg-amber-100 rounded-xl py-8">
                <EventRegistration event={event} />
            </section>

            <div className="mt-10 wrapper items-center max-w-[1000px]">
                <DisqusComments event={event} />
            </div>


            <section className="wrapper my-8 flex flex-col gap-12">
                <h2 className="text-2xl font-bold text-orange-600 text-center mb-[-40px]">Similar Events</h2>
                <Separator className="bg-orange-200 mb-[-20px]" />
                <EventCollection
                    data={relatedEvents?.data}
                    emptyTitle="There Is Only One Event In This Category"
                    emptyStateSubtext="Come back later"
                    collectionType="AllEvents"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>

        </div>
    )
}

export default SingleEvent