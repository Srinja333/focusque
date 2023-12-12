const express = require("express");
const connectDB = require("./config/db");
const cors =require("cors");
const dotenv = require("dotenv");


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); 


const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);