const express = require("express");
const route = express.Router();
const { customerSignup, customerlogin, currentuser } = require("../Controller/authController")
const validateToken = require("../middleware/validateTokenHandler")


route.post("/signup", customerSignup)
route.post("/login", customerlogin)
route.get("/current", validateToken, currentuser)


module.exports = route;
