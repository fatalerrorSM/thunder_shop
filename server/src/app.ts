import express from "express";
import dotenv from "dotenv";
import path from "path";
//Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as adminController from "./controllers/admin";


//Load env variables from .env files
dotenv.config({ path: ".env" });

//Create Express server
const app = express();

//Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

/*
 * Primary app routes
 */

// User Zone

app.get("/", homeController.index);

// Admins Zone

app.get("/admin",adminController.getAdminPage)

export default app;