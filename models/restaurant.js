const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 根據 restaurant.json 來定義 schema
const restaurantSchema = new Schema({
  restaurant_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: String
  }
})

module.exports = mongoose.model('restaurant', restaurantSchema)
