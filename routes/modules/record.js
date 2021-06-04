const express = require('express')
const router = express.Router()
const Records = require('../../models/Records')

//create record
router.get('/create', (req, res) => {
  res.render('new')
})

router.post('/created', (req, res) => {
  req.body.userId = req.user._id
  Records.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

//edit record
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  Records.findOne({ userId, _id })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  Records.findOneAndUpdate({ userId, _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete record
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  Records.findOneAndDelete({ userId, _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router