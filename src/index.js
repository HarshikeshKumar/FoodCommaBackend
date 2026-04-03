import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post("/ping", (req, res) => {
  console.log(req.body);
  return res.json({
    message: "Pong",
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at PORT: ${PORT}...`);
});
