const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name']
    },
    imageUrl:{
        type:String,
        required:[true,'Please provide image']
    },
    tiffinId:{
        type:mongoose.Types.ObjectId,
        ref:"Tiffin",
        required:[true,'Please provide tiffin id']
    },
    ingredients:{
        type:Array,
        required:[true,'Please provide ingredients']
    },
    price:{
        type:Number,
        required:[true,'Please provide price']
    }
})

module.exports = mongoose.model("Dish",dishSchema)