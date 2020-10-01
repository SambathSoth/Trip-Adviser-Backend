const mongoose = require('mongoose')
const Province = require('./Province')

const hotel = mongoose.Schema({
    hotel_name: {
        type: String,
        required: true
    },
    hotel_id: {
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
    },
    hotel_detail: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Hotel', hotel)