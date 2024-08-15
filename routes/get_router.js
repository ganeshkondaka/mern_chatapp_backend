const { gettingchat } = require("../controllers/get_controller");
const { get_validation } = require("../middlewares/get_authvalid");

const g_router = require("express").Router();

g_router.get("/ok", get_validation,gettingchat);
module.exports = { g_router };
