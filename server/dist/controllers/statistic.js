"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Statistic_1 = __importDefault(require("../models/Statistic"));
exports.getStat = (req, res) => {
    Statistic_1.default.find({}).then(result => {
        if (!result) {
            return res.status(404).send("Not found");
        }
        else {
            return res.status(200).json(result);
        }
    });
};
