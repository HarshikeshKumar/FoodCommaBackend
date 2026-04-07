import { loginService } from "../service/authService.js";

async function loginController(req, res) {
  // Auth Service
  try {
    const loginPayload = req.body;
    const response = await loginService(loginPayload);

    return res.status(200).json({
      success: true,
      message: "Loged in Successfully",
      data: response,
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
