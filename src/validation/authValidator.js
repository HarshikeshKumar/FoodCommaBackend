import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

async function isLoggedIn(req, res, next) {
  // Token ko access kiya....
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not Authenticated",
      message: "No Auth Token Provided",
    });
  }

  // Agar Token mila hai......
  const decoded = jwt.verify(token, JWT_SECRET); // Is decoded var me decoded Payload para hai

  // Agar kisi ne Token Tamperred krr diya(wrong token)
  if (!decoded) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not Authenticated",
      message: "Invalid Token Provided",
    });
  }

  // If reached here.., then user is authenticated allow them to access the API

  // OPTIONAL--> Is se controller me ham ham pata krr skte hai ki kon se user ne request kiya hai, user object ke under email aur id bhej rahe hai ham controller me dekh skte hai ki kis user ne request kiya hai
  req.user = {
    email: decoded.email,
    id: decoded.id,
  };

  next();
}

export { isLoggedIn };
