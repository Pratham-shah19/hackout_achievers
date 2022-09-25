const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const basketModel = require('../models/basket')
const tiffinModel = require('../models/tiffin')
const orderModel = require('../models/order')
const dishModel = require('../models/dish')
const deliveryModel = require('../models/deliveryboy')
const userModel = require('../models/MainUser')
const basketDishModel = require('../models/basketdish')

const getUser = async (req,res) => {
  const userid = req.user.userId
  const user= await userModel.findOne({_id:userid})
  res.status(StatusCodes.OK).json({res:"Success",data:user})

}

const updateUser = async (req,res) => {
  const userid = req.user.userId
  const user = await userModel.findOneAndUpdate({_id:userid},req.body,{new:true,runValidators:true})
  res.status(StatusCodes.OK).json({res:"Success",data:user})

}

const orderHistory = async (req,res) => {
  const userId = req.user.userId
  const order = await orderModel.find({userId,status:'COMPLETED'})
  res.status(StatusCodes.OK).json({res:"Success",data:order})
}

const otpUserValidation = async (req,res) => {
  const { otp } = req.body
  if(!otp){
    throw new BadRequestError('Please Enter OTP')
  }
  const dbotp = await userModel.findOne({_id:req.user.userId})
  const convotp = Number(otp)
  if(dbotp.otp===convotp){
    return res.status(StatusCodes.OK).json({res:"Success",data:dbotp})
  }
  else{
    return res.status(StatusCodes.OK).json({res:"error",err:'Invalid OTP'})
  }
}





module.exports = {getUser,updateUser,orderHistory,otpUserValidation}