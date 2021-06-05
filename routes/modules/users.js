const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}))

router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '請填寫所有*號欄位' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不符合' })
  }

  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: '此 Email 已被註冊' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => {
          req.flash('success_msg', '你已成功註冊')
          res.redirect('/users/login')
        })
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router