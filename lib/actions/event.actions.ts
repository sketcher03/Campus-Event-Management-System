'use server'

import { ApproveEventParams, CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../db"
import User from "../db/models/user.model"
import Event from "../db/models/event.model"
import Category from "../db/models/category.model"
import { revalidatePath } from "next/cache"

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

export const getEvent = async (eventId: string) => {
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

export const getEventWishCount = async (eventId: string) => {
    try {
        await connectToDb();

        const count = await User.countDocuments({ wishlist: eventId })

        return JSON.parse(JSON.stringify(count));

    } catch (error) {
        handleError(error);
    }
}

export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDb();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' }} : {}
        const categoryCondition = category ? await getCategoryByTitle(category) : null
        const conditions = {
            $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
        }

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

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
        await connectToDb()

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (deletedEvent) {
            revalidatePath(path)
        }

    } catch (error) {
        handleError(error)
    }
}

export async function approveEvent({ eventId, path }: ApproveEventParams) {
    try {
        await connectToDb()

        const approveEvent = await Event.findById(eventId);

        //console.log(approveEvent);

        if (!approveEvent) {
            throw new Error('Event does not exist');
        }

        const approvedEvent = await Event.findByIdAndUpdate(
            eventId,
            { status: 'live' },
            { new: true }
        )

        //console.log(approvedEvent.status)

        revalidatePath(path)

        return JSON.parse(JSON.stringify(approvedEvent))

    } catch (error) {
        handleError(error)
    }
}

export async function archiveEvent({ eventId, path }: ApproveEventParams) {
    try {
        await connectToDb()

        const approveEvent = await Event.findById(eventId);

        //console.log(approveEvent);

        if (!approveEvent) {
            throw new Error('Event does not exist');
        }

        const approvedEvent = await Event.findByIdAndUpdate(
            eventId,
            { status: 'archived' },
            { new: true }
        )

        //console.log(approvedEvent.status)

        revalidatePath(path)

        return JSON.parse(JSON.stringify(approvedEvent))

    } catch (error) {
        handleError(error)
    }
}

export async function updateEvent({ event, userId, path }: UpdateEventParams) {
    try {
        await connectToDb()

        const updateEvent = await Event.findById(event._id);

        //console.log(categoryId);

        if (!updateEvent || updateEvent.organizer.toHexString() !== userId) {
            throw new Error('Event does not exist');
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, category: event.categoryId },
            { new: true }
        )

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedEvent))

    } catch (error) {
        handleError(error)
    }
}

const getCategoryByTitle = async (name: string) => {
    return Category.findOne({ title: { $regex: name, $options: 'i' } })
}

export const getAllLiveEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDb();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' }, status: "live" } : { status: "live" }
        const categoryCondition = category ? await getCategoryByTitle(category) : null
        const conditions = {
            $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
        }

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

export const getEventsByUser = async ({ userId, limit = 6, page }: GetEventsByUserParams) => {
    try {
        await connectToDb();

        //console.log(userId)

        const conditions = { organizer: userId };

        const events = await populateEvent(Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(0)
            .limit(limit));
        
        //console.log(events)

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

export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByCategoryParams) {
    try {
        await connectToDb()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const events = await populateEvent(eventsQuery)
        const eventsCount = await Event.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
        handleError(error)
    }
}