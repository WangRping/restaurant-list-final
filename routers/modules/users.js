const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/users/login'
// }))

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errors = []
      errors.push(info)
      return res.render('login', { errors });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    console.log(errors)
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了。' })
        res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出。')
  res.redirect('/users/login')
})

module.exports = router