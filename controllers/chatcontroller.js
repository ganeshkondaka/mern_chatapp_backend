const { chatmodel } = require("../models/chatdb");

// posting data to the database

const postingchat = async (req, res) => {
  try {
    // checking if they were empty or not
    if (!req.body.username || !req.body.message) {
      return res.status(400).send({
        msg: "send all the data",
      });
    }

    // adding values to variables?
    const newchat = {
      username: req.body.username,
      message: req.body.message,
    };

    // cretaing the data and putting into mongodb

    const chatdata = await chatmodel.create(newchat);
    // Send success response
    res.status(200).send({
      msg: "Data added successfully",
      chatdata,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//getting data from the database

const gettingchat = async (req, res) => {
  const chat = await chatmodel.find();

  res.send({
    chat,
  });
};

module.exports = { postingchat, gettingchat };
