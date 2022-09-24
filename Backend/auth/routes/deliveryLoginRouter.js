const express = require('express')
const router = express.Router()

const {loginDeliveryBoy} = require('../controllers/deliveryBoy')

router.route('/').post(loginDeliveryBoy)


module.exports = router