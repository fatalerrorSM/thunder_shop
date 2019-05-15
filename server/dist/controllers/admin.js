"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../models/Admin"));
const Category_1 = require("../models/Category");
const pug_1 = require("pug");
const got_1 = __importDefault(require("got"));
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
    req.assert("name").len({ min: 1, max: 15 });
    req.assert("image").notEmpty();
    req.assert("id");
    const errors = req.validationErrors();
    if (errors) {
        return res.render("categories", {
            st: false,
            title: "categories",
            error: "Something goes wrong try again"
        });
    }
    switch (req.body.radio) {
        case "add-radio": {
            let options = {
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: req.body.name,
                    image: req.body.image
                })
            };
            got_1.default
                .post(`${process.env.LOCAL_URL}/categories`, options)
                .then(response => {
                if (response.statusCode === 201) {
                    return res.redirect("categories");
                }
                else {
                    return res.render("categories", {
                        st: false,
                        title: "categories",
                        error: response.statusMessage
                    });
                }
            })
                .catch((err) => {
                console.error(err.message);
            });
            break;
        }
        case "update-radio": {
            console.log(req.body.id);
            if (req.body.id) {
                const options = {
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: req.body.name,
                        image: req.body.image
                    })
                };
                got_1.default.put(`${process.env.LOCAL_URL}/categories/${req.body.id}`, options).then(response => {
                    if (response.statusCode === 200) {
                        return res.redirect("categories");
                    }
                    else {
                        return pug_1.render("categories", {
                            st: false,
                            title: "categories",
                            error: response.statusMessage
                        });
                    }
                }).catch((err) => {
                    console.error(err.message);
                });
            }
            else {
                res.render("categories", {
                    st: false,
                    title: "categories",
                    error: "ID is not selected"
                });
            }
            break;
        }
        case "delete-radio": {
            if (req.body.id) {
                got_1.default.delete(`${process.env.LOCAL_URL}/categories/${req.body.id}`).then(response => {
                    if (response.statusCode === 200) {
                        return res.redirect("categories");
                    }
                    else {
                        res.render("categories", {
                            st: false,
                            title: "categories",
                            error: "Something goes wrong try again"
                        });
                    }
                }).catch((err) => {
                    console.error(err.message);
                });
            }
            break;
        }
        default:
            break;
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
exports.addCategory = (req, res, next) => {
    req.assert("radio").notEmpty();
    req.assert("name").len({ min: 1, max: 15 });
    req.assert("image").notEmpty();
    req.assert("name").len({ min: 1, max: 15 });
    req.assert("image").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.render("categories", {
            st: false,
            title: "categories",
            error: ""
        });
    }
    const category = new Category_1.Category({
        name: req.body.name,
        image: req.body.image
    });
    Category_1.Category.findOne({ name: req.body.name }, (err, existngCategory) => {
        if (err) {
            return next(err);
        }
        if (existngCategory) {
            res.status(500).send("Category is already exist");
        }
        category.save(err => {
            if (err) {
                return next(err);
            }
            res.status(201).json(category);
        });
    });
};
exports.deleteCategory = (req, res) => {
    let category = Category_1.Category.findByIdAndDelete(req.params.id)
        .then((result) => {
        if (!result) {
            return res
                .status(500)
                .send(`Can't delete document with id -> ${req.params.id}`);
        }
        else {
            return res
                .status(200)
                .send(`Document with id -> ${req.params.id} successfully deleted`);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.updateCategory = (req, res) => {
    if (!req.body.name && !req.body.image) {
        return res.status(202).send("Object with options for update is empty");
    }
    else if (req.body.name && !req.body.image) {
        let category = Category_1.Category.findOneAndUpdate(req.params.id, {
            name: req.body.name
        }).then((result) => {
            if (!result) {
                return res
                    .status(500)
                    .send(`Cannot update category with id ${req.params.id} , and body parametrs ${req.body.name}`);
            }
            else {
                return res.status(200).json(category);
            }
        });
    }
    else if (!req.body.name && req.body.image) {
        let category = Category_1.Category.findOneAndUpdate(req.params.id, {
            image: req.body.image
        }).then((result) => {
            if (!result) {
                return res
                    .status(500)
                    .send(`Cannot update category with id ${req.params.id} , and body parametrs ${req.body.image}`);
            }
            else {
                return res.status(200).json(category);
            }
        });
    }
    else if (req.body.name && req.body.image) {
        let category = Category_1.Category.findOneAndUpdate(req.params.id, {
            name: req.body.name,
            image: req.body.image
        }).then((result) => {
            if (!result) {
                return res
                    .status(500)
                    .send(`Cannot update category with id ${req.params.id} , and body parametrs ${req.body.name} ${req.body.image}`);
            }
            else {
                return res.status(200).json(category);
            }
        });
    }
};
