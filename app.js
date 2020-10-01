const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')


const app = express()

// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//IMPORT USER ROUTE
const userRoute = require('./routes/user')
app.use('/users', userRoute)

//IMPORT PROVINCE ROUTE
const provinceRoute = require('./routes/province')
app.use('/provinces', provinceRoute)

//IMPORT PLACE ROUTE
const placeRoute = require('./routes/place')
app.use('/places', placeRoute)

//IMPORT HOTEL ROUTE
const hotelRoute = require('./routes/hotel')
app.use('/hotels', hotelRoute)

//ROUTE
app.get('/', (req, res) => {
    res.send("We are on home")
})

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => console.log("Connected to DB")
)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))