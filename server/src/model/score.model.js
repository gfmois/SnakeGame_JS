const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    mode: String,
    points: String
})

module.exports = mongoose.model('score', ScoreSchema)