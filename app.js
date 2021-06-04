const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')

const PORT = process.env.PORT || 3000

const routes = require('./routes')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    simplifyTime: function (time) {
      const newTime = moment(time).format('YYYY-MM-DD')
      return newTime
    },
    eq: function (v1, v2) {
      return v1 === v2
    }
  }
}))

app.set('view engine', 'hbs')
app.use(session({
  secret: 'debbieSecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  next()
})
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})