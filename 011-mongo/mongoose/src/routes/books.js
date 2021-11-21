const express = require('express');
const router = express.Router();
const upload = require('../middleware/file');
const Book = require('../models/Book')

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.render("library/index", {
        title: "Библиотека",
        books: books
    });
});

router.get('/create', (req, res) => {
    res.render("library/create", {
        title: "Создать новую книгу",
        book: {}
    });
});

router.post('/create', upload.fields([
    { name: 'fileCover', maxCount: 1 },
    { name: 'fileBook', maxCount: 1 }
  ]), async (req, res) => {
    const fileCover = req.files.fileCover ? req.files.fileCover[0].path: '';
    const fileBook = req.files.fileBook ? req.files.fileBook[0].path: '';
    
    const newBook = new Book({
        ...req.body,
        fileCover,
        fileBook,
    });

    try {
        await newBook.save();
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("library/view", {
        title: "Просмотр",
        book: book,
        notSet: 'Неизвестно'
    });
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book.deleteOne({ _id: id });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
    res.redirect('/');
})

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("library/create", {
        title: "Создать новую книгу",
        book,
    });
})


router.post('/update/:id',  upload.fields([
    { name: 'fileCover', maxCount: 1 },
    { name: 'fileBook', maxCount: 1 }
  ]), async (req, res) => {
    const fileCover = req.files.fileCover ? req.files.fileCover[0].path: '';
    const fileBook = req.files.fileBook ? req.files.fileBook[0].path: '';
    const { id } = req.params;

    try {
        await Book.findByIdAndUpdate(id, {
            ...req.body,
            fileCover,
            fileBook
        }, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.redirect(`/${id}`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
})

module.exports = router;