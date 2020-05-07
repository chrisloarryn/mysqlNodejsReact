"use strict";

require("dotenv").config('./config.env');

var express = require("express");

var app = express();

var userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api/users", userRouter);
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("server up and running on PORT :", port);
});