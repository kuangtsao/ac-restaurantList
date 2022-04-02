// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// express 基礎設定
const express = require('express')
const app = express()
const port = 3000

// import and setting handlebars
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
  helpers: multihelpers,
  defaultLayout: 'main'
}))
// import express-session
const session = require('express-session')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


// import local static files
// css 和 js
app.use(express.static('public'))

// import body parser
app.use(express.urlencoded({ extended: true }))

// import method override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// import db
require('./config/mongoose')

// import passport
const usePassport = require('./config/passport')
usePassport(app)

// import route
const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
  console.log(`ac-restaurantList is running on http://localhost:${port}`)
})
