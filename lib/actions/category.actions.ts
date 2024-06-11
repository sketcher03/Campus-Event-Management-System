'use server'

import { CreateCategoryParams } from "@/types";
import { connectToDb } from "../db";
import Category from "../db/models/category.model";
import { handleError } from "../utils"

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