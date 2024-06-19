'use server'

import { AddToWishlistParams, CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../db/index"
import User from "../db/models/user.model"
import { revalidatePath } from "next/cache"
import Event from "../db/models/event.model"
import { Types } from "mongoose"

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

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user);
        
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

export const addToWishlist = async ({ userId, eventId, path }: AddToWishlistParams) => {
    try {
        await connectToDb();

        const user = await User.findById(userId);
        const wishlistEvent = await Event.findById(eventId);

        if (!user || !wishlistEvent) {
            throw new Error('User or Event does not exist');
        }

        if (user.wishlist.includes(eventId)) {
            throw new Error('Event already in wishlist');
        }

        user.wishlist.push(eventId);
        await user.save();

        revalidatePath(path)

        return JSON.parse(JSON.stringify(user.wishlist));
        
    } catch (error) {
        handleError(error);
    }
}

export const removeFromWishlist = async ({ userId, eventId, path }: AddToWishlistParams) => {
    try {
        await connectToDb();

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User or Event does not exist');
        }

        if (!user.wishlist.includes(eventId)) {
            throw new Error('Event not in wishlist');
        }

        user.wishlist = user.wishlist.filter((id: Types.ObjectId) => id.toString() !== eventId);
        await user.save();

        revalidatePath(path)

        return JSON.parse(JSON.stringify(user.wishlist));

    } catch (error) {
        handleError(error);
    }
}

export const getUserById = async (userId: string) => {
    try {
        await connectToDb();

        const targetUser = await User.findById(userId);

        if (!targetUser) {
            throw new Error('User does not exist');
        }

        return JSON.parse(JSON.stringify(targetUser));
    } catch (error) {
        handleError(error);
    }
}

export const getWishlistByUserId = async (userId: string) => {
    try {
        await connectToDb();

        const targetUser = await User.findById(userId).populate({
            path: 'wishlist',
            model: Event,
            select: "_id title host status startDate"
        });

        if (!targetUser) {
            throw new Error('User does not exist');
        }

        return JSON.parse(JSON.stringify(targetUser));
    } catch (error) {
        handleError(error);
    }
}