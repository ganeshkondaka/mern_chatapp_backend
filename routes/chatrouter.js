const express = require("express");
const { postingchat } = require("../controllers/chatcontroller");
const { signup, login } = require("../controllers/signuplogin_controller");
const p_router = express.Router();

// creating routes
// p_router.get("/ok", gettingchat);
p_router.post("/signup", signup);
p_router.post("/login", login);
p_router.post("/postchat", postingchat);

module.exports = { p_router };
