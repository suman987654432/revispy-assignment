import mongoose, { Schema, Document } from 'mongoose';

export interface IUserInterests extends Document {
    userId: mongoose.Types.ObjectId;
    interests: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserInterestsSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    interests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }]
}, {
    timestamps: true
});

export default mongoose.models.UserInterests || mongoose.model<IUserInterests>('UserInterests', UserInterestsSchema);
