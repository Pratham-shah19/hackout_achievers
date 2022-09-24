const express = require('express')
const router = express.Router()

const {forgotDeliveryBoy} = require('../controllers/deliveryBoy')

router.route('/').patch(forgotDeliveryBoy)


module.exports = router