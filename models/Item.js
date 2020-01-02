const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment')

// Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: moment()
    }
})

module.exports = Item = mongoose.model('item', ItemSchema);