// 載入 mongoose 連線設定與 restaurant model
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results


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
