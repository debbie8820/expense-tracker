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
  const month = req.query.month
  const cat = req.query.category ? req.query.category : { $ne: '' }
  if (!month) { //沒有選擇月份:只進行類別篩選
    return Records.find({ category: cat })
      .lean()
      .then((records) => {
        const totalAmount = total(records).toLocaleString()
        res.render('index', { records, totalAmount, cat })
      })
      .catch(error => console.log(error))
  }

  return Records.find({ $where: `this.date.toJSON().slice(0, 7) == "${month}"`, category: cat })
    .lean()
    .then((records) => {
      const totalAmount = total(records).toLocaleString()
      res.render('index', { records, totalAmount, month, cat })
    })
    .catch(error => console.log(error))
})

module.exports = router