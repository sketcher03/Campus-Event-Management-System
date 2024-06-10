import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import CreateCategoryAlert from './_render';

export default async function CreateCategory() {

    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {
        redirect("/");
    }

    return (
        <>
            <section className='bg-orange-50 py-32 mt-5'>
                <div className="wrapper flex flex-col items-center">
                    <CreateCategoryAlert />
                </div>
            </section>
        </>
    )
}