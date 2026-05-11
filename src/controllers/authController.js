import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userService from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const { email, password, control_question, answer } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const newUser = await userService.registerUser(
      email,
      password,
      control_question,
      answer,
    );

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);

  if (user && (await bcrypt.compare(password, user.password_hash))) {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        level: user.level,
        points: user.total_points,
      },
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
