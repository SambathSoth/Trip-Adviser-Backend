const express = require('express')
const router = express.Router()
const User = require('../models/User')

//GET USER
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//GET SINGLE USER
router.get('/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//ADD USER
router.post('/', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        user_id: req.body.user_id,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//UPDATE USER
router.patch('/:userId', async(req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId }, {
            $set: {
                username: req.body.username,
                password: req.body.password,
            }
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//DELETE USER
router.delete('/:userId', async(req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.userId })
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router