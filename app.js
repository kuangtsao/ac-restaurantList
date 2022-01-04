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
  const restaurant = restaurantList.results.find(function findRestaurantName(restaurant) {
    return restaurant.id.toString() === req.params.restaurantId
  })
  res.render('restaurantinfo', { restaurant: restaurant })
  
})
// 搜尋
app.get('/search', (req, res) => {
  // 搜尋字串去除空白
  const keyword = req.query.keyword.trim()
  // 只要關鍵字符合其中一個，就返回內容到陣列
  const information = restaurantList.results.filter(information => information.category.includes(keyword) || information.name.includes(keyword) || information.name_en.toLowerCase().includes(keyword.toLowerCase()))

  if (information.length === 0) {
    res.render('index', { restaurants: restaurantList.results })
  } else {
    res.render('index', { restaurants: information })
  }
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
