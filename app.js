const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurants = require('./restaurant.json')
const restaurants = require('./models/restaurant')
const restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return restaurants.find()
    .lean()
    .then(restaurant => {
      res.render('index', { restaurants: restaurant })
    })
})
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword
  restaurants.find()
    .lean()
    .then(restaurant => {
      const filterRestaurants = restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
})

app.post('/new', (req, res) => {
  const newRestaurant = req.body
  return restaurants.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body
  return restaurants.findById(id)
    .then(restaurant => {
      for (const key in editRestaurant) {
        restaurant[key] = editRestaurant[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {

})