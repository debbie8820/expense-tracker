const Record = require('../Records')
const recordList = require('./record.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(recordList)
    .then(() => {
      console.log('Seeds are created!')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
})
