const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

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
  }
});

tiffinSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password,salt)
    this.password = hash
    next()
})

module.exports = mongoose.model('Tiffin',tiffinSchema)

