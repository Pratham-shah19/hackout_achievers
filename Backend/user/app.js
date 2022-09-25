require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const express = require('express');
const app = express();
const authenticateUser = require('./middleware/authentication_user')

//connectDB
const connectDB = require('./db/connect')

// routers
const userRouter = require('./routes/user')
const tiffinRouter = require('./routes/tiffin')
const basketRouter = require('./routes/basket')
const dishRouter = require('./routes/dish')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.set('trust proxy',1)
app.use(rateLimit({
  windowMs:15*60*1000, // 15 minutes
  max: 100,
}))
app.use(helmet())
app.use(cors())
app.use(xss())
// extra packages

//routes
app.use('/api/v1/user/tiffin',authenticateUser,tiffinRouter)
app.use('/api/v1/user',authenticateUser,userRouter)
app.use('/api/v1/user/basket',authenticateUser,basketRouter)
app.use('/api/v1/user/dish',authenticateUser,dishRouter)

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
