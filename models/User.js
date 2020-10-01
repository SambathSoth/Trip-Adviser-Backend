const { ObjectId, Int32 } = require('mongodb')
const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', user)