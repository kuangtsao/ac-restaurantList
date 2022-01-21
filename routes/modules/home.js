const express = require('express')
const router = express.Router()

// 載入 restaurant model
const Restaurant = require('../../models/restaurant')

let restaurantList = []
// 首頁
router.get('/', (req, res) => {
  Restaurant.find().lean()
    .then(restaurants => {
      restaurantList = restaurants
      res.render('index', { restaurants, findingStatus: true })
    })
    .catch(error => console.error(error))
})

// 搜尋
router.get('/search', (req, res) => {
  // 保留原始的搜尋字串
  const originKeyword = req.query.keyword
  // 搜尋字串去除空白與所有關鍵字小寫
  const keyword = originKeyword.split(' ').join('').toLowerCase()
  // 利用 mongoose 下 category || name || name_en
  Restaurant.find({
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

module.exports = router
