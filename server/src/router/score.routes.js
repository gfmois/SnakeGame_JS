const router = require('express').Router()
const { ScoreController } = require('../controller/index')

router.get('/userScore/:id', (req, res) => {
    res.json('Users Score')
})

router.get('/topPlayers', ScoreController.getTopPlayers)

router.get('/getUserScore', ScoreController.getUserScore)
router.put('/updateScore', ScoreController.updateScore)

module.exports = router