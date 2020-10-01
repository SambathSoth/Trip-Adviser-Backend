const mongoose = require('mongoose')
const Province = require('./Province')

const place = mongoose.Schema({
    place_name: {
        type: String,
        required: true
    },
    place_id: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    province_id: {
        type: Number,
        required: true,
        ref: 'Province.province_id'
    }
})

module.exports = mongoose.model('Place', place)