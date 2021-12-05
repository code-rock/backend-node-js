import express from 'express';
import upload from '../../infrastructure/middleware/file';
import container from '../../infrastructure/container';
import BooksRepository from '../../books/books.service';

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await container.get(BooksRepository).getBooks();

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
]), async (req: any, res: any) => {
    const fileCover = req.files.fileCover ? req.files.fileCover[0].path: '';
    const fileBook = req.files.fileBook ? req.files.fileBook[0].path: '';
    
    try {
        await container.get(BooksRepository).createBook({
            ...req.body,
            fileCover,
            fileBook,
            reviews: [],
        });
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await container.get(BooksRepository).getBook(id);

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
        await container.get(BooksRepository).deleteBook(id);
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
        book = await container.get(BooksRepository).getBook(id);
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
]), async (req: any, res: any) => {
    const fileCover = req.files.fileCover ? req.files.fileCover[0].path: '';
    const fileBook = req.files.fileBook ? req.files.fileBook[0].path: '';
    const { id } = req.params;

    try {
        await container.get(BooksRepository).updateBook(id, {
            ...req.body,
            fileCover,
            fileBook
        });
        res.redirect(`/${id}`);
    } catch (e) {
        res.status(404).redirect('/404');
    }
})

export default router;