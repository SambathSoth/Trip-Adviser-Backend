const express = require('express')
const router = express.Router()
const Province = require('../models/Province')

//GET USER
router.get('/', async(req, res) => {
    try {
        const provinces = await Province.find()
        res.status(200).json(provinces)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//GET SINGLE USER
router.get('/:provinceId', async(req, res) => {
    try {
        const province = await Province.findById(req.params.provinceId)
        res.status(200).json(province)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//ADD USER
router.post('/', async(req, res) => {
    const newProvince = new Province({
        province_name: req.body.province_name,
        province_id: req.body.province_id,
        location: req.body.location
    })
    try {
        const savedProvince = await newProvince.save()
        res.status(200).json(savedProvince)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//UPDATE USER
router.patch('/:provinceId', async(req, res) => {
    try {
        const updatedProvince = await Province.updateOne({ _id: req.params.uprovinceId }, {
            $set: {
                province_name: req.body.province_name,
                province_id: req.body.province_id,
                location: req.body.location,
            }
        })
        res.status(200).json(updatedProvince)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//DELETE USER
router.delete('/:provinceId', async(req, res) => {
    try {
        const deletedProvince = await Province.deleteOne({ _id: req.params.provinceId })
        res.status(200).json(deletedProvince)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router