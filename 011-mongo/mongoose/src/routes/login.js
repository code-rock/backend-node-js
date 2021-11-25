const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../middleware/file');
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('user/login', {
    title: "Вход в личный кабинет",
  })
})

router.get('/registration', (req, res) => {
  res.render('user/registration', {
    title: "Регистрация"
  })
})

router.post('/registration', upload.none(), async (req, res) => {
  const newUser = new User({ ...req.body });
  try {
    await newUser.save();
    res.redirect('/');
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }
})

router.post('/login', upload.none(), 
  passport.authenticate('local', { 
    successRedirect: '/profile', 
    failureRedirect: '/login' 
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/profile', (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect('user/login', {
        title: "Вход в личный кабинет"
      })
    }
    next()
  },
  function (req, res) {
    res.render('user/profile', { 
      user: req.user,
      title: "Профиль" 
    })
})

module.exports = router;