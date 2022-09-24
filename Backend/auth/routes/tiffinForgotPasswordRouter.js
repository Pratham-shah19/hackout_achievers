const express = require('express')
const router = express.Router()

const {forgotPasswordTiffin} = require('../controllers/tiffin')

router.route('/').patch(forgotPasswordTiffin)


module.exports = router