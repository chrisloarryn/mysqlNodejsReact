"use strict";require("dotenv").config("./config.env");var express=require("express"),app=express(),userRouter=require("./api/users/user.router");app.use(express.json()),app.use("/api/users",userRouter);var port=process.env.PORT||4e3;app.listen(port,function(){console.log("server up and running on PORT :",port)});