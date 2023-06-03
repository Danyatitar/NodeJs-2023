import express from "express";

import userRouter from "./routes/users.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
