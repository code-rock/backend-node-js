const express = require("express")
const cors = require("cors")
const formData = require("express-form-data")

const { Book } = require('./models')

const store = {
    books: [],
}

const app = express()

app.use(formData.parse())
app.use(cors())

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
})
app.get('/api/books', (req, res) => {
    res.json(store.books);
})
app.get('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('Книга не найдена')
    }
})
app.post('/api/books', (req, res) => {
    const { books } = store
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})
app.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title: title || books[idx].title, 
            description: description || books[idx].description, 
            authors: authors || books[idx].authors, 
            favorite: favorite || books[idx].favorite, 
            fileCover: fileCover || books[idx].fileCover, 
            fileName: fileName || books[idx].fileName,
        };

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
})
app.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json("Книги и не было, все ок");
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})