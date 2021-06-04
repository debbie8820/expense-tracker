const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    console.log('請填寫所有*號欄位')
    return res.render('register', { name, email, password, confirmPassword })
  }

  if (password !== confirmPassword) {
    console.log('密碼和輸入密碼不符合')
    return res.render('register', { name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) return console.log('此 Email 已被註冊')
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({
            name,
            email,
            password: hash
          })
        })
    })
    .then(() => res.redirect('/users/login')) //記得加上req.flash(你已成功註冊)
    .catch(err => console.log(err)) //需改寫:將錯誤傳給使用者
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router