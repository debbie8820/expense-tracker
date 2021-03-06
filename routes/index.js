const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const record = require('./modules/record')
const filter = require('./modules/filter')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')


router.use('/users', users)
router.use('/auth', auth)
router.use('/records', authenticator, record)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)

module.exports = router