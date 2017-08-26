const router = require('express').Router()

router.use('/v1', require('./accounts'))
router.use('/v1', require('./sessions'))

module.exports = router
