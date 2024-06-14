"use server";

import { createCategory, deleteCategory } from "@/lib/actions/category.actions";
import { getAllCategories } from "@/lib/actions/category.actions";
import { CreateCategoryParams } from "@/types";

export async function categoryCreate(newCategory: CreateCategoryParams) {

        const categoryAdded = {
                title: newCategory.title.trim(),
                description: newCategory.description.trim()
        };

        createCategory(categoryAdded);
}

export async function getCategories() {

        const categoryList = await getAllCategories();
        
        return categoryList;
}

export async function categoryDelete(categoryId: string) {

        deleteCategory(categoryId);
}