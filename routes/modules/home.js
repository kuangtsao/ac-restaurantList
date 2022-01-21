const express = require('express')
const router = express.Router()

// 載入 restaurant model
const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  Restaurant.find().lean()
    .then(restaurants => {
      res.render('index', { restaurants, findingStatus: true })
    })
    .catch(error => console.error(error))
})

// 首頁 sort by 
router.post('/', (req, res) => {
  const sortOption = req.body.sortOp
  console.log(sortOption)
  let sortObject
  switch(sortOption) {
    case '1':
      sortObject = { name_en: 'asc' }
      break
    case '2':
      sortObject = { name_en: 'desc' }
      break
    case '3':
      sortObject = { location: 'asc' }
      break
    case '4':
      sortObject = { category: 'asc' }
    default:
      sortObject = { _id: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortObject)
    .then(restaurants => {
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
