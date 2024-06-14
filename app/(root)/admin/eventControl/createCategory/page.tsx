import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";
import CreateCategoryAlertBox from './_render';
import { getCategories } from "./_action";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type CategoryType = {
    _id: string
    title: string
    description: string
}

export default async function CreateCategory () {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin") {
        redirect("/");
    }

    const categoryList = await getCategories() || [];

    return (
        <>
            <section className='bg-orange-50 py-32 mt-5'>
                <div className="wrapper flex flex-col items-center">
                    <CreateCategoryAlertBox />

                    

                    {
                        categoryList.length > 0 && categoryList.map((category: CategoryType) => (
                            <p key={category._id} className="select-item p-regular-14">{category.title}</p>
                        ))
                    }
                    
                </div>
            </section>
        </>
    )
}