const express = require('express')
const router = express.Router()

const {registerDeliveryBoy} = require('../controllers/deliveryBoy')

router.route('/').post(registerDeliveryBoy)


module.exports = router