import { EventCollectionProps } from "@/types"

import { TriangleAlert } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import EventCard from "./EventCard"

const EventCollection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: EventCollectionProps) => {
    return (
        <div className="wrapper">
            {
                data.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <ul className="grid w-full grid-cols-3 gap-10">
                            {data.map((event) => {
                                const hidePrice = collectionType === "Registered";

                                return (
                                    <li key={event._id} className="flex justify-center">
                                        
                                        {/*Card component rendered here*/}
                                        {
                                            event.status === "live" && <EventCard event={event} hidePrice={hidePrice} />
                                        }
                                        
                                        
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                ) : (
                        <div className="flex-center flex-col border-2 rounded-lg border-orange-300 bg-amber-50 text-orange-600">
                            <TriangleAlert color="#f97316" className="h-56 w-56 pt-12 text-orange-500" />
                            <Alert className="flex-center flex-col h-[150px] mt-[-30px] border-none text-orange-600 text-xl">
                                <AlertTitle>{emptyTitle}</AlertTitle>
                                <AlertDescription>
                                    {emptyStateSubtext}
                                </AlertDescription>
                            </Alert>
                        </div>
                        
                )
            }
        </div>
    )
}

export default EventCollection