const express = require('express')
const router = express.Router()

const users = require('./modules/users')
router.use('/users', users)

const home = require('./modules/home')
router.use('/', home)

const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

module.exports = router
