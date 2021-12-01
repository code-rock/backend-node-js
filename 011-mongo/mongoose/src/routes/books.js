const express = require('express');
const router = express.Router();
const upload = require('../middleware/file');
const BooksRepository = require('../container');

router.get('/', async (req, res) => {
    const repo = container.get(BooksRepository);
    const books = await repo.getBooks();

    res.render("library/index", {
        title: "Библиотека",
        books: books,
        user: req.user
    });
});

router.get('/create', (req, res) => {
    res.render("library/create", {
        title: "Создать новую книгу",
        book: {},
        user: req.user
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
        reviews: [],
    });

    try {
        const repo = container.get(BooksRepository);
        await repo.createBook(newBook);
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const repo = container.get(BooksRepository);
        const book = await repo.getBook(id);

        res.render("library/view", {
            title: "Просмотр",
            book: book,
            notSet: 'Неизвестно',
            user: req.user
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const repo = container.get(BooksRepository);
        await repo.deleteBook(id);
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
        const repo = container.get(BooksRepository);
        book = await repo.getBook(id);
    } catch (e) {
        res.status(404).redirect('/404');
    }

    res.render("library/create", {
        title: "Создать новую книгу",
        book,
        user: req.user,
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
        const repo = container.get(BooksRepository);
        await repo.updateBook(id, {
            ...req.body,
            fileCover,
            fileBook
        });
        res.redirect(`/${id}`);
    } catch (e) {
        res.status(404).redirect('/404');
    }
})

module.exports = router;