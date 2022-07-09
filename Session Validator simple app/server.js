const express = require("express");
const globarRouter = require("./const/router_const");
const createSession = require("./const/session_const");

const app = express();

app.use(express.json());
app.use(createSession);
app.use(globarRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
