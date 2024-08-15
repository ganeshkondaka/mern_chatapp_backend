const express = require("express");
const { postingchat } = require("../controllers/chatcontroller");
const { signup, login } = require("../controllers/signuplogin_controller");
const { signup_validation, login_validation } = require("../middlewares/auth_valid");
const { get_validation } = require("../middlewares/get_authvalid");
const p_router = express.Router();

// creating routes
// p_router.get("/ok", gettingchat);
p_router.post("/signup", signup_validation, signup);
p_router.post("/login", login_validation,login);
p_router.post("/postchat",get_validation, postingchat);

module.exports = { p_router };
