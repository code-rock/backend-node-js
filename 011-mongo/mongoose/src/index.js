const express = require("express")
// const cors = require("cors")
const mongoose = require('mongoose');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const booksView = require('./routes/books');
const booksRouter = require('./routes/api/books');
const usersRouter = require('./routes/api/users');

const app = express()

// app.use(cors())
app.set('views', __dirname + '/views');
app.use(loggerMiddleware);
// app.use(express.json());
// app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('public', express.static(__dirname + "/public"));

app.use('/', booksView);
app.use('/api/user', usersRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'library';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
    try {
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();