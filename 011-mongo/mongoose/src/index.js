const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const loginRouter = require('./routes/login');
const booksView = require('./routes/books');
const booksRouter = require('./routes/api/books');
const usersRouter = require('./routes/api/users');

const User = require('./models/User');
const Book = require('./models/Book');
/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
*/
function verify (username, password, cb) {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
          return cb(err) 
      } else if (!user || user.password !== password) { 
          return cb(null, false) 
      } else {
          return cb(null, user)
        }
    })
}
  
  const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
  }
  
  //  Добавление стратегии для использования
  passport.use(new LocalStrategy(options, verify))
  
  // Конфигурирование Passport для сохранения пользователя в сессии
  passport.serializeUser((user, cb) => {
    console.log(user, 'user serializeUser')
    cb(null, user._id)
  })
  
  passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        cb(null, user)
    } catch (err) {
      cb(err)
    }
  })
  
const app = express()
const server = http.Server(app);
const io = socketIO(server);

app.set('views', __dirname + '/views');
app.use(loggerMiddleware);
app.set('view engine', 'ejs');

app.use('public', express.static(__dirname + "/public"));
app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', loginRouter);
app.use('/', booksView);
app.use('/api/user', usersRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'library';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  // работа с комнатами
  const { roomName } = socket.handshake.query;
  socket.join(roomName);
  socket.on('message-to-room', async (msg) => {
      msg.type = `room: ${roomName}`;
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