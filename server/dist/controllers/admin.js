"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../models/Admin"));
const Category_1 = require("../models/Category");
const pug_1 = require("pug");
exports.getAdmin = (req, res) => {
    res.render("admin", {
        title: "admin"
    });
};
exports.getCategories = (req, res) => {
    const cursor = Category_1.Category.find({});
    cursor.then(result => {
        if (!result) {
            res.render("categories", {
                st: false,
                title: "categories",
                err: "Categories can't be downloaded,please,ask your system administrator or try agait later"
            });
        }
        else {
            let formatResult = [];
            result.forEach(category => {
                let obj = {
                    id: category._id,
                    name: category.name,
                    image: category.image
                };
                formatResult.push(obj);
            });
            res.render("categories", {
                st: true,
                title: "categories",
                data: formatResult
            });
        }
    });
};
exports.postCategories = (req, res) => {
    req.assert("radio").notEmpty();
    const errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        pug_1.render("categories", {
            st: false,
            title: "categories",
            error: ""
        });
    }
};
exports.getItems = (req, res) => {
    res.render("items", {
        title: "items"
    });
};
exports.getManage = (req, res) => {
    res.render("manage", {
        title: "manage"
    });
};
exports.getDashboard = (req, res) => {
    res.render("dashboard", {
        title: "dashboard"
    });
};
exports.postAdmin = (req, res, next) => {
    req
        .assert("name")
        .len({ min: 1, max: 15 })
        .notEmpty();
    req
        .assert("family_name")
        .len({ min: 1 })
        .notEmpty();
    req
        .assert("email")
        .isEmail()
        .notEmpty();
    req
        .assert("password")
        .len({ min: 6 })
        .notEmpty();
    req
        .assert("user_name")
        .len({ min: 4 })
        .notEmpty();
    req
        .assert("phone_number")
        .isMobilePhone("any")
        .notEmpty();
    req.assert("age").notEmpty();
    req.assert("city").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        res.status(400).end("Bad Request");
    }
    const admin = new Admin_1.default({
        name: req.body.name,
        family_name: req.body.family_name,
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.user_name,
        phone_number: req.body.phone_number,
        age: req.body.age,
        city: {
            town: req.body.city.town,
            adress: req.body.city.adress,
            city_code: req.body.city.city_code
        }
    });
    Admin_1.default.findOne({ email: req.body.email }, (err, existngAdmin) => {
        if (err) {
            return next(err);
        }
        if (existngAdmin) {
            res.status(500).send("Admin is already exist");
        }
        admin.save(err => {
            if (err) {
                return next(err);
            }
            res.status(201).json(admin);
        });
    });
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};
