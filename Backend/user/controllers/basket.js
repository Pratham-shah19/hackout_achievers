const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const basketModel = require('../models/basket')
const tiffinModel = require('../models/tiffin')
const orderModel = require('../models/order')
const dishModel = require('../models/dish')
const deliveryModel = require('../models/deliveryboy')
const userModel = require('../models/MainUser')
const basketDishModel = require('../models/basketdish')
const { object } = require('joi')

const openBasketButtonDisplay = async (req,res) => {
  // console.log(req.params.tid)
  const tiffinId = req.params.tid
  const userId = req.user.userId
  if(!tiffinId){
    throw new BadRequestError('Please Enter Dish id')
  }
  const basket = await basketModel.findOne({tiffinId,userId})
  if(!basket._id){
    throw new NotFoundError('Don\'t Render Button')
  }else{
    res.status(StatusCodes).json({res:'Success',data:basket})
  }
}

const addToBasketButton = async (req,res) => {
  const userId = req.user.userId
  const tiffinId = req.params.uid
  const userBasket = await basketModel.findOne({userId})
  let i
  if(!userBasket){
    const newbasket={}
    newbasket.userId = userId
    newbasket.tiffinId = tiffinId
    userBasket.price += req.body.dish.price
    newbasket.price = userBasket.price + req.body.deliveryfee
    newbasket.deliveryfee = req.body.deliveryfee
    const newuser = await basketModel.create(newbasket)
    const newbasketdish = {
      basketId:newuser._id,
      dish:req.body.dish,
      quantity:req.body.quantity
    } 
    const newentry = await basketDishModel.create(newbasketdish)
    res.status(StatusCodes.OK).json({res:'Success',data:newentry})
  }
  else{
    const basketdish = basketModel.findOne({userId,tiffinId})
    if(!basketdish){
      const olddeleteduser = await basketModel.findOneAndDelete({userId:basketdish.userId,tiffinId:basketdish.tiffinId})
      const deletebasketid = await basketDishModel.deleteMany({basketId:olddeleteduser.basketId})
      const newbasket={}
      newbasket.userId = userId
      newbasket.tiffinId = tiffinId
      olddeleteduser.price += req.body.dish.price
      newbasket.price = userBasket.price + req.body.deliveryfee
      newbasket.deliveryfee = req.body.deliveryfee
      const newuser = await basketModel.create(newbasket)
      const newbasketdish = {
      basketId:newuser._id,
      dish:req.body.dish,
      quantity:req.body.quantity
    }
    const newentry = await basketDishModel.create(newbasketdish)
    res.status(StatusCodes.OK).json({res:'Success',data:newentry})
    }
    else{
      const newbasketdish = {
        basketId:basketdish._id,
        dish:req.body.dish,
        quantity:req.body.quantity
      }
      const newentry = await basketDishModel.create(newbasketdish)
      res.status(StatusCodes.OK).json({res:'Success',data:newentry})
    }
  }
}

const paymentOrder = async (req,res) => {
  console.log('payment order')
}

const openBasket = async (req,res) => {
  console.log('Open Basket')
}


module.exports = {openBasketButtonDisplay,addToBasketButton,paymentOrder,openBasket}