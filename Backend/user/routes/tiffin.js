const express = require('express')
const router = express.Router()

const {getAlltiffins,getTiffin,filterTiffin} = require('../controllers/tiffin')

router.route('/').get(getAlltiffins)
router.route('/filter').get(filterTiffin)
router.route('/:tid').get(getTiffin)


module.exports = router