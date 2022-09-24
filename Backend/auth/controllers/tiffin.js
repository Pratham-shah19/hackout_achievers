const express = require("express");
const app=express();
const Tiffin = require('../models/tiffin')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken') 
const nodemailer = require('nodemailer')


//middlewares


const forgotPasswordTiffin = async (req,res) => {
  const {email}=req.body;
  if(!email){
    throw new BadRequestError('Please provide valid email')
  }
  const otp = Math.floor(Math.random()*(10000-1000+1)+1000)
  console.log(otp)
  const tiffin = await Tiffin.findOneAndUpdate({email:email},{otp:otp},{new:true,runValidators:true})
  if(!tiffin){
    throw new BadRequestError('Please provide valid email')
  }
  
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'hackout69@outlook.com',
        pass: 'Password@69'
    }
  });
  const mailOptions = {
    from: '"Herself " <hackout69@outlook.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: 'OTP for Reseting Your Password ', // Subject line
    text: `Your OTP for reseting the password for Tiffin app is ${otp}, please enter this OTP in your tiffin app to reset your password.
-Thanks,
Team Herself  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    res.status(StatusCodes.OK).json({optsent:true})
  });
}

const loginTiffin = async (req,res) => {
  const {email,password} = req.body
  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const tiffin = await Tiffin.findOne({email})
  if(!tiffin){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await tiffin.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = tiffin.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:tiffin.name,id:tiffin._id},token})
}



module.exports = {
  forgotPasswordTiffin,loginTiffin
}