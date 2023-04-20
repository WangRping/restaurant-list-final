const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurants = restaurants.results.filter(item => { return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()) || item.name_en.toLowerCase().includes(keyword.toLowerCase()) })
  // const filterRestaurants = restaurants.results.filter(item => { return [item.name, item.name_en, item.category].some(paramsItem => { paramsItem.toLowerCase().includes(keyword.toLowerCase()) }) })
  res.render('index', { restaurants: filterRestaurants, keyword })
})
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(item => item.id === Number(req.params.id))
  res.render('show', { restaurant })
})

app.listen(port, () => {

})