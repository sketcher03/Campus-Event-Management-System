import { model, Schema, models, Document } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    title: string;
    description: string;
}

const CategorySchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;