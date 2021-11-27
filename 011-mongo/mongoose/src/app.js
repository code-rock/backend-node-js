"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Book = require('../models/Book');
class BookRepository {
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = new Book(book);
            return yield newBook.save();
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book.findById(id);
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book.find();
        });
    }
    updateBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book.findById(id);
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book.deleteOne({ _id: id });
        });
    }
}
module.exports = BookRepository;
