"use server";

import { createCategory } from "@/lib/actions/category.actions";
import { getAllCategories } from "@/lib/actions/category.actions";

export async function categoryCreate(newCategory: string) {

        const categoryAdded = { title: newCategory.trim() };

        createCategory(categoryAdded);
}

export async function getCategories() {

        const categoryList = await getAllCategories();
        
        return categoryList;
}