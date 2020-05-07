"use strict";

var jwt = require("jsonwebtoken");

module.exports = {
  checkToken: function checkToken(req, res, next) {
    var token = req.get("authorization");

    if (token) {
      console.log(token); // Remove Bearer from string

      token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};