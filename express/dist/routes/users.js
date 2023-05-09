"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const IfExist_mdware_1 = __importDefault(require("../middleware/IfExist.mdware"));
const createValidation_mdware_1 = __importDefault(require("../middleware/createValidation.mdware"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    res.json(users);
});
router.get("/:id", [IfExist_mdware_1.default], (req, res) => {
    const users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    const result = users.find((user) => user.id === parseInt(req.params.id));
    res.json(result);
});
router.patch("/:id", [IfExist_mdware_1.default], (req, res) => {
    let users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    users = users.map((user) => {
        if (user.id === parseInt(req.params.id)) {
            return Object.assign(Object.assign({}, user), req.body);
        }
        else {
            return user;
        }
    });
    fs_1.default.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was updated");
});
router.delete("/:id", [IfExist_mdware_1.default], (req, res) => {
    let users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    fs_1.default.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was deleted");
});
router.post("/", [createValidation_mdware_1.default], (req, res) => {
    let users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    users.push({
        id: req.body.id,
        name: req.body.name ? req.body.name : "",
        username: req.body.username,
    });
    fs_1.default.writeFileSync("./data/users.json", JSON.stringify(users), "utf8");
    res.send("user was added");
});
exports.default = router;
