import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
}
