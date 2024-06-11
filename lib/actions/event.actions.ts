'use server'

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../db"
import User from "../db/models/user.model"
import Event from "../db/models/event.model"

export const proposeEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDb();

        const organizer = await User.findById(userId);

        if (!organizer) {
            throw new Error("Organizer does not exist");
        }

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        })

        return JSON.parse(JSON.stringify(newEvent));
        
    } catch (error) {
        handleError(error);
    }

}