'use server'

import { CreateCategoryParams } from "@/types";
import { connectToDb } from "../db";
import Category from "../db/models/category.model";
import { handleError } from "../utils"
import { revalidatePath } from "next/cache";

export const getAllCategories = async () => {
    try {
        await connectToDb();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
        
    } catch (error) {
        handleError(error);
    }
}

export const createCategory = async (category: CreateCategoryParams) => {
    try {
        await connectToDb();

        const newCategory = await Category.create(category);

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        await connectToDb();

        const deleteCategory = await Category.findById(categoryId);

        console.log(categoryId);
        
        if (!deleteCategory) {
            throw new Error('Category does not exist');
        }

        const deletedCategory = await Category.findByIdAndDelete(deleteCategory._id)
        //remove cached data from home
        revalidatePath('/admin/eventControl/createCategory');

        return deletedCategory ? JSON.parse(JSON.stringify(deletedCategory)) : null;
    } catch (error) {
        handleError(error);
    }
}