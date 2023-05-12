import express, { Request, Response, Router } from "express";
import fs from "fs";
import validateUserExists from "../middleware/IfExist.mdware";
import createValidation from "../middleware/createValidation.mdware";
import { IUser } from "../types/IUser";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<IUser[]>) => {
  const users: Array<IUser> = await JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );
  res.json(users);
});

router.get(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<IUser>) => {
    const users: Array<IUser> = await JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );

    const result = users.find((user) => user.id === parseInt(req.params.id));

    res.json(result);
  }
);

router.patch(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = await JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );
    users = users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        return { ...user, ...req.body };
      } else {
        return user;
      }
    });

    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was updated");
  }
);

router.delete(
  "/:id",
  [validateUserExists],
  async (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = await JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was deleted");
  }
);

router.post(
  "/",
  [createValidation],
  async (req: Request, res: Response<string>) => {
    let users: Array<IUser> = await JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );
    const id = [...users].sort((a, b) => b.id - a.id)[0].id + 1;
    users.push({
      id: id,
      name: req.body.name ? req.body.name : "",
      username: req.body.username,
    });
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was added");
  }
);

export default router;
