import express from "express";
import bcrypt from "bcryptjs";

import {
  userLoginValidation,
  userSignUpValidation,
} from "../validations/user.validation.js";
import { pool } from "../db.js";
import { hashPassword } from "../hashPassword.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const errors = userLoginValidation(req.body);
  const { email, password } = req.body;

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const findEmail = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (findEmail.rows.length === 0) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const user = findEmail.rows[0];
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
  const errors = userSignUpValidation(req.body);
  const { username, email, password } = req.body;

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const emails = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emails.rows.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const userNames = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userNames.rows.length > 0) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    //hash password
    const encryptedPassword = await hashPassword(password);
    //insert data into database
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
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
