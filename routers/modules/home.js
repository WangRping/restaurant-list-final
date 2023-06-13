const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurant => {
      res.render('index', { restaurants: restaurant })
    })
})

router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurant => {
      const filterRestaurants = restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
})


module.exports = router