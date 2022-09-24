const express = require('express')
const router = express.Router()
const {getTiffinDetails,getDishesByTiffinId,getOrdersWithStatus,getDishAndQuantity,changeStatus,updateTiffinDetails,deleteDish} = require('../controllers/main.js')

router.route('/{:id}').get(getTiffinDetails)
router.route('/').post(updateTiffinDetails)

router.route('/dish').delete(deleteDish)
router.route('/dish/{:id}').get(getDishesByTiffinId)

router.route('/order').post(getOrdersWithStatus).get(getDishAndQuantity)
router.route('/order/changestatus').patch(changeStatus)

module.exports = router
