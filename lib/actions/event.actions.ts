'use server'

import { CreateEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../db"
import User from "../db/models/user.model"
import Event from "../db/models/event.model"
import Category from "../db/models/category.model"

const populateEvent = async (query: any) => {
    return query
        .populate({ path: "organizer", model: User, select: "_id firstName lastName username photo" })
        .populate({ path: "category", model: Category, select: "_id title" })
}

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

export const getEvent = async ( eventId: string ) => {
    try {
        await connectToDb();

        const event = await populateEvent(Event.findById(eventId));

        if (!event) {
            throw new Error("Event does not exist");
        }

        return JSON.parse(JSON.stringify(event));

    } catch (error) {
        handleError(error);
    }
}

export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDb();

        const conditions = {};
        
        const events = await populateEvent(Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(0)
            .limit(limit));
        
        const count = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(count / limit)
        };

    } catch (error) {
        console.log(error)
        handleError(error);
    }
}