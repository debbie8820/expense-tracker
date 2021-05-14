const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
const bodyParser = require('body-parser')

const Records = require('./models/Records')


require('./config/mongoose')

const app = express()




app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    total: function (amount) {
      let total = 0
      total += amount
      console.log(total)
    },
    totalReturn: function () {
      let total = 0
      return total
    },
    simplifyTime: function (time) {
      const newTime = moment(time).format('YYYY-MM-DD')
      return newTime
    },
    eq: function (v1, v2) {
      return v1 === v2
    }
  }
})
)

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  let total = 0
  Records.find()
    .lean()
    .then((records) => {
      res.render('index', { records })
    })
    .catch(error => console.log(error))
})


//create record
app.get('/records/create', (req, res) => {
  res.render('new')
})

app.post('/records/created', (req, res) => {
  Records.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

//edit record
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Records.findById(id)
    .lean()
    .then(record => {
      console.log(record)
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Records.findById(id)
    .then((record) => {
      record.name = req.body.name
      record.date = req.body.date
      record.category = req.body.category
      record.amount = req.body.amount
      return record.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

//delete record
app.get('/records/:id/delete', (req, res) => {
  const id = req.params.id
  Records.findById(id)
    .then((record) => {
      record.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

//filter
app.get('/filter', (req, res) => {
  const cat = req.query.category
  Records.find({ category: cat })
    .lean()
    .then((records) => {
      res.render('index', { records, cat })
    })
    .catch(error => console.log(error))
})





app.listen(3000, () => {
  console.log('App is running on port 3000')
})