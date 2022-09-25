const mongoose = require('mongoose')
const basketSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:[true,'Please provide user id']
    },
    tiffinId:{
        type:mongoose.Types.ObjectId,
        required:[true,'Please provide tiffin id']
    },
    price:{
        type:Number,
        required:false,
        default:0
    },
    deliveryFee:{
        type:Number,
        required:[true,'Please provide delivery fee']
    }
})


module.exports = mongoose.model("Basket",basketSchema)