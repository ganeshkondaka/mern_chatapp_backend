const { gettingchat } = require("../controllers/get_controller");

const g_router = require("express").Router();

g_router.get("/ok", gettingchat);
module.exports = { g_router };
