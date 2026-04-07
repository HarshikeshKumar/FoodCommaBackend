import { findUserRepo } from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/serverConfig.js";

async function loginService(authDetails) {
  const email = authDetails.email;
  const plainPassword = authDetails.password;

  // STEP:1. -> Check If there is a registered user with the given email
  const user = await findUserRepo({ email });

  if (!user) {
    throw {
      message: "No User found with the given email",
      statusCode: 404,
    };
  }

  // STEP:2. -> If the user is found we need to compare plainIncomingPassword with hashedPassword
  const isPasswordValidated = await bcrypt.compare(
    plainPassword,
    user.password,
  );

  if (!isPasswordValidated) {
    throw {
      message: "Invalid Password, Please try again",
      statusCode: 401, // 401--> Unauthorized
    };
  }

  // STEP:3. -> If the password is validated, Create a token and return it
  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  return token;
}

export { loginService };
