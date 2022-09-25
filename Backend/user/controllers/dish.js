const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const basketModel = require('../models/basket')
const tiffinModel = require('../models/tiffin')
const orderModel = require('../models/order')
const dishModel = require('../models/dish')
const deliveryModel = require('../models/deliveryboy')
const userModel = require('../models/MainUser')
const basketDishModel = require('../models/basketdish')

const getAllDishes = async (req,res) => {
  //console.log(req.params.tid)
  const tiffinid = req.params.tid;
  if(!tiffinid){
    throw new BadRequestError('Please Enter tiffin id')
  }
  const dishes= await dishModel.find({tiffinid})
  if(!dishes){
    throw new NotFoundError('Please Enter valid tiffin id')
  }
  res.status(StatusCodes.OK).json({res:"Success",data:dishes})
  
}

const getDish = async (req,res) => {
  const dishid = req.params.did;
  if(!dishid){
    throw new BadRequestError('Please Enter Dish id')
  }
  const dish= await dishModel.findOne({_id:dishid})
  if(!dish){
    throw new NotFoundError('Please Enter valid Dish id')
  }
  res.status(StatusCodes.OK).json({res:"Success",data:dish})
}


module.exports = {getAllDishes,getDish}