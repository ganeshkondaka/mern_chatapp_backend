const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { chat_router } = require("./routes/chatrouter");
// const { postingchat, gettingchat } = require("./controllers/chatcontroller");
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

//routes
app.use("/", chat_router);

app.listen(port, () => {
  console.log(`app is running on this port ${port}`);
});
