'use server'

import { CreateRegistrationParams, GetRegistrationsByEventParams, GetRegistrationsByUserParams } from "@/types";
import { connectToDb } from "../db";
import Registration from "../db/models/registration.model";
import { handleError } from "../utils";
import User from "../db/models/user.model";
import Event from "../db/models/event.model";
import { ObjectId } from 'mongodb';

export const createRegistration = async (registration: CreateRegistrationParams) => {
    try {
        await connectToDb();

        const newRegistration = await Registration.create({
            ...registration,
            event: registration.eventId,
            attendee: registration.attendeeId,
        });

        return JSON.parse(JSON.stringify(newRegistration));
    } catch (error) {
        handleError(error);
    }
}

export async function getRegistrationsByUser({ userId, limit = 3, page }: GetRegistrationsByUserParams) {
    try {
        await connectToDb()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { attendee: userId }

        const registrations = await Registration.distinct('event._id')
            .find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
            .populate({
                path: 'event',
                model: Event,
                populate: {
                    path: 'organizer',
                    model: User,
                    select: '_id firstName lastName',
                },
            })

        const registrationsCount = await Registration.distinct('event._id').countDocuments(conditions)

        //console.log(JSON.parse(JSON.stringify(registrations)))

        return { data: JSON.parse(JSON.stringify(registrations)), totalPages: Math.ceil(registrationsCount / limit) }
    } catch (error) {
        handleError(error)
    }
}

export async function getRegistrationsByEvent({ searchString, eventId }: GetRegistrationsByEventParams) {
    try {
        await connectToDb()

        if (!eventId) {
            throw new Error('Event ID is required')
        }

        const eventObjectId = new ObjectId(eventId)

        const registrations = await Registration.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'attendee',
                    foreignField: '_id',
                    as: 'attendee',
                },
            },
            {
                $unwind: '$attendee',
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'event',
                    foreignField: '_id',
                    as: 'event',
                },
            },
            {
                $unwind: '$event',
            },
            {
                $project: {
                    _id: 1,
                    fees: 1,
                    createdAt: 1,
                    eventTitle: '$event.title',
                    eventId: '$event._id',
                    attendee: {
                        $concat: ['$attendee.firstName', ' ', '$attendee.lastName'],
                    },
                },
            },
            {
                $match: {
                    $and: [{ eventId: eventObjectId }, { attendee: { $regex: RegExp(searchString, 'i') } }],
                },
            },
        ])

        //console.log(JSON.parse(JSON.stringify(registrations)));

        return JSON.parse(JSON.stringify(registrations))
    } catch (error) {
        handleError(error)
    }
}