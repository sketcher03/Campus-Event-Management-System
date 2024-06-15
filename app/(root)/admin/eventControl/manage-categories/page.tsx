import { redirect } from "next/navigation";
import { sendRole } from "@/utils/roles";
import CreateCategoryAlertBox from './_render';
import { getCategories } from "./_action";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import DeleteButton from "./_button";

type CategoryType = {
    _id: string
    title: string
    description: string
}

export default async function CreateCategory() {

    const role = await sendRole();

    // If the user does not have the admin role, redirect them to the home page
    if (role !== "admin") {
        redirect("/");
    }

    const categoryList = await getCategories() || [];

    return (
        <>
            <section className="bg-orange-50 pt-10 pb-4">
                <div className="wrapper flex flex-col items-center">
                    <h3 className="h3-bold text-center text-orange-500 py-2">Approve Events</h3>
                    <p className="text-center text-orange-300 mb-6">Approved Events will show up in the "Browse Events" Section</p>
                    <CreateCategoryAlertBox />
                </div>
            </section>

            <div className="wrapper flex flex-col items-center mb-8">
                <div className="flex flex-col items-center">
                    <h4 className="py-4 font-semibold text-sm text-orange-500">Current List of Categories</h4>
                    <Table className="w-[600px] max-w-[750px] pt-4 border-y-2 border-orange-200 rounded-xl">
                        <TableHeader className="h-[60px]">
                            <TableRow>
                                <TableHead className="text-orange-600">Title</TableHead>
                                <TableHead className="text-orange-600">Description</TableHead>
                                <TableHead className="text-orange-600">Options</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categoryList.length > 0 && categoryList.map((category: CategoryType) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.title}</TableCell>
                                        <TableCell className="overflow-hidden">{category.description}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="sm" className="bg-transparent text-orange-600 border-2 p-1 border-orange-200 hover:border-orange-300 hover:bg-transparent"><Ellipsis /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            <DeleteButton categoryId={category._id} />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}