const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')

//GET USER
router.get('/', async(req, res) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//GET SINGLE USER
router.get('/:hotelId', async(req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//ADD USER
router.post('/', async(req, res) => {
    const newHotel = new Hotel({
        hotel_name: req.body.hotel_name,
        hotel_id: req.body.hotel_id,
        location: req.body.location,
        province_id: req.body.province_id,
        hotel_detail: req.body.hotel_detail
    })
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//UPDATE USER
router.patch('/:hotelId', async(req, res) => {
    try {
        const updatedHotel = await Hotel.updateOne({ _id: req.params.hotelId }, {
            $set: {
                hotel_name: req.body.hotel_name,
                location: req.body.location,
                province_id: req.body.province_id,
                hotel_detail: req.body.hotel_detail
            }
        })
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//DELETE USER
router.delete('/:hotelId', async(req, res) => {
    try {
        const deletedHotel = await Hotel.deleteOne({ _id: req.params.hotelId })
        res.status(200).json(deletedHotel)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router