const express = require("express")
const cors = require("cors")

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express()

app.use(cors())
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})