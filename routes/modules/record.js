const express = require('express')
const router = express.Router()
const Records = require('../../models/Records')

//create record
router.get('/create', (req, res) => {
  res.render('new')
})

router.post('/created', (req, res) => {
  Records.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

//edit record
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Records.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Records.findById(id)
    .then((record) => {
      record.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router