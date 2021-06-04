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
  const userId = req.user._id
  const month = req.query.month
  const formatMonth = month ? new Date(month) : null
  const nextMonth = formatMonth ? new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)) : null

  const cat = req.query.category ? req.query.category : { $ne: '' } //若沒有選擇類別則篩出所有類別
  const dateQuery = month ? { $gte: formatMonth, $lt: nextMonth } : { $ne: '' } //若沒有選擇月份則篩出所有月份

  return Records.find({ date: dateQuery, category: cat, userId })
    .lean()
    .then((records) => {
      const totalAmount = total(records).toLocaleString()
      res.render('index', { records, totalAmount, month, cat })
    })
    .catch(error => console.log(error))
})

module.exports = router