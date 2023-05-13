import { Express } from "express";
import express from "express";
import dotenv from "dotenv";
import queryRouter from "./routes/queries";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/", queryRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
