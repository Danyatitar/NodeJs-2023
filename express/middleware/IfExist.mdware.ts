import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import { IUser } from "../types/IUser";
async function validateUserExists(
  req: Request<{ id: string }>,
  res: Response<string>,
  next: NextFunction
) {
  let id = parseInt(req.params.id);
  const users: Array<IUser> = await JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  next();
}

export default validateUserExists;
