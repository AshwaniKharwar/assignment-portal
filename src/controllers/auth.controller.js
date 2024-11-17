import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {

  // get user data from request
  const { name, email, password, role } = req.body;

  // validate data
  if (!name | !email | !password | !role) {
    return res.status(401).json({
      success: false,
      message: "All Fields are required",
    });
  }
  try {

    // check if user exist
    const existUser = await User.findOne({email})
    if(existUser){
        return res.status(401).json({
            success: false,
            message: "Email is already exist",
          });
    }
    // hashed password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // save user to db
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {

    // get user data from request
  const { email, password } = req.body;

  // validate data
  if (!email | !password) {
    return res.status(401).json({
      success: false,
      message: "All Fields are required",
    });
  }
  try {

    // check if user exist 
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    

    // check password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    // generate jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 h
      httpOnly: true,
    };
    
    user.token = token;
    user.password = undefined;

    // set cookies and return response
    return res.cookie("token", token, options).status(200).json({
      token,
      success: true,
      message: "Logged in success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
