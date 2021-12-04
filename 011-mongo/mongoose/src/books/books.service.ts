import { injectable } from "inversify";
import IBook from './book';
import Book from './book.model';

interface createBookDto {
    title: IBook['title'];
    authors: IBook['authors'];
    description: IBook['description'];
    favorite: IBook['favorite'];
    fileCover: IBook['fileCover'];
    fileName: IBook['fileName'];
    fileBook: IBook['fileBook'];
    reviews: IBook['reviews'];
}

@injectable()
class BookRepository {
    createBook(book: createBookDto): Promise<IBook> {
        const newBook = new Book(book);
        return newBook.save();
    }
    getBook(id: string) {
        return Book.findById(id);
    }
    getBooks() {
        return Book.find();
    }
    updateBook(id: string, book: createBookDto) {
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

export default BookRepository;