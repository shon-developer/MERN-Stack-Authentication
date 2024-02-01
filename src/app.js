import express from "express";
import colors from "colors";
import config from "./config/index.js";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import crypto from "crypto";

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// crypto
/*
let key = crypto.randomBytes(64).toString("hex");
console.log(key);
*/
// rest api
app.get("/", (req, res) => {
  res.send("<h1>Authentication</h1>");
});

export default app;
