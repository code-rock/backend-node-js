const express = require("express")
const cors = require("cors")

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksView = require('./routes/books');
const booksRouter = require('./routes/api/books');
const usersRouter = require('./routes/api/users');

const app = express()

// app.use(cors())
app.use(loggerMiddleware);
// app.use(express.json());
// app.use(express.urlencoded());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + "/public"));

app.use('/', booksView);
app.use('/api/user', usersRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0');

console.log(`Сервер слушает порт: ${PORT}`);