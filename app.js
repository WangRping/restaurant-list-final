const express = require('express')
const sessiong = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const routes = require('./routers/index')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}

require('./config/mongoose')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(sessiong({ secret: 'ThisIsMySecret', resave: false, saveUninitialized: true }))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log('伺服器啟動!')
})