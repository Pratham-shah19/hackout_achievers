const MainUser = require('../models/MainUser')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken') 
const nodemailer = require('nodemailer')

const registerUser = async (req,res) => {
  const {name,email,password,address,state,pincode,city}=req.body
   if(!email || !name || !password || !address || !state || !pincode || !city){
     throw new BadRequestError('Please provide necessary credentials')
   }
  const mainuser = await MainUser.create(req.body)
  const token = mainuser.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:mainuser.name,id:mainuser._id},token})
}

const forgotPasswordUser = async (req,res) => {
  const {email}=req.body;
  const emailv = await MainUser.findOne({email})
  if(!email || !emailv){
    throw new BadRequestError('Please provide valid email')
  }
  const otp = Math.floor(Math.random()*(10000-1000+1)+1000)
  console.log(otp)
  const mainuser = await MainUser.findOneAndUpdate({email:email},{otp:otp},{new:true,runValidators:true})
  
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
    text: `Your OTP for reseting the password for User app is ${otp}, please enter this OTP in your user app to reset your password.
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

const loginUser = async (req,res) => {
  const {email,password} = req.body
  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const mainuser = await MainUser.findOne({email})
  if(!mainuser){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await mainuser.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = mainuser.createJWT()
  res.status(StatusCodes.OK).json({user:{name:mainuser.name,id:mainuser._id},token})
}



module.exports = {
  registerUser,forgotPasswordUser,loginUser
}