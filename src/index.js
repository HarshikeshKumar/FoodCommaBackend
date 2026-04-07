import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";
import User from "./schema/userSchema.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import { isLoggedIn } from "./validation/authValidator.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/ping", isLoggedIn, (req, res) => {
  // controller
  console.log(req.body);
  console.log(req.cookies); // req.cookies se Cookie ko access krr skte hai
  return res.json({
    message: "Pong",
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at PORT: ${PORT}...`);

  // Hard coded testing for user registration in db..........

  // const newUser = await User.create({
  //   firstName: "Harshikesh",
  //   lastName: "Kumar",
  //   email: "harshikesh@gmail.com",
  //   password: "123456",
  //   mobileNumber: "7970785645",
  // });
  // console.log("New User Successfully created...");
  // console.log(newUser);
});
