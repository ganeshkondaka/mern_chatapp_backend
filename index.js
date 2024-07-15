const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { postingchat, gettingchat } = require("./controllers/chatcontroller");
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

//routes
app.post("/postchat", postingchat);
app.get("/ok", gettingchat);

app.listen(port, () => {
  console.log(`app is running on this port ${port}`);
});
