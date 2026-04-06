import express from "express";
import { createUserController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUserController);

export default userRouter;
