const express = require('express')
const router = express.Router()


router.use('/users', require('./users'))
router.use('/posts', require('./posts') )
router.use('/', require('./swagger'))

module.exports = router;