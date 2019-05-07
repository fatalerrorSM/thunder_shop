import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import path from "path";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import {MONGODB_URI,SESSION_SECRET} from "./utils/secrets";
//Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as categoriesController from "./controllers/category";

const MongoStore = mongo(session);

//Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl : string | any = MONGODB_URI;

const session_secret : string | any = SESSION_SECRET;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true,useCreateIndex: true, useFindAndModify: false  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

//Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: session_secret,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
}));

/*
 * Primary app routes
 */

// Default Zone (entry point for test app)
app.get("/", homeController.index);

// Categories Zone
app.get("/categories", categoriesController.getAllcategories);
app.get('/categories/:id',categoriesController.getCategory);
app.post("/categories", categoriesController.addCategory);
app.put("/categories/:id",categoriesController.updateCategory);
app.delete("/categories/:id", categoriesController.deleteCategory);

export default app;
