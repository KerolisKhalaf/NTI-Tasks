const express = require("express");
const router = express.Router();
const { register, login } = require("./user.controller");
const checkEmail = require("../../middleware/checkEmail");

router.post("/register", checkEmail, register);
router.post("/login", login);

module.exports = router;
