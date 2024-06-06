'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../db/index"
import User from "../db/models/user.model"
import { revalidatePath } from "next/cache"

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDb();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const updateUser = async (user: UpdateUserParams, clerkId: string) => {
    try {
        await connectToDb();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
        
        if (!updatedUser) {
            throw new Error('User Information could not be updated');
        }

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectToDb();

        const deleteUser = await User.findOne({ clerkId });

        if (!deleteUser) {
            throw new Error('User does not exist');
        }

        const deletedUser = await User.findByIdAndDelete(deleteUser._id)
        //remove cached data from home
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}