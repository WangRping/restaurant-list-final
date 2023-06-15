if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurants = require('../../restaurant.json')
const db = require('../../config/mongoose')
const seedRestaurants = restaurants.results

// db.once('open', () => {
//   for (let i = 1; i <= 2; i++) {
//     bcrypt.genSalt(10)
//       .then(salt => bcrypt.hash('12345678', salt))
//       .then(hash => User.create({
//         name: `user${i}`,
//         email: `user${i}@example.com`,
//         password: hash
//       })
//       )
//   }

//   const userId = ''
//   User.findOne({ name: 'user1' })
//     .then(user => userId = user._id)
//     .then(() => {
//       for (let i = 0; i <= 2; i++) {
//         seedRestaurants[i].userId = userId
//       }
//     })
// })

db.once('open', async () => {
  for (let i = 1; i <= 2; i++) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('12345678', salt);
    await User.create({
      name: `user${i}`,
      email: `user${i}@example.com`,
      password: hash
    });
  }

  let userId = '';
  let user = await User.findOne({ name: 'user1' });
  userId = user._id;
  for (let i = 0; i <= 2; i++) {
    seedRestaurants[i].userId = userId;
    await Restaurant.create(seedRestaurants[i])
  }

  user = await User.findOne({ name: 'user2' })
  userId = user._id
  for (let i = 3; i <= 5; i++) {
    seedRestaurants[i].userId = userId;
    await Restaurant.create(seedRestaurants[i])
  }
  process.exit()
});

