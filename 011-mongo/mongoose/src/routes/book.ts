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
    createBook: (book: BookTypes) => Promise<BookTypes>;
    getBook: (id: string) => Promise<BookTypes>;
    getBooks: () => Promise<Array<BookTypes>>;
    updateBook: (id: string) => Promise<BookTypes>;
    deleteBook: (id: string) => Promise<Boolean>;
}

class BookRepository implements BookRepository {
    async createBook(book: BookTypes) {
        const newBook = new Book(book);
        return await newBook.save();
    }
    async getBook(id: string) {
        return await Book.findById(id);
    }
    async getBooks() {
        return await Book.find();
    }
    async updateBook(id: string) {
        return await Book.findById(id);
    }
    async deleteBook(id: string) {
        return await Book.deleteOne({ _id: id });
    }
}

module.exports = BookRepository;