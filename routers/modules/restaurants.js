const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const restaurant = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const newRestaurant = req.body
  newRestaurant.userId = userId
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.post('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const editRestaurant = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (const key in editRestaurant) {
        restaurant[key] = editRestaurant[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  console.log(userId, _id)
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router