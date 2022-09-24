const express = require('express')
const router = express.Router()

const {loginTiffin} = require('../controllers/tiffin')

router.route('/').post(loginTiffin)


module.exports = router