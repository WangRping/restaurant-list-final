const mongoose = require('mongoose')
const Sechema = mongoose.Sechema
const userSchema = new Sechema({
  name: {
    type: String,
    required: true
  }, email: {
    type: String,
    required: true
  }, password: {
    type: String,
    required: true
  }, createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)