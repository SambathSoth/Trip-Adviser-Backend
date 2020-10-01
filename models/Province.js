const mongoose = require('mongoose')

const province = mongoose.Schema({
    province_name: {
        type: String,
        required: true,
        unique: true
    },
    province_id: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Province', province)