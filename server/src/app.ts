import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import path from "path";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import {MONGODB_URI,SESSION_SECRET} from "./utils/secrets";
//Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as categoriesController from "./controllers/category";
import * as adminController from "./controllers/admin";

const MongoStore = mongo(session);

//Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl : string | any = MONGODB_URI;

const session_secret : string | any = SESSION_SECRET;

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

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
app.use(passport.initialize());
app.use(passport.session());


// Access to css,images,and other files
app.use('/admin/static',express.static(__dirname + '/public'));

/*
 * Primary app routes
*/

// Default Zone (entry point)
app.get("/", homeController.index);
app.post('/', homeController.postSignIn);

// Categories Zone
app.get("/categories", categoriesController.getAllcategories);
app.get('/categories/:id',categoriesController.getCategory);
app.post("/categories", categoriesController.addCategory);
app.put("/categories/:id",categoriesController.updateCategory);
app.delete("/categories/:id", categoriesController.deleteCategory);

// Admin Zone 

app.get("/admin",passportConfig.isAuthenticated,adminController.getAdmin);
app.get('/logout',adminController.logout);

app.get('/admin/manage',passportConfig.isAuthenticated,adminController.getManage);
app.post("/admin/manage",passportConfig.isAuthenticated,adminController.postAdmin);

app.get('/admin/categories',passportConfig.isAuthenticated,adminController.getCategories);
app.post('/admin/categories',passportConfig.isAuthenticated,adminController.postCategories);

app.get('/admin/items',passportConfig.isAuthenticated,adminController.getItems);

app.get('/admin/dashboard',passportConfig.isAuthenticated,adminController.getDashboard);

export default app;
