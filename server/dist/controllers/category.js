"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../models/Category");
const request = require("express-validator");
exports.getAllcategories = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Category_1.Category.find()
        .then((categories) => {
        if (!categories) {
            res.status(404).send("Categories is not found");
        }
        else {
            res.status(200).json(categories);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.addCategory = (req, res, next) => {
    req.assert("name").len({ min: 1, max: 15 });
    req.assert("image").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        res.status(400).send("Bad Request");
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
exports.getCategory = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let category = Category_1.Category.findById(req.params.id)
        .then((foundCategory) => {
        if (!foundCategory) {
            return res.status(404).send("Category is not found");
        }
        else {
            return res.status(200).json(foundCategory);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.deleteCategory = (req, res) => {
    let category = Category_1.Category.findByIdAndDelete({ _id: req.params.id })
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
        let category = Category_1.Category.findOneAndUpdate({ _id: req.params.id }, {
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
        let category = Category_1.Category.findOneAndUpdate({ _id: req.params.id }, {
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
        let category = Category_1.Category.findOneAndUpdate({ _id: req.params.id }, {
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
