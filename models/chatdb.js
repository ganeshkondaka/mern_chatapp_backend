const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// connecting mongodb database
mongoose.connect(process.env.mongo_url)
  .then(() => {
    console.log("app is connencted to mongodb database");
  })
  .catch((error) => {
    console.log(error);
  });

// creating schema

const chatschema =new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// creating model
const chatmodel=mongoose.model('chatmodel',chatschema);

module.exports = { chatmodel };