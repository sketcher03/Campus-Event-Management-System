import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import EventForm from "@/components/shared/EventForm";

const ProposeEvent = async () => {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin" && role !== "organizer" && role !== "faculty") {
        redirect("/");
    }

    const { sessionClaims } = auth();

    const userId = sessionClaims?.metadata.userId as string;

    return (
        <div>
            <section className="bg-orange-50 bg-center py-10">
                <h3 className="h3-bold text-center text-orange-500 py-2">Propose Event</h3>
                <p className="text-center text-orange-300">Submitted event will be held for Review</p>
            </section>
            <div className="my-6 wrappersm">
                <EventForm userId={userId} type="Propose" />
            </div>
        </div>
    )
}

export default ProposeEvent