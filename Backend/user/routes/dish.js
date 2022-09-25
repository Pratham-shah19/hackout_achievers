const express = require('express')
const router = express.Router()

const {getAllDishes,getDish} = require('../controllers/dish')

router.route('/allDishes/:tid').get(getAllDishes)
router.route('/:did').get(getDish)


module.exports = router