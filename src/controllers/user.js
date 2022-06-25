import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from "../models/user.js";

const secret = "test";


export const getUser = async (req, res) => {
  const authorization = req.headers["authorization"];
  const token = authorization.replace("Bearer ", "");

  try {
    const oldUser = await UserModel.findOne({ token });
    if (!oldUser) return res.status(404).json({ message: "user doesn't exist" });

    res.status(200).json({ data: oldUser })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "user doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ data: oldUser })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signup = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = jwt.sign({ id: email }, secret)
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: name,
      phoneNumber: phoneNumber,
      token,
    })

    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
}

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token })
    }

    const result = await UserModel.create({
      email, name, googleId
    });

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
}