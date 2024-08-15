const { chatmodel } = require("../models/chatdb");

//getting data from the database
const gettingchat = async (req, res) => {
  const chat = await chatmodel.find();
  res.send({
    chat,
  });
};
 module.exports={gettingchat}