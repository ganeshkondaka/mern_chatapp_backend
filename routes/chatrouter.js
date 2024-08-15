const express = require("express");
const { postingchat } = require("../controllers/chatcontroller");
const { signup, login } = require("../controllers/signuplogin_controller");
const { signup_validation, login_validation } = require("../middlewares/auth_valid");
const p_router = express.Router();

// creating routes
// p_router.get("/ok", gettingchat);
p_router.post("/signup", signup_validation, signup);
p_router.post("/login", login_validation,login);
p_router.post("/postchat", postingchat);

module.exports = { p_router };
