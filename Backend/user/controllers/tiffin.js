const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const basketModel = require('../models/basket')
const tiffinModel = require('../models/tiffin')
const orderModel = require('../models/order')
const dishModel = require('../models/dish')
const deliveryModel = require('../models/deliveryboy')
const userModel = require('../models/MainUser')
const basketDishModel = require('../models/basketdish')

const getAlltiffins = async (req,res) => {

  const tiffins= await tiffinModel.find({})
  if(!tiffins){
    throw new NotFoundError('There are no dishes')
  }
  res.status(StatusCodes.OK).json({res:"Success",data:tiffins})
}

const getTiffin = async (req,res) => {
  const tiffinid = req.params.tid
  if(!tiffinid){
    throw new BadRequestError('Please Enter Tiffin id')
  }
  const tiffin= await tiffinModel.findOne({_id:tiffinid})
  if(!tiffin){
    throw new NotFoundError('Please Enter valid tiffin id')
  }
  res.status(StatusCodes.OK).json({res:"Success",data:tiffin})
}

const filterTiffin =  async (req,res) => {
  const {name,sort,fields,numericfilters}=req.query
  //console.log(req.query)
  const queryObject={} 
  
  if(name){
    queryObject.name = {$regex:name,$options:'i'}
  }
  if(numericfilters){
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericfilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options = ['rating']
    filters = filters.split(',').forEach((item) => {
      [field,operator,value] = item.split('-')
      if(options.includes(field)){
        queryObject[field] = {[operator]:parseFloat(value)}
      }      
    });
  }
  console.log(queryObject)
  let result = tiffinModel.find(queryObject)
  //sort
  if(sort){
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }
  //select
  if(fields){
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  }
  const products = await result
  res.status(StatusCodes.OK).json({res:"Success",data:products})
}




module.exports = {getAlltiffins,getTiffin,filterTiffin}