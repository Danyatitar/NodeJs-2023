"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function validateUserExists(req, res, next) {
    let id = parseInt(req.params.id);
    const users = JSON.parse(fs_1.default.readFileSync("./data/users.json", "utf8"));
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).send("User not found");
    }
    next();
}
exports.default = validateUserExists;
