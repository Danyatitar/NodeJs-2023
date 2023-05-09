import express, { Request, Response, Router } from "express";
import fs from "fs";
import validateUserExists from "../middleware/IfExist.mdware";
import createValidation from "../middleware/createValidation.mdware";
import { IUser } from "../types/IUser";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response<IUser[]>) => {
  const users: Array<IUser> = JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );
  res.json(users);
});

router.get(
  "/:id",
  [validateUserExists],
  (req: Request<{ id: string }>, res: Response<IUser>) => {
    const users: Array<IUser> = JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );

    const result = users.find((user) => user.id === parseInt(req.params.id));

    res.json(result);
  }
);

router.patch(
  "/:id",
  [validateUserExists],
  (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = JSON.parse(
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
  (req: Request<{ id: string }>, res: Response<string>) => {
    let users: Array<IUser> = JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was deleted");
  }
);

router.post("/", [createValidation], (req: Request, res: Response<string>) => {
  let users: Array<IUser> = JSON.parse(
    fs.readFileSync("./data/users.json", "utf8")
  );
  users.push({
    id: req.body.id,
    name: req.body.name ? req.body.name : "",
    username: req.body.username,
  });
  fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
  res.send("user was added");
});

export default router;
