const express = require('express')
const router = express.Router()
const Place = require('../models/Place')

//GET USER
router.get('/', async(req, res) => {
    try {
        const places = await Place.find()
        res.status(200).json(places)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//GET SINGLE USER
router.get('/:placeId', async(req, res) => {
    try {
        const place = await Place.findById(req.params.placeId)
        res.status(200).json(place)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//ADD USER
router.post('/', async(req, res) => {
    const newPlace = new Place({
        place_name: req.body.place_name,
        place_id: req.body.place_id,
        location: req.body.location,
        province_id: req.body.province_id
    })
    try {
        const savedPlace = await newPlace.save()
        res.status(200).json(savedPlace)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//UPDATE USER
router.patch('/:placeId', async(req, res) => {
    try {
        const updatedPlace = await Place.updateOne({ _id: req.params.placeId }, {
            $set: {
                place_name: req.body.place_name,
                location: req.body.location,
                province_id: req.body.province_id
            }
        })
        res.status(200).json(updatedPlace)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//DELETE USER
router.delete('/:placeId', async(req, res) => {
    try {
        const deletedPlace = await Place.deleteOne({ _id: req.params.placeId })
        res.status(200).json(deletedPlace)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router