const { chatmodel } = require("../models/chatdb");

// Posting data to the database (used by both HTTP POST and Socket.io)
const postingchat = async (req, res = null) => {
  try {
    const { username, message } = req.body;

    // Check if username or message is empty
    if (!username || !message) {
      if (res) return res.status(400).send({ msg: "send all the data" });
      throw new Error("Invalid data");
    }

    // Add values to variables
    const newchat = {
      username,
      message,
    };

    // Create chat and add it to MongoDB
    const chatdata = await chatmodel.create(newchat);

    // If called via HTTP, respond with success
    if (res) {
      return res.status(200).send({
        msg: "Data added successfully",
        chatdata,
      });
    }

    // If called via Socket.io, just return the chatdata (no need to send a response)
    return { chatdata };
  } catch (error) {
    if (res) res.status(500).send({ message: error.message });
    console.error("Error posting chat:", error.message);
    return { error: error.message };
  }
};

const deletechat = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await chatmodel.findByIdAndDelete(id);
    if (!deletedMessage)
      return res.status(404).json({ error: "Message not found" });
    res.status(200).json({
      message: "Message deleted",
      deletedMessage,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Getting data from the database
const gettingchat = async (req, res) => {
  const chat = await chatmodel.find();
  res.send({
    chat,
  });
};

module.exports = { postingchat, deletechat, gettingchat };







































// const { chatmodel } = require("../models/chatdb");

// // posting data to the database
// const postingchat = async (req, res) => {
//   try {
//     // checking if they were empty or not
//     if (!req.body.username || !req.body.message) {
//       return res.status(400).send({
//         msg: "send all the data",
//       });
//     }

//     // adding values to variables?
//     const newchat = {
//       username: req.body.username,
//       message: req.body.message,
//     };

//     // cretaing the data and putting into mongodb
//     const chatdata = await chatmodel.create(newchat);
//     // Send success response
//     res.status(200).send({
//       msg: "Data added successfully",
//       chatdata,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };

// const deletechat = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedMessage = await chatmodel.findByIdAndDelete(id);
//     if (!deletedMessage)
//       return res.status(404).json({ error: "Message not found" });
//     res.status(200).json({
//       message: "Message deleted",
//       deletedMessage,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// module.exports = { postingchat , deletechat};
