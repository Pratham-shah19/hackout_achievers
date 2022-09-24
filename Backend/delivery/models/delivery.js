const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const DeliveryBoySchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide name'],
  },
  email:{
    type:String,
    required:[true,'Please provide email'],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'],
    unique:true,
  },
  password:{
    type:String,
    required:[true,'Please provide password'],
    minlength:8,
  },
  address:{
    type:String,
    required:true
  },
  lnt:{
    type:mongoose.Decimal128
  },
  lng:{
    type:mongoose.Decimal128
  },
  state:{
    type:String,
    required:[true,'Please enter your state']
  },
  pincode:{
    type:Number,
    required:[true,'Please Enter pincode']
  },
  city:{
    type:String,
    required:[true,'Please Enter City Name']
  },
  otp:{
    type:Number,
    default:0
  }
})

DeliveryBoySchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

DeliveryBoySchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
DeliveryBoySchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

module.exports = mongoose.model('delivery',DeliveryBoySchema)