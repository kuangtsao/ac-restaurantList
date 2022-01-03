// express 基礎設定
const express = require('express')
const app = express()
const port = 3000

// import and setting handlebars
const exphbs = require('express-handlebars')
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// import local static files
// css 和 js
app.use(express.static('public'))
// 餐廳清單
const restaurantList = require('./restaurant.json')

// route setting
// 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
// 餐廳資料
app.get('/restaurants/:restaurantId', (req, res) => {
  res.render('restaurantinfo')
})
// 搜尋
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
