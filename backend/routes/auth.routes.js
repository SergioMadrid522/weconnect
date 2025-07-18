import express from "express";
import bcrypt from "bcryptjs";

import {
  userLoginValidation,
  userSignUpValidation,
} from "../validations/user.validation.js";
import { connection } from "../db.js";
import { hashPassword } from "../hashPassword.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const errors = userLoginValidation(req.body);
  const { email, password } = req.body;

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    res.status(201).json({
      message: "logged in",
      user: {
        name: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const errors = userLoginValidation(req.body);
  const { username, email, password } = req.body;

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const [emailsRow] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (emailsRow.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const [usernamesRow] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (usernamesRow.length > 0) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    //hash password
    const encryptedPassword = await hashPassword(password);
    //insert data into database
    await connection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, encryptedPassword]
    );

    return res.status(200).json({
      message: "Signed up",
      user: {
        name: username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
