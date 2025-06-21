import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connections to DB Successful.");
  app.listen(process.env.PORT, () => {
    console.log("Server Started at Port : ", process.env.PORT);
  });
});
