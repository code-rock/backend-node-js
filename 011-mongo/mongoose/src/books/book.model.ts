import { Schema, model } from 'mongoose';
import IBook from './book';

const bookSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: '0',
    },
    fileCover: {
        type: String,
        default: '/',
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: '/',
    },
    reviews: {
        type: Array,
        default: [],
    }
});

export default model<IBook & Document>('Book', bookSchema);