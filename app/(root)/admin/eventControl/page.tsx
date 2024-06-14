import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EventControl() {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin") {
        redirect("/");
    }

    return (
        <>
            <section className="bg-orange-50 py-32 mt-5">
                <div className="wrapper flex flex-col items-center">
                    <h1 className="h5-bold text-orange-400">Event Controls</h1>
                    <p className="my-4 text-orange-300">This page contains functions for controlling events.</p>
                    <Button size="lg" className="w-fit mt-2 bg-transparent text-orange-700 border-2 border-orange-500 hover:bg-orange-100 hover:text-orange-800">
                        <Link href="/event/propose">
                            Propose Events
                        </Link>
                    </Button>
                    <Button size="lg" className="w-fit mt-2 bg-transparent text-orange-700 border-2 border-orange-500 hover:bg-orange-100 hover:text-orange-800">
                        <Link href="/admin/eventControl/approve-events">
                            Approve Events
                        </Link>
                    </Button>
                    <Button size="lg" className="w-fit mt-2 bg-transparent text-orange-700 border-2 border-orange-500 hover:bg-orange-100 hover:text-orange-800">
                        <Link href="/admin/eventControl/createCategory">
                            Create Category
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}