"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Book = require('../models/Book');
var BookRepository = /** @class */ (function () {
    function BookRepository() {
    }
    BookRepository.prototype.createBook = function (book) {
        var newBook = new Book(book);
        return newBook.save();
    };
    BookRepository.prototype.getBook = function (id) {
        return Book.findById(id);
    };
    BookRepository.prototype.getBooks = function () {
        return Book.find();
    };
    BookRepository.prototype.updateBook = function (id, book) {
        return Book.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    };
    BookRepository.prototype.deleteBook = function (id) {
        return Book.deleteOne({ _id: id });
    };
    BookRepository = __decorate([
        (0, inversify_1.injectable)()
    ], BookRepository);
    return BookRepository;
}());
module.exports = BookRepository;
