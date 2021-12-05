import IUser from './user';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
    },
});

export default model<IUser & Document>('User', userSchema);