const mongoose = require('mongoose')
const argon2 = require('argon2')
const uuidV4 = require('uuid').v4

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    uuid: { type: String, unique: true },
    avatar: { type: String },
    score: [{ type: mongoose.Schema.Types.ObjectId, ref: 'score' }]
})

UserSchema.pre('validate', async function() {
    this.password = await argon2.hash(this.password)
    this.avatar = `https://api.multiavatar.com/${this.username}.png`
    this.uuid = uuidV4()
})

module.exports = mongoose.model('user', UserSchema)