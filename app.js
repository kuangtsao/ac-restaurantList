// express 基礎設定
const express = require('express')
const app = express()
const port = 3000

// import and setting handlebars
const exphbs = require('express-handlebars')
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// import local static files
// css 和 js
app.use(express.static('public'))
// 所有餐廳清單
let restaurantList = []

// import body parser
app.use(express.urlencoded({ extended: true }))

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

// route setting
// 首頁
app.get('/', (req, res) => {
  return Restaurant.find().lean()
    .then(restaurants => {
      restaurantList = restaurants
      res.render('index', { restaurants, findingStatus: true })
    })
    .catch(error => console.error(error))
})

// 餐廳資料
app.get('/restaurants/:restaurantId', (req, res) => {
  return Restaurant.findOne({ _id: req.params.restaurantId }).lean()
    .then(restaurant => res.render('restaurantinfo', { restaurant }))
    .catch(error => console.error(error))
})

// 搜尋
app.get('/search', (req, res) => {
  // 保留原始的搜尋字串
  const originKeyword = req.query.keyword
  // 搜尋字串去除空白與所有關鍵字小寫
  const keyword = originKeyword.split(' ').join('').toLowerCase()
  // 利用 mongoose 下 category || name || name_en
  return Restaurant.find({
    $or: [{ category: { $regex: keyword } }, { name: { $regex: keyword } }, { name_en: { $regex: keyword, $options: 'i' } }]
  }).lean()
    .then(info => {
      if (info.length > 0) {
        res.render('index', { restaurants: info, findingStatus: true, keyword: originKeyword })
      } else {
        res.render('index', { restaurants: restaurantList, findingStatus: false, keyword: originKeyword })
      }
    })
    .catch(error => console.error(error))
})
app.listen(port, () => {
  console.log(`ac-restaurantList is running on http://localhost:${port}`)
})
