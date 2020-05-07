"use strict";

var _require = require("./user.service"),
    create = _require.create,
    getUserByUserEmail = _require.getUserByUserEmail,
    _getUserByUserId = _require.getUserByUserId,
    _getUsers = _require.getUsers,
    updateUser = _require.updateUser,
    _deleteUser = _require.deleteUser;

var _require2 = require("bcrypt"),
    hashSync = _require2.hashSync,
    genSaltSync = _require2.genSaltSync,
    compareSync = _require2.compareSync;

var _require3 = require("jsonwebtoken"),
    sign = _require3.sign;

module.exports = {
  createUser: function createUser(req, res) {
    var body = req.body;
    var salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: function login(req, res) {
    var body = req.body;
    getUserByUserEmail(body.email, function (err, results) {
      if (err) {
        console.log(err);
      }

      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }

      var result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        var jsontoken = sign({
          result: results
        }, "qwe1234", {
          expiresIn: "1h"
        });
        res.cookie('token', result.token, jsontoken);
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUserByUserId: function getUserByUserId(req, res) {
    var id = req.params.id;

    _getUserByUserId(id, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }

      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: function getUsers(req, res) {
    _getUsers(function (err, results) {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: function updateUsers(req, res) {
    var body = req.body;
    var salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: function deleteUser(req, res) {
    var data = req.body;

    _deleteUser(data, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }

      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};