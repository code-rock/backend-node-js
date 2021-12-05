import express from 'express';
import passport from 'passport';
import upload from '../../infrastructure/middleware/file';
import container from '../../infrastructure/container';
import UserRepository from '../../users/user.service';

const router = express.Router();

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
  try {
    await container.get(UserRepository).saveUser({ ...req.body });
    res.redirect('/');
  } catch (e) {
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

router.get('/profile', (req: any, res: any, next) => {
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

export default router;