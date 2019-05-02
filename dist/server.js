"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//Controllers (route handlers)
const homeController = __importStar(require("./controllers/home"));
//Load env variables from .env files
dotenv_1.default.config({ path: '.env' });
//Create Express server
const app = express_1.default();
//Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, '../views'));
app.set("view engine", "pug");
/*
* Primary app routes
*/
app.get('/', homeController.index);
// Message after server successfully started
app.listen(process.env.PORT, () => {
    console.log(`Server successfully started at port ${process.env.PORT}`);
});
