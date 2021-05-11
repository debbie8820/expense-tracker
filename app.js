const express = require('express')
const exphbs = require('express-handlebars')


require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})