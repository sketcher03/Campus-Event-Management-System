import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import EventForm from "@/components/shared/EventForm";
import { getEvent } from "@/lib/actions/event.actions";
import { UpdateEventProps } from "@/types";

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin" && role !== "organizer" && role !== "faculty") {
        redirect("/");
    }

    const { sessionClaims } = auth();

    const userId = sessionClaims?.metadata.userId as string;

    const event = await getEvent(id);

    return (
        <div>
            <section className="bg-orange-50 bg-center py-10">
                <h3 className="h3-bold text-center text-orange-500 py-2">Update Event</h3>
                <p className="text-center text-orange-300">Updated Event will be held for Review</p>
            </section>
            <div className="wrapper my-6">
                <EventForm userId={userId} type="Update" event={event} eventId={event._id} />
            </div>
        </div>
    )
}

export default UpdateEvent