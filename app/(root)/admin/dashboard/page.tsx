import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboard() {

    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {
        redirect("/");
    }

    return (
        <>
            <section className="bg-orange-50 py-32 mt-5">
                <div className="wrapper flex flex-col items-center">
                    <h1 className="h5-bold text-orange-400">Admin dashboard</h1>
                    <p className="my-4 text-orange-300">This page is restricted to users with the 'admin' role.</p>
                    <Button size="lg" className="w-fit mt-2 bg-transparent text-orange-700 border-2 border-orange-500 hover:bg-orange-100 hover:text-orange-800">
                        <Link href="/admin/userControl">
                            User Control
                        </Link>
                    </Button>
                    <Button size="lg" className="w-fit mt-2 bg-transparent text-orange-700 border-2 border-orange-500 hover:bg-orange-100 hover:text-orange-800">
                        <Link href="/admin/eventControl">
                            Event Control
                        </Link>
                    </Button>
                </div> 
            </section>
        </>
    );
}