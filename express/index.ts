import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users";
const app: Express = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
