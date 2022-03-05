const { Schema, model } = require('mongoose')

var schema = new Schema({
    command: String,
    cooldown: String,
    userID: String,
})

module.exports = model('commands', schema)