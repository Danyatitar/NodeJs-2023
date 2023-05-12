import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import { IUser } from "../types/IUser";
function createValidation(
  req: Request,
  res: Response<string>,
  next: NextFunction
) {
  let username = req.body.username;
  if (!username) {
    return res.status(400).send("Username is required");
  }

  const users: Array<IUser> = JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );

  next();
}

export default createValidation;
