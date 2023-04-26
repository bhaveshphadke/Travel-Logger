const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary')
const path = require('path')
const connectToMongo = require('./db')
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleware')
require('dotenv').config()
const User = require('./models/UserModel')
// Declarations
const PORT = process.env.PORT || 8000
const app = express()
connectToMongo()

// Middlewares
app.use(cors(
    {
        credentials: true,
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "https://travel-logger.onrender.com"
        ]

    }
))

app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))
cloudinary.config({
    cloud_name: "dibwpamp7",
    api_key: 576223434431196,
    api_secret: 'dUhRSNdYUPTfj7yagBrK0sEpNAA'
})

// Static files
app.use('/', express.static(path.join(__dirname, "build")))

// Routes 
const userWebRoute = require(path.join(__dirname, 'routes/UserRoute/userWebRoute.js'))
const userMobileRoute = require(path.join(__dirname, 'routes/UserRoute/userMobileRoute.js'))
const requestWebRoute = require(path.join(__dirname, 'routes/RequestRoute/requestRoute.js'))


app.use('/api/v1/web/', userWebRoute)
app.use('/api/v1/mobile/', userMobileRoute)
app.use('/api/v1/request/', requestWebRoute)
app.get('/', (req, res) => {
    res.sendFile(path.join("build", "index.html"))
})
app.use(ErrorMiddleware)

app.listen(PORT, (err) => {
    console.log('Listening on 8000');
})