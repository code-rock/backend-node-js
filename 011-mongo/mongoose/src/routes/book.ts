import { injectable } from "inversify";
const Book = require('../models/Book');

type Reviewer  = { 
    username: string; 
    text: string 
}

interface BookTypes {
    title: string;
    authors: string;
    description: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    reviews: Array<Reviewer>;
}

interface IBookRepository {
    createBook: (book: BookTypes) => Promise<BookTypes>;
    getBook: (id: string) => Promise<BookTypes>;
    getBooks: () => Promise<Array<BookTypes>>;
    updateBook: (id: string, book: BookTypes) => Promise<BookTypes>;
    deleteBook: (id: string) => Promise<Boolean>;
}

@injectable()
class BookRepository implements IBookRepository {
    createBook(book: BookTypes) {
        const newBook = new Book(book);
        return newBook.save();
    }
    getBook(id: string) {
        return Book.findById(id);
    }
    getBooks() {
        return Book.find();
    }
    updateBook(id: string, book: BookTypes) {
        return Book.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }
    deleteBook(id: string) {
        return Book.deleteOne({ _id: id });
    }
}

module.exports = BookRepository;