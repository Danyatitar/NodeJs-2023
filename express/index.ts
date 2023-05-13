import express from "express";
import { Express } from "express";
import userRouter from "./routes/users";
import dotenv from "dotenv";
const app: Express = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
