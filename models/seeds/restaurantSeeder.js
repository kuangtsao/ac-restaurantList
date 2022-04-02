// 載入 mongoose 連線設定與 restaurant model
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results

// 暫時想不到怎麼用 array of object 漂亮的處理預設 user 先分成兩個
const defaultUser1 = { 
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
}
const defaultUser2 = { 
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('createing users...')
  // 先產生 user 再丟入 restaurant list///
  // 密碼加鹽
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(defaultUser1.password, salt))
    .then(hash => User.create({
        name: defaultUser1.name,
        email: defaultUser1.email,
        password: hash
    }))
    .then(salt => bcrypt.hash(defaultUser2.password, salt))
    .then(hash => User.create({
        name: defaultUser2.name,
        email: defaultUser2.email,
        password: hash
    }))
    .catch(err => console.log(err))
    .finally(() => process.exit())
})

db.once('open', () => {
  console.log('loading restaurantList')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('all seeds is loaded.')
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})
