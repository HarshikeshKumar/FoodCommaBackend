import { registerUserService } from "../service/userService.js";

async function createUserController(req, res) {
  console.log("Create user controller called...");
  console.log(req.body);

  // TOD0: Register the user --> Done ho gaya ab

  try {
    const response = await registerUserService(req.body);

    return res.status(200).json({
      message: "Successfully registered the user",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.reason,
      success: false,
      data: {},
      error: error,
    });
  }

  // return res.json({
  //   message: "Ok",
  // });
}

export { createUserController };
