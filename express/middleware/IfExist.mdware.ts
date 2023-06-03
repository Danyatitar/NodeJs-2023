import { Request, Response, NextFunction } from "express";
import * as fs from "node:fs/promises";
import { IUser } from "../types/IUser.js";
async function validateUserExists(
  req: Request<{ id: string }>,
  res: Response<{ status: number; message: string }>,
  next: NextFunction
) {
  let id = parseInt(req.params.id);
  const users: Array<IUser> = JSON.parse(
    await fs.readFile("./data/users.json", "utf8")
  );
  const user = users.find((user) => user.id === id);
  if (!user) {
    const result = {
      status: 404,
      message: "User don't found",
    };
    return res.status(404).json(result);
  }
  next();
}

export default validateUserExists;
