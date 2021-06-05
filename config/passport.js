const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/Users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash('danger_msg', '此 Email 尚未註冊')
          return done(null, false)
        }
        return bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              req.flash('danger_msg', '密碼不正確，請重新填寫')
              return done(null, false)
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
