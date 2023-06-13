const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurants = require('./restaurant.json')
const routes = require('./routers/index')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}

require('./config/mongoose')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log('伺服器啟動!')
})