import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
// import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import loggerMiddleware from '../infrastructure/middleware/logger';
import errorMiddleware from '../infrastructure/middleware/error';
import loginRouter from './routes/login';
import booksView from './routes/books';
import container from '../infrastructure/container';
import UserRepository from '../users/user.service';
import Book from '../books/book.model';
import { TBookReview } from '../books/book';
import IUser from '../users/user';

//  Добавление стратегии для использования
// @ts-ignore
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
}, container.get(UserRepository).verify))

// Конфигурирование Passport для сохранения пользователя в сессии
// @ts-ignore
passport.serializeUser((req: any, user: IUser, cb: Function) => {
    console.log(user, 'user serializeUser')
    cb(null, user._id)
})

passport.deserializeUser(async (id: string, cb: Function) => {
    try {
        const user = await container.get(UserRepository).getUser(id);
        cb(null, user)
    } catch (err) {
        cb(err)
    }
})
const app = express()
// @ts-ignore
const server = http.Server(app);
// @ts-ignore
const io = socketIO(server);

app.set('views', process.env.WORKING_DIR + '/views');
app.use(loggerMiddleware);
app.set('view engine', 'ejs');

app.use('public', express.static(process.env.WORKING_DIR + "/public"));
app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', loginRouter);
app.use('/', booksView);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB: string = process.env.DB_USERNAME || 'root';
const PasswordDB: string = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB: string = process.env.DB_NAME || 'library';
const HostDb: string = process.env.DB_HOST || 'mongodb://localhost:27017/';

io.on('connection', (socket: any) => {
const { id } = socket;
console.log(`Socket connected: ${id}`);

// работа с комнатами
const { roomName } = socket.handshake.query;
socket.join(roomName);

socket.on('message-to-room', async (msg: TBookReview) => {
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
        Book.findOneAndUpdate(
        { _id: roomName },
        { $push: { 'reviews': msg } },
        { upsert: true },
        (err, data) => {
            if (err) console.log(err);
        }
        );
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

async function start() {
    try {
        // @ts-ignore
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();