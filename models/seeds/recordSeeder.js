const Record = require('../Record')
const moment = require('moment')
const db = require('../../config/mongoose')

const category = ['home', 'utensils', 'pen', 'laugh-squint', 'shuttle-van']

db.once('open', () => {
  for (i = 0; i < 11; i++) {
    let randomCategory = Math.floor(Math.random() * 5)
    let randomAmount = Math.floor(Math.random() * 501)
    Record.create({
      name: '測試' + i,
      date: '01.02.2012',
      category: category[randomCategory],
      amount: randomAmount
    })
  }
  console.log('Seeds are created!')
})

