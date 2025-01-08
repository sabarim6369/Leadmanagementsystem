const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./config/db");

const app = express();
app.use(express.json());

const mongodbUri = process.env.MONGODB_URI.replace(
  "superadmin",
  process.env.DATABASE_NAME
);


process.env.MONGODB_URI = mongodbUri;

db(); 

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
