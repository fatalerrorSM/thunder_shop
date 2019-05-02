import express from "express";
import dotenv from "dotenv";
import path from "path";
//Controllers (route handlers)
import * as homeController from "./controllers/home";

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

app.get("/", homeController.index);

// Message after server successfully started
app.listen(process.env.PORT, () => {
  console.log(`Server successfully started at port ${process.env.PORT}`);
});

export default app;
