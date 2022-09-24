const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({res:"error", msg: err.message })
  }
  console.log(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
