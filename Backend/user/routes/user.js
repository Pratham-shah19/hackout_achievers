const express = require('express')
const router = express.Router()

const {getUser,updateUser,orderHistory,otpUserValidation} = require('../controllers/user')

router.route('/').get(getUser).patch(updateUser).post(orderHistory)
router.route('/otpvalidation').post(otpUserValidation)



module.exports = router