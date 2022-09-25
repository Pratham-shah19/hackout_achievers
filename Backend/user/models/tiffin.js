const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//schema definition
const tiffinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
  },
  imageUrl:{
    type:String,
    required:[true,'Please provide image']
  },
  password:{
    type:String,
    required:[true,'Please provide password'],
    minLengt:8
  },
  address:{
    type:String,
    require:[true,'Please provide address']
  },
  lnt:{
    type:mongoose.Decimal128,
    required:false
  },
  lng:{
    type:mongoose.Decimal128,
    required:false
  },
  city:{
    type:String,
    required:[true,'Please provide city name']
  },
  state:{
    type:String,
    required:[true,'Please provide state name']
  },
  pincode:{
    type:Number,
    required:[true,'Please provide pincode']
  },
  rating:{
    type:mongoose.Decimal128,
    default:0.0,
    required:false
  },
  noR:{
    type:Number,
    default:0,
    required:false
  },
  otp:{
    type:Number,
    default:0
  }
});

tiffinSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

tiffinSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
tiffinSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

module.exports = mongoose.model('Tiffin',tiffinSchema)