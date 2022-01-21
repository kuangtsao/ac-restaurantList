// 載入 mongoose 與 restaurant model
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true,useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

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
