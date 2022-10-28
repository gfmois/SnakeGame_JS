const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(require('./src/router/index.js'))

app.listen(3000, () => {
    mongoose.connect('mongodb://localhost:27017/snake_game', {
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to MongoDB Successfully 💾');
    }).catch(() => {
        console.log('Error trying a connection to DB');
    })

    console.log('Server Started on port 3000 🚀');
})