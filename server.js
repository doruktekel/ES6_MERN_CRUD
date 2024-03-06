import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

/// CONNECTION THE ENVIROMENT FOLDER

import dotenv from "dotenv";
dotenv.config();

const app = express();

//// ENVIROMENT THINGS

const PORT = process.env.PORT || 3000;
const C_STRING = process.env.C_STRING;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//// PARSER MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//// ROUTE MIDDLEWARE

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.status(200).send("Welcome our main page");
});

/// ERROR MIDDLEWARE

app.use(errorMiddleware);

/// CONNECTION THE DATABASE & LISTENING PORT

mongoose
  .connect(C_STRING)
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, (req, res) => {
      console.log("Listening port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
