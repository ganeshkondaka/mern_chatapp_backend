const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { chatmodel } = require("../models/chatdb");
const { usermodel } = require("../models/userdb");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        msg: "please send all the data",
      });
    }

    const user = await usermodel.findOne({ email });
    if (user) {
      return res.status(409).json({
        msg: "user alreasy existed, u can login....",
      });
    }
    const newuser = new usermodel({ username, email, password });
    // newuser.password=await bcrypt.hash(password,10);
    await newuser.save();
    res.status(201).json({
      msg: "user registered successfully,",
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        msg: "send all the data",
      });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        msg: "the email or password is wrong",
      });
    }

    // const ispasswordequal = await bcrypt.compare(password, user.password);
    ispasswordequal = password == user.password;
    if (ispasswordequal === false) {
      return res.status(403).json({
        msg: "the email or password is wrong",
      });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECREAT,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      msg: "login successfull",
      success: true,
      jwttoken,
      email,
      name: user.username,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

module.exports = { signup, login };
