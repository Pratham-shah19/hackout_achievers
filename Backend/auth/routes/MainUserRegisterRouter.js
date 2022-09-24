const express = require('express')
const router = express.Router()

const {registerUser} = require('../controllers/MainUser')

router.route('/').post(registerUser)


module.exports = router