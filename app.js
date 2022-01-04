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
// 餐廳清單
const restaurantList = require('./restaurant.json')

// 管理搜尋是否找到餐廳的 flag，一開始先當作有找到，提供給 index.handlebars 去作警告渲染
let findingStatus = true

// route setting
// 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, findingStatus: findingStatus })
})

// 餐廳資料
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(function findRestaurantName (restaurant) {
    return restaurant.id.toString() === req.params.restaurantId
  })
  res.render('restaurantinfo', { restaurant: restaurant })
})

// 搜尋
app.get('/search', (req, res) => {
  // 搜尋字串去除空白
  const keyword = req.query.keyword.split(' ').join('')
  // 只要關鍵字符合其中一個，就返回內容到陣列
  const information = restaurantList.results.filter(information => information.category.includes(keyword) || information.name.includes(keyword) || information.name_en.toLowerCase().includes(keyword.toLowerCase()))

  // 搜尋時會重複多次 search 路由，所以每次進入都要重新管理 findingStatus 的狀態
  if (information.length > 0) {
    findingStatus = true
    res.render('index', { restaurants: information, findingStatus: findingStatus, keyword: keyword})
  } else {
    findingStatus = false
    res.render('index', { restaurants: restaurantList.results, findingStatus: findingStatus, keyword: keyword })
  }
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
