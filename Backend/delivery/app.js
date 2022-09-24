const express = require("express");
const app = express();

//dependencies
require("express-async-errors");
require("dotenv").config();
const authMiddleware = require("./middleware/authorization");
const multer = require("multer");
const path = require("path");

//router
const mainRouter = require("./routes/router");

const bodyParser = require("body-parser");
//model
const dishModel = require("./models/dish");
//connect db
const connectDb = require("./db/connect");
const { StatusCodes } = require("http-status-codes");
const dish = require("./models/dish");

//middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });

//router
app.post("/api/v1/tiffin/dish", upload.single("imageUrl"), async (req, res) => {
  req.body.imageUrl = req.file.filename;
  const dish = await dishModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ res: "success", data: dish });
});
app.use("/api/v1/tiffin", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
