const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('express').Router()
const cors = require('cors')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(morgan('dev'))
router.use(cors())

router.use('/score', require('./score.routes'))
router.use('/auth', require('./auth.routes'))

module.exports = router