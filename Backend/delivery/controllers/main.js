const tiffinModel = require('../models/tiffin')
const dishModel = require('../models/dish')
const orderModel = require('../models/order')
const basketdishModel = require('../models/basketdish')
const deliveryModel = require('../models/delivery')
const userModel = require('../models/user')

const {StatusCodes} = require('http-status-codes')

const{BadRequestError,NotfoundError} = require('../errors')
const { notify } = require('../routes/router')
const delivery = require('../models/delivery')

const validateOTP = async(req,res)=>{
    const otp = req.params.otp
    const deliveryId = req.user.userId
    const boy = await deliveryModel.findOne({_id:deliveryId})
    const boyOtp = boy.otp
    if(otp === boyOtp)
    {
        res.status(StatusCodes.OK).json({res:"success",data:true})
    }
    else{
        throw new NotfoundError("Opt did not match")
    }
}
const getAllDetails = async(req,res)=>{
    const deliveryId = req.user.userId;
    const details = await deliveryModel.findOne({_id:deliveryId})
    if(!details)
    {
        throw new NotfoundError('Not found')
    }
    res.status(StatusCodes.OK).json({res:"success",data:details})

}
const updateDetails = async(req,res)=>{
    const deliveryId = req.user.userId
    const details = await deliveryModel.findOneAndUpdate({_id:deliveryId},req.body,{runValidators:true})
    if(!details)
    {
        throw new NotfoundError('Details not found')
    }
    res.status(StatusCodes.OK).json({res:"success",data:details})
}

const getDishesReadyForPickUp = async(req,res)=>{
    const dishes = await orderModel.find({status:"READY_TO_PICK"})
    if(!dishes)
    {
        throw new NotfoundError('Dishes are not ready yet')
    }
    res.status(StatusCodes.OK).json({res:"success",data:dishes})
}

const getOrderDetails = async(req,res)=>{
    const {userId,tiffinId,basketId} = req.body
    if(!userId || !tiffinId || !basketId)
    {
        throw new BadRequestError('Please provide necessary details')
    }
    const user = await userModel.findOne({_id:userId})
    const tiffin = await tiffinModel.findOne({_id:tiffinId})
    const dishes = await basketdishModel.find({basketId})

    if(!user || !tiffin ||!dishes)
    {
        throw new NotfoundError('No items satisfying provided details')
    }
    res.status(StatusCodes.OK).json({res:"success",data:{userAddress:user.address,tiffinAddress:tiffin.address,dishes}})

}

const changeStatus = async(req,res)=>{
    const orderId = req.body.orderId
    if(orderId || req.body.status === 'ACCEPTED')
    {
        const order = await orderModel.findOneAndUpdate({_id:orderId},{status:"ACCEPTED",deliveryId:req.user.userId},{runValidators:true})
        if(!order)
        {
            throw new NotfoundError('No order with provided details')
        }
        res.status(StatusCodes.OK).json({res:"success",data:order})
    }
    if(orderId || req.body.status==='PICKED_UP')
    {
        const order = await orderModel.findOneAndUpdate({_id:orderId},req.body,{runValidators:true})
        if(!order)
        {
            throw new NotfoundError('No order with provided details')
        }
        res.status(StatusCodes.OK).json({res:"success",data:order})

    }
    const order = await orderModel.findOneAndUpdate({_id:orderId},req.body,{runValidators:true})
    if(!order)
        {
            throw new NotfoundError('No order with provided details')
        }
        res.status(StatusCodes.OK).json({res:"success",data:order})


}

const getOrderHistory = async(req,res)=>{
    const deliveryId = req.user.userId
    const orders = await orderModel.find({_id:deliveryId,status:"COMPLETED"})
    if(!orders)
    {
        throw new NotfoundError('No orders with provided details')
    }
    let data = orders.map(async (e)=>{
        const user = await userModel.findOne({_id:req.body.userId})
        const tiffin = await tiffinModel.findOne({_id:req.body.tiffinId})
        return {username:user.name,tiffinname:tiffin.name,imageUrl:tiffin.imageUrl}
    })
    
    res.status(StatusCodes.OK).json(data);
}

const getAllCoordinates = async(req,res)=>{
    const {userId,tiffinId} = req.body;
    const deliveryId = req.user.userId;
    const user = await userModel.findOne({_id:userId})
    const tiffin = await tiffinModel.findOne({_id:tiffinId})
    const boy = await deliveryModel.findOne({_id:deliveryId})

    res.status(StatusCodes.OK).json({res:"success",data:{user:{lnt:user.lnt,lng:user.lng},tiffin:{lnt:tiffin.lnt,lng:tiffin.lng},deliveryboy:{lnt:boy.lnt,lng:boy.lng}}})
}

const updateCoordinates = async(req,res)=>{
    const deliveryId = req.user.userId
    const item = await deliveryModel.findOneAndUpdate({_id:deliveryId},req.body,{runValidators:true})
    res.status(StatusCodes.OK).json({res:"success",data:item})
}

module.exports={
    getAllCoordinates,
    getAllDetails,
    getDishesReadyForPickUp,
    getOrderDetails,
    getOrderHistory,
    changeStatus,
    updateCoordinates,
    updateDetails,
    validateOTP
}