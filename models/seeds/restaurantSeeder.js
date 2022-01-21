// 載入 mongoose 與 restaurant model
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

// mongoose 連線設定
require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('loading seeds from restaurant.js')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('all seeds is loaded.')
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})
