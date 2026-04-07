import { loginService } from "../service/authService.js";

async function loginController(req, res) {
  // Auth Service
  try {
    const loginPayload = req.body;
    const response = await loginService(loginPayload);

    res.cookie("authToken", response, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7-days in ms
    });

    return res.status(200).json({
      success: true,
      message: "Loged in Successfully",
      data: {},
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

export { loginController };
