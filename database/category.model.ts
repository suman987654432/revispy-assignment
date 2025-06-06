import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
