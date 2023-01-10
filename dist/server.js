import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT, function () { return console.log("Listening on port ".concat(process.env.PORT)); });
