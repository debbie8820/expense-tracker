const express = require('express')
const router = express.Router()
const Records = require('../../models/Records')

function total(records) {
  let total = 0
  records.map((record) => {
    total += record.amount
  })
  return total
}

router.get('/', (req, res) => {
  Records.find()
    .lean()
    .then((records) => {
      const totalAmount = total(records).toLocaleString()
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router