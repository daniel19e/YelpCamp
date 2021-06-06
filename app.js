const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind('connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})