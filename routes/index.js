const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const record = require('./modules/record')
const filter = require('./modules/filter')
const users = require('./modules/users')


router.use('/users', users)
router.use('/records', record)
router.use('/filter', filter)
router.use('/', home)

module.exports = router