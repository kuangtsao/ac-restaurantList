// express 基礎設定
const express = require('express')
const app = express()
const port = 3000

// import and setting handlebars
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
  helpers: multihelpers, 
  defaultLayout: 'main'
 }))
// import local static files
// css 和 js
app.use(express.static('public'))
// 所有餐廳清單
let restaurantList = []

// import body parser
app.use(express.urlencoded({ extended: true }))

// import method override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// import route
const routes = require('./routes')
app.use(routes)

// import mongodb
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.on('open', () => {
  console.log('mongodb is connected.')
})

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

app.listen(port, () => {
  console.log(`ac-restaurantList is running on http://localhost:${port}`)
})
