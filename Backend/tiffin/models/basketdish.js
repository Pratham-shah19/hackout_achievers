const mongoose = require('mongoose')
const Basket = require('../models/basket')

const BasketDishSchema = new mongoose.Schema({
  dish:{
    type:mongoose.Types.Subdocument,
    required:[true,'Please provide dish object']
  },
  basketId:{
    type:mongoose.Types.ObjectId,
    ref:"Basket",
    required:[true,'Please provide basket id']
  },
  quantity:{
    type:Number,
    default:1,
    required:false

  }
})


module.exports = mongoose.model('BasketDish',BasketDishSchema)