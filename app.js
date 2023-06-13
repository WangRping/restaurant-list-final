const express = require('express')
const mongoose = require('mongoose')
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

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)



// app.post('/restaurants/new', (req, res) => {
//   const newRestaurant = req.body
//   return Restaurant.create(newRestaurant)
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))

// })

// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', { restaurant }))
// })
// app.post('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   const editRestaurant = req.body
//   return Restaurant.findById(id)
//     .then(restaurant => {
//       for (const key in editRestaurant) {
//         restaurant[key] = editRestaurant[key]
//       }
//       return restaurant.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))
// })

// app.post('/restaurants/:id/delete', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))
// })

app.listen(port, () => {
  console.log('伺服器啟動!')
})