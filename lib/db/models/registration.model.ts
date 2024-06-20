import { Schema, model, models, Document } from 'mongoose'

export interface IRegistration extends Document {
    event: {
        _id: string
        title: string
    }
    attendee: {
        _id: string
        firstName: string
        lastName: string
        username: string
    }
    createdAt: Date
    transactionId: string
    fees: string
}

export type IRegistrationItem = {
    _id: string
    fees: string
    createdAt: Date
    eventTitle: string
    eventId: string
    attendee: string
}

const RegistrationSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    attendee: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    transactionId: { type: String },
    fees: { type: String, default: "0" }
})

const Registration = models.Registration || model('Registration', RegistrationSchema);

export default Registration;