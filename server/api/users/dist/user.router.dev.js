"use strict";

var router = require("express").Router();

var _require = require("../../auth/token_validation"),
    checkToken = _require.checkToken;

var _require2 = require("./user.controller"),
    createUser = _require2.createUser,
    login = _require2.login,
    getUserByUserId = _require2.getUserByUserId,
    getUsers = _require2.getUsers,
    updateUsers = _require2.updateUsers,
    deleteUser = _require2.deleteUser;

router.get("/", checkToken, getUsers); // checkToken

router.post("/", createUser); // checkToken

router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router["delete"]("/", checkToken, deleteUser);
module.exports = router;