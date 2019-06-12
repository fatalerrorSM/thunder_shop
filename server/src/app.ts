import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import path from "path";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";
//Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as categoriesController from "./controllers/category";
import * as adminController from "./controllers/admin";
import * as itemController from "./controllers/item";
import * as orderController from "./controllers/orders";
import * as statisticController from "./controllers/statistic";

const MongoStore = mongo(session);

//Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl: string | any = MONGODB_URI;

const session_secret: string | any = SESSION_SECRET;

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

//Express middleware configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: session_secret,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  })
);
app.use(function (req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})
app.use(passport.initialize());
app.use(passport.session());

// Access to css,images,and other files
app.use("/admin/static", express.static(__dirname + "/public"));

/*
 * Primary app routes
 */

// Default Zone (entry point)
app.get("/", homeController.index);
app.post("/", homeController.postSignIn);

// Categories Zone
app.get("/categories", categoriesController.getAllcategories);
app.get("/categories/:id", categoriesController.getCategory);
app.post("/categories", categoriesController.addCategory);
app.put("/categories/:id", categoriesController.updateCategory);
app.delete("/categories/:id", categoriesController.deleteCategory);

// Items Zone
app.get("/items", itemController.getAllItems);
app.get("/item/:id", itemController.getItem);
app.get("/item-by-genre/:id",itemController.getItemsByGenre);
app.post("/item", itemController.addItem);
app.delete("/item/:id", itemController.deleteItem);
app.put("/item/:id", itemController.updateItem);

// Statistic Zone

app.get("/stats",statisticController.getStat);

// Orders Zone
app.get("/orders", orderController.getAllOrders);
app.get("/orders/:id", orderController.getOrder);
app.post("/orders", orderController.addOrder);
app.put("/orders/:id", orderController.updateOrder);

// Admin Zone

app.get("/admin", passportConfig.isAuthenticated, adminController.getAdmin);
app.post("/admin", adminController.postAdmin);
app.get("/logout", adminController.logout);

app.get(
  "/admin/orders",
  passportConfig.isAuthenticated,
  adminController.getOrders
);
app.post(
  "/admin/orders",
  passportConfig.isAuthenticated,
  adminController.postOrders
);


app.get(
  "/admin/categories",
  passportConfig.isAuthenticated,
  adminController.getCategories
);
app.post(
  "/admin/categories",
  passportConfig.isAuthenticated,
  adminController.postCategories
);

app.get(
  "/admin/items",
  passportConfig.isAuthenticated,
  adminController.getItems
);
app.post(
  "/admin/items",
  passportConfig.isAuthenticated,
  adminController.postItem
);

app.get(
  "/admin/dashboard",
  passportConfig.isAuthenticated,
  adminController.getDashboard
);

export default app;
