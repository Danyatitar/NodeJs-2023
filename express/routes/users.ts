import { Request, Response, Router } from "express";
import express from "express";
import * as fs from "node:fs/promises";
import validateUserExists from "../middleware/IfExist.mdware.js";
import createValidation from "../middleware/createValidation.mdware.js";
import { IUser } from "../types/IUser.js";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<IUser[]>) => {
  const users: Array<IUser> = JSON.parse(
    await fs.readFile("./data/users.json", "utf8")
  );
  res.json(users);
});

router.get(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<IUser>) => {
    const users: Array<IUser> = JSON.parse(
      await fs.readFile("./data/users.json", "utf8")
    );

    const result = users.find((user) => user.id === parseInt(req.params.id));

    res.json(result);
  }
);

router.patch(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = JSON.parse(
      await fs.readFile("./data/users.json", "utf8")
    );
    users = users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        return { ...user, ...req.body };
      } else {
        return user;
      }
    });

    await fs.writeFile("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was updated");
  }
);

router.delete(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = JSON.parse(
      await fs.readFile("./data/users.json", "utf8")
    );
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    await fs.writeFile("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was deleted");
  }
);

router.post(
  "/",
  [createValidation],
  async (req: Request, res: Response<string>) => {
    let users: Array<IUser> = JSON.parse(
      await fs.readFile("./data/users.json", "utf8")
    );
    const id = [...users].sort((a, b) => b.id - a.id)[0].id + 1;
    users.push({
      id: id,
      name: req.body.name ? req.body.name : "",
      username: req.body.username,
    });
    await fs.writeFile("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was added");
  }
);

export default router;
