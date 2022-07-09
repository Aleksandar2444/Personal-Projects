require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const globalRouter = require("./const/router_const");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(globalRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
