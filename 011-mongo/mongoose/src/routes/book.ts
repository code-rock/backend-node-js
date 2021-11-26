const Book = require('../models/Book');

interface BookTypes {
    title: string;
    authors: string;
    description: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    reviews: Array<{ username: string; text: string }>;
}

interface BookRepositoryTypes {
    createBook: (book: BookTypes) => BookTypes | Error;
    getBook: (id: string) => BookTypes | Error;
    getBooks: () => Array<BookTypes> | Error;
    updateBook: (id: string) => BookTypes | Error;
    deleteBook: (id: string) => Boolean | Error;
}

class BookRepository implements BookRepository {
    async createBook(book: BookTypes) {
        const newBook = new Book(book);
    
        try {
            const savedBook = await newBook.save();
            return savedBook
        } catch (err) {
            return err;
        }
    }
    async getBook(id: string) {
        try {
            return await Book.findById(id);
        } catch (err) {
            return err;
        }
    }
    async getBooks() {
        try {
            return await Book.find();
        } catch (err) {
            return err;
        }
    }
    async updateBook(id: string) {
        try {
            return await Book.findById(id);
        } catch (err) {
            return err;
        }
    }
    async deleteBook(id: string) {
        try {
            return await Book.deleteOne({ _id: id });
        } catch (err) {
            return err;
        }
    }
}

module.exports = BookRepository;