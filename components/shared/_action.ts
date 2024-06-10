"use server"

import { getAllCategories } from "@/lib/actions/category.actions";

export async function getCategories() {

    const categoryList = await getAllCategories();

    return categoryList;
}