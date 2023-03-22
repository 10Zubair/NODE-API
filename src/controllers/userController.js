const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');//this will make all the vars system vars present in that file

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const singup = async(req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email : email });
    if (existingUser) {
      return res.status(400).json('User Exists');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashPassword,
      username: username
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({
      user: result,
      token: token
    });

  } catch (error) {
    console.log(error);
  }
}

const singin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if(!existingUser) {
      return res.status(404).json('User not found');
    }
    else {
      const matchPassword = await bcrypt.compare(password, existingUser.password );
      if (!matchPassword) {
        return res.status(400).json('Invalid Email or password');
      }
      else {
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  singup,
  singin
}