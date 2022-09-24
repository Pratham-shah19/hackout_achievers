const express = require('express')
const app = express();

//dependencies
require('express-async-errors')
require('dotenv').config()
const authMiddleware = require('./middleware/authorization')

//router
const mainRouter = require('./routes/router')

//model

//connect db
const connectDb = require('./db/connect')

//middlewares
app.use(express.static('public'))
app.use(express.json())

//router
app.use('/api/v1/tiffin',mainRouter)

const port = process.env.PORT || 3000;

const start = async()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server listening on port ${port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}
start();

