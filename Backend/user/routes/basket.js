const express = require('express')
const router = express.Router()

const {openBasketButtonDisplay,addToBasketButton,paymentOrder,openBasket} = require('../controllers/basket')

router.route('/:tid').get(openBasketButtonDisplay).post(addToBasketButton)
router.route('/payment/:tid').get(paymentOrder)
router.route('/openBasket/:tid').get(openBasket)

module.exports = router
