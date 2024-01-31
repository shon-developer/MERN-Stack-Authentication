import express from "express";
import colors from "colors";
import config from "./src/config/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Authentication</h1>");
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`.bgBlue.white);
});
