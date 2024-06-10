import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import CreateCategoryAlertBox from './_render';
import { getCategories } from "./_action";

type CategoryType = {
    _id: string,
    title: string
}

export default async function CreateCategory () {

    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {
        redirect("/");
    }

    const categoryList = await getCategories() || [];

    return (
        <>
            <section className='bg-orange-50 py-32 mt-5'>
                <div className="wrapper flex flex-col items-center">
                    {
                        categoryList.length > 0 && categoryList.map((category: CategoryType) => (
                            <p key={category._id} className="select-item p-regular-14">{category.title}</p>
                        ))
                    }
                    <CreateCategoryAlertBox />
                </div>
            </section>
        </>
    )
}