import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import EventForm from "@/components/shared/EventForm";

const UpdateEvent = () => {

    // Redirect them to the home page if user is not faculty, admin or organizer
    if (!checkRole("admin") && !checkRole("organizer") && !checkRole("faculty")) {
        redirect("/");
    }

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    return (
        <div>
            <section className="bg-orange-50 bg-center py-10">
                <h3 className="h3-bold text-center text-orange-500 py-2">Update Event</h3>
                <p className="text-center text-orange-300">Updated Event will be held for Review</p>
            </section>
            <div className="wrapper my-6 text-center">
                <EventForm userId={userId} type="Update" />
            </div>
        </div>
    )
}

export default UpdateEvent