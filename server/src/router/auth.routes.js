const router = require('express').Router()
const { AuthController } = require('../controller')

router.post('/login', AuthController.login)
router.get('/getProfile', AuthController.getProfile)
router.put('/updateProfile', AuthController.updateProfile)
router.post('/register', AuthController.register)

module.exports = router