const express = require('express')
const router = express.Router()
const {getAllDetails,updateDetails,getDishesReadyForPickUp,getOrderDetails,changeStatus,getOrderHistory,getAllCoordinates,updateCoordinates} = require('../controllers')


router.route('/').get(getAllDetails).patch(updateDetails)
router.route('/validateOTP/:otp').get(validateOTP)

router.route('/dishes').get(getDishesReadyForPickUp)

router.route('/order/details').post(getOrderDetails)//when modal is loaded
router.route('/order/changeStatus/:id').patch(changeStatus)
router.route('/order/history').get(getOrderHistory)

router.route('/coordinates').get(getAllCoordinates)
router.route('/coordinates/updateDeliveryBoyCoordinates').patch(updateCoordinates)


module.exports = router
