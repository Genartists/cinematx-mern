import express, { json } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username already exist, please user another one!",
    });
  }

  // bcrypt to hash password
  let hashedPassword = await bcrypt.hash(password, 10);

  // save user and password to db
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({
    success: true,
    message: "Success!",
    data: user,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Wrong username or password!",
      });
    }

    // validate password by comparing hashed password together
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong username or password!",
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({
      success: true,
      message: "Login successful!",
      data: {
        username: user.username,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
