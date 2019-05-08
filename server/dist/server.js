"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Message after server successfully started
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("Server successfully started at http://localhost:%d", app_1.default.get("port"));
    console.log("Press CTRL-C to stop\n");
});
exports.default = app_1.default;
