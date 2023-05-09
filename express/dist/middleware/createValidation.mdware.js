"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function createValidation(req, res, next) {
    let username = req.body.username;
    let id = parseInt(req.body.id);
    if (!id) {
        return res.status(400).send("Id is required");
    }
    if (!username) {
        return res.status(400).send("Username is required");
    }
    const users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.status(400).send("User with such id is already exist");
    }
    next();
}
exports.default = createValidation;
