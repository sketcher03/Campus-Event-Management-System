'use server'

import { CreateRegistrationParams } from "@/types";
import { connectToDb } from "../db";
import Registration from "../db/models/registration.model";
import { handleError } from "../utils";

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