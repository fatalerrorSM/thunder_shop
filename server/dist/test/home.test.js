"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
test("GET /home", () => {
    got_1.default(`http://localhost:${process.env.PORT}`).then(res => {
        expect(res.statusCode).toBe(200);
    });
});
