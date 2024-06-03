import { model, Schema, models, Document } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    createdAt?: Date;
    image: string;
    startDate?: Date;
    endDate?: Date;
    price?: string;
    isFree?: boolean;
    url?: string;
    category?: { _id: string, name: string };
    organizer?: { _id: string, firstName: string, lastName: string };
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.User || model('Event', EventSchema);

export default Event;