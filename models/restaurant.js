const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 根據 restaurant.json 來定義 schema
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category:{ 
    type: String,
    required: true 
  },
  image: String,
  location: {
    type: String,
    require: true
  },
  phone: {
    type:String,
    require: true
  },
  google_map: String,
  rating: Number,
  description: String
})

module.exports = mongoose.model('restaurant', restaurantSchema)
