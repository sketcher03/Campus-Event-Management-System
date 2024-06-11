import { getEvent } from "@/lib/actions/event.actions"
import { SearchEventParamProps } from "@/types"
import Image from "next/image";

const SingleEvent = async ({ params: { id } }: SearchEventParamProps) => {
    
    const event = await getEvent(id);

    // console.log(event.image);
    
    // need to build a single event page with the data

    return (
        <div>
            <section className="flex justify-center pt-8">
                <Image
                    src={event.image}
                    alt="event cover image"
                    width={1000}
                    height={1000}
                    className="h-[400px] min-h-[300px] object-cover object-center rounded-lg"
                />
            </section>
        </div>
    )
}

export default SingleEvent