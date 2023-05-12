import express from "express";
import dotenv from "dotenv";
import { Express } from "express";
import userRouter from "./routes/users";
const app: Express = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
