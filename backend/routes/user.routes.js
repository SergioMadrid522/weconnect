import express from "express";
import bcrypt from "bcryptjs";
import { connection } from "../db.js";
import { hashPassword } from "../hashPassword.js";

const router = express.Router();
router.get("/profile", async (req, res) => {
  const { id } = req.query;
  try {
    const [usersRow] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    
    if (usersRow.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    const user = usersRow[0];
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
    const [existingUser] = await connection.query(
      "SELECT username FROM users WHERE username = ? AND id != ?",
      [newUserName, id]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    //update the username
    const [result] = await connection.query(
      "UPDATE users SET username = ? WHERE id = ?",
      [newUserName, id]
    );

    if (result.affectedRows === 0) {
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
    //Verifies if the new email is taken or not
    const [existingUser] = await connection.query(
      "SELECT email FROM users WHERE email = ? AND id != ?",
      [newEmail, id]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "This email is already taken" });
    }
    //update the email
    const [result] = await connection.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [newEmail, id]
    );
    if (result.affectedRows === 0) {
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
    const [users] = await connection.query(
      "SELECT password FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

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
    const [result] = await connection.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
