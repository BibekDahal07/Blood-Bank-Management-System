import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        messege: "User Already Exists!",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });

    res.status(200).json({
      success: true,
      messege: "User registered Successfully",
    });
  } catch (e) {
    res.status(500).josn({
      success: false,
      messege: e.messege,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).josn({
        success: false,
        messege: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).josn({
        success: false,
        messege: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).josn({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).josn({
      success: false,
      messege: error.messege,
    });
  }
};
