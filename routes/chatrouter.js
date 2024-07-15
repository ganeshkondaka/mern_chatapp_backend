const express = require("express");
const { postingchat, gettingchat } = require("../controllers/chatcontroller");
const chat_router = express.Router();

// creating routes
chat_router.get("/ok", gettingchat);
chat_router.get("/postchat", postingchat);

module.exports = { chat_router };
