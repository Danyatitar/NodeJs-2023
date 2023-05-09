import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { IUser } from "../types/IUser";
function createValidation(
  req: Request,
  res: Response<string>,
  next: NextFunction
) {
  let username = req.body.username;
  let id = parseInt(req.body.id);

  if (!id) {
    return res.status(400).send("Id is required");
  }
  if (!username) {
    return res.status(400).send("Username is required");
  }

  const users: Array<IUser> = JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );
  const user = users.find((user) => user.id === id);
  if (user) {
    return res.status(400).send("User with such id is already exist");
  }

  next();
}

export default createValidation;
