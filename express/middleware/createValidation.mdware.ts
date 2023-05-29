import { Request, Response, NextFunction } from "express";
import * as fs from "node:fs/promises";
import { IUser } from "../types/IUser.js";
async function createValidation(
  req: Request,
  res: Response<{ status: number; message: string }>,
  next: NextFunction
) {
  let username = req.body.username;
  if (!username) {
    const result = {
      status: 400,
      message: "Username is required",
    };
    return res.status(400).json(result);
  }

  const users: Array<IUser> = JSON.parse(
    await fs.readFile("./data/users.json", "utf8")
  );

  next();
}

export default createValidation;
