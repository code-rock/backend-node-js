const express = require('express');
const router = express.Router();
const upload = require('../../middleware/file');
const Book = require('../../models')

router.get('/', (req, res) => {
    res.json(store.books);
})

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        const { title, fileBook } = book;

        res.download(__dirname + '/../public/books/' + fileBook, fileBook, err => {
            if (err) {
                res.status(404).json('Книги с таким ID не существует');
            }
        });

        res.status(200).json(`Книга ${title} скачена`);
    } catch (e) {
        console.error(e);
        res.status(404).json('Книга не найдена');
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json('Книга не найдена');
    }
})

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

router.post('/', upload.none(), async (req, res) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(201).json(newBook)
    } catch (e) {
        console.error(e);
        res.status(500).json('Книга не была сохранена. Что-то пошло не так..');
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.json(book);
    } catch (e) {
        res.status(404).json("Книга не найдена");
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book.deleteOne({ _id: id });
        res.json('ok');
    } catch (e) {
        res.status(404);
        res.json("Книги и не было, все ок");
    }
})

module.exports = router;