import { isEmpty } from "../utils/isEmpty.js";
import { regexEmail } from "../validators/regex.js";

export function userSignUpValidation(data) {
  const errors = [];

  if (isEmpty(data.username)) {
    errors.push("Username cannot be empty");
  }
  if (isEmpty(data.email)) {
    errors.push("Email cannot be empty");
  } else if (!regexEmail.test(data.email)) {
    errors.push("This email is not a real one");
  }

  if (isEmpty(data.password)) {
    errors.push("You have to set a password");
  } else if (data.password.length < 8) {
    errors.push("Password must have at least 8 characters");
  }

  return errors;
}

export function userLoginValidation(data) {
  const errors = [];

  if (isEmpty(data.email)) {
    errors.push("Email cannot be empty");
  } else if (!regexEmail.test(data.email)) {
    errors.push("This email is not a real one");
  }

  if (isEmpty(data.password)) {
    errors.push("You have to set a password");
  } else if (data.password.length < 8) {
    errors.push("Password must have at least 8 characters");
  }

  return errors;
}
