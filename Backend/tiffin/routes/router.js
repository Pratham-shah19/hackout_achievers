const express = require('express')
const router = express.Router()
const {getTiffinDetails,createDish,getDishesByTiffinId,getOrdersWithStatus,getDishAndQuantity,changeStatus} = require('../controllers/main.js')

router.route('/{:id}').get(getTiffinDetails)

router.route('/dish').post(createDish)
router.route('/dish/{:id}').get(getDishesByTiffinId)

router.route('/order').post(getOrdersWithStatus).get(getDishAndQuantity)
router.route('/order/changestatus').post(changeStatus)

module.exports = router
