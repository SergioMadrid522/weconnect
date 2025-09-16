import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { hashPassword } from "../hashPassword.js";

const router = express.Router();
router.get("/profile", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    res.status(200).json({ userinfo: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/changeUserName", async (req, res) => {
  const { id, newUserName } = req.body;
  try {
    //Verifies if the new userName is taken or not
    const existingUser = await pool.query(
      "SELECT username FROM users WHERE username = $1 AND id != $2",
      [newUserName, id]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    //update the username
    const updateUser = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2",
      [newUserName, id]
    );

    if (updateUser.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
});

router.put("/changeEmail", async (req, res) => {
  const { id, newEmail } = req.body;
  try {
    //Verify if the new email is taken or not
    const existingUser = await pool.query(
      "SELECT email FROM users WHERE email = $1 AND id != $2",
      [newEmail, id]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "This email is already taken" });
    }
    
    const updateEmail = await pool.query(
      "UPDATE users SET email = $1 WHERE id = $2",
      [newEmail, id]
    );

    if (updateEmail.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
});

router.put("/changePassword", async (req, res) => {
  const { id, password, newPassword } = req.body;
  try {
    // Get the current password from DB
    const users = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [id]
    );

    if (users.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users.rows[0];

    // Verify current password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Check if new password is the same as the old one
    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the current password",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password in DB
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/username", async (req, res) => {
  const id = req.query;
  try {
    const findUserName = await pool.query(
      `SELECT username FROM users WHERE id = $1`,
      [id]
    );
    if (findUserName.rows.length === 0) {
      return res.status(404).json({ message: "User no Found" });
    }

    const user = findUserName.rows[0];
    res.status(200).json({ username: user });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;
