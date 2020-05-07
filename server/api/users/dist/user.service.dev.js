"use strict";

var pool = require("../../config/database");

module.exports = {
  create: function create(data, callBack) {
    console.log(data);
    pool.query("insert into registration(id,firstName, lastName, gender, email, password, number) \n                values(?,?,?,?,?,?,?)", [data.id, data.first_name, data.last_name, data.gender, data.email, data.password, data.number], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results);
    });
  },
  getUserByUserEmail: function getUserByUserEmail(email, callBack) {
    pool.query("select * from registration where email = ?", [email], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results[0]);
    });
  },
  getUserByUserId: function getUserByUserId(id, callBack) {
    pool.query("select id,firstName,lastName,gender,email,number from registration where id = ?", [id], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results[0]);
    });
  },
  getUsers: function getUsers(callBack) {
    pool.query("select id,firstName,lastName,gender,email,number from registration", [], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results);
    });
  },
  updateUser: function updateUser(data, callBack) {
    pool.query("update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?", [data.first_name, data.last_name, data.gender, data.email, data.password, data.number, data.id], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results[0]);
    });
  },
  deleteUser: function deleteUser(data, callBack) {
    pool.query("delete from registration where id = ?", [data.id], function (error, results, fields) {
      if (error) {
        callBack(error);
      }

      return callBack(null, results[0]);
    });
  }
};