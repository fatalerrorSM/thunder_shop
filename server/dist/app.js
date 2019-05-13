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
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = __importDefault(require("express-validator"));
const path_1 = __importDefault(require("path"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("./utils/secrets");
//Controllers (route handlers)
const homeController = __importStar(require("./controllers/home"));
const categoriesController = __importStar(require("./controllers/category"));
const adminController = __importStar(require("./controllers/admin"));
const MongoStore = connect_mongo_1.default(express_session_1.default);
//Create Express server
const app = express_1.default();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
const session_secret = secrets_1.SESSION_SECRET;
// API keys and Passport configuration
const passportConfig = __importStar(require("./config/passport"));
mongoose_1.default
    .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch((err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
//Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_validator_1.default());
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: session_secret,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Access to css,images,and other files
app.use('/admin/static', express_1.default.static(__dirname + '/public'));
/*
 * Primary app routes
*/
// Default Zone (entry point)
app.get("/", homeController.index);
app.post('/', homeController.postSignIn);
// Categories Zone
app.get("/categories", categoriesController.getAllcategories);
app.get('/categories/:id', categoriesController.getCategory);
app.post("/categories", categoriesController.addCategory);
app.put("/categories/:id", categoriesController.updateCategory);
app.delete("/categories/:id", categoriesController.deleteCategory);
// Admin Zone 
app.get("/admin", passportConfig.isAuthenticated, adminController.getAdmin);
app.get('/logout', adminController.logout);
app.get('/admin/manage', passportConfig.isAuthenticated, adminController.getManage);
app.post("/admin/manage", passportConfig.isAuthenticated, adminController.postAdmin);
app.get('/admin/categories', passportConfig.isAuthenticated, adminController.getCategories);
app.post('/admin/categories', passportConfig.isAuthenticated, adminController.postCategories);
app.get('/admin/items', passportConfig.isAuthenticated, adminController.getItems);
app.get('/admin/dashboard', passportConfig.isAuthenticated, adminController.getDashboard);
exports.default = app;
