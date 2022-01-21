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

// import route
const routes = require('./routes')
app.use(routes)


app.listen(port, () => {
  console.log(`ac-restaurantList is running on http://localhost:${port}`)
})
