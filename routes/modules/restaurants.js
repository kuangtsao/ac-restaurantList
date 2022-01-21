const express = require('express')
const router = express.Router()

// 載入 restaurant model
const Restaurant = require('../../models/restaurant')

// 餐廳資料
router.get('/show/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id }).lean()
    .then(restaurant => res.render('restaurantinfo', { restaurant }))
    .catch(error => console.error(error))
})

// 新增餐廳相關
// 渲染新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增表單 post 相關邏輯 
router.post('/new', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 編輯餐廳相關
// 渲染編輯頁面
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// 實作編輯功能
// 暫時找不到原本 json 檔裡的數字 id 怎麽轉，先放著不修(這應該是原始資料設計的問題)，之後重構再弄
router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const {productId, name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/show/${id}`))
    .catch(error => console.error(error))
})

// deal with anchor tag GET -> DELETE
// 參考 stack overflow 
// https://stackoverflow.com/questions/34926876/override-method-get-to-delete-in-nodejs-using-anchor-tag

router.use('/delete/:id',(req, res, next) => {
  if (req.query._method === 'DELETE') {
    req.method = 'DELETE'
    req.url = req.path
  }
  next()
})

// 實作刪除功能
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
