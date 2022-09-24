const tiffinModel = require('../models/tiffin')
const dishModel = require('../models/dish')
const orderModel = require('../models/order')
const basketdishModel = require('../models/basketdish')

const {StatusCodes} = require('http-status-codes')

//errors
const {BadRequestError,NotFoundError} = require('../errors')
const basketdish = require('../models/basketdish')

const getTiffinDetails = async(req,res)=>{
    const tiffinId = req.params.id 
    const tiffin = await tiffinModel.findOne({_id:tiffinId})
    if(!tiffin)
    {
        throw new NotFoundError(`No tiffin with tiffin id ${tiffinId}`)
    }
    res.send(StatusCodes.OK).json({res:"success",data:tiffin})
}

const createDish = async(req,res)=>{
    const {name,imageUrl,tiffinId,ingredients,price} = req.body
    if(!name || !imageUrl || !tiffinId || !ingredients || !price)
    {
        throw new BadRequestError('Please provide necessary details')
    }
    const dish = await dishModel.create(req.body)
    res.status(StatusCodes.CREATED).json({res:"success",data:dish})
}

const getDishesByTiffinId = async(req,res)=>{
    const tiffinId = req.params.id
    const dishes = await dishModel.find({tiffinId})
    if(!dishes)
    {
        throw new NotFoundError(`No dish with tiffin id ${tiffinId}`)
    }
    res.status(StatusCodes.OK).json({res:"success",data:dishes})

}

const getOrdersWithStatus = async(req,res)=>{
    const {tiffinId,status} = req.body;
    if(!tiffinId || !status)
    {
        throw new BadRequestError('Please provide necessary details')
    }
    const orders = await orderModel.find({tiffinId,status})
    if(!orders)
    {
        throw new NotFoundError('No orders with provided details')
    }
    res.status(StatusCodes.OK).json({res:"success",data:orders})

}

const getDishAndQuantity = async(req,res)=>{
    const {userId,tiffinId} = req.body
    if(!userId || !tiffinId)
    {
        throw new BadRequestError('Please provide necessary details')
    }
    const basketId = await orderModel.findOne({userId,tiffinId})
    if(!basketId)
    {
        throw new NotFoundError('No order with provided details')
    }
    const dishesArray = await basketdishModel.find({basketId})
    dishes = {}
    dishesArray.forEach(e => {
        temp = {}
        temp.dish = e.dish
        temp.quantity = e.quantity
    });
    res.status(StatusCodes.OK).json({res:"success",data:dishesArray})
}

const changeStatus = async(req,res)=>{
    const {orderId,status} = req.body
    if(!orderId || !status)
    {
        throw new BadRequestError('Please provide necessary details')
    }
    const order = await orderModel.findOneAndUpdate({orderId},{status},{runValidators:true})
    if(!order)
    {
        throw new NotFoundError(`No order with order id ${orderId}`)
    }
    res.status(StatusCodes.OK).json({res:"success",data:order})

}

module.exports = {
    getDishAndQuantity,
    getDishesByTiffinId,
    getOrdersWithStatus,
    getTiffinDetails,
    createDish,
    changeStatus
}