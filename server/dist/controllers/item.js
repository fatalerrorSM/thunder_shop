"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../models/Item"));
const Category_1 = require("../models/Category");
exports.getAllItems = (req, res) => {
    Item_1.default.find()
        .then((items) => {
        if (!items) {
            return res.status(404).send("Items is not found");
        }
        else {
            return res.status(200).json(items);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.getItem = (req, res) => {
    Item_1.default.findById(req.params.id)
        .then((foundItem) => {
        if (!foundItem) {
            return res.status(404).send("Item is not found");
        }
        else {
            return res.status(200).json(foundItem);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.addItem = (req, res, next) => {
    req.assert("name").len({ min: 1 });
    req.assert("price").len({ min: 1 });
    req.assert("discount");
    req.assert("release_date").len({ min: 1 });
    req.assert("activation").len({ min: 1 });
    req.assert("publisher").len({ min: 1 });
    req.assert("language").len({ min: 1 });
    req.assert("age_rating").len({ min: 1 });
    req.assert("OS").len({ min: 1 });
    req.assert("image").len({ min: 1 });
    req.assert("description").len({ min: 10 });
    req.assert("specification").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).end("Bad Request");
    }
    Category_1.Category.findOne({ name: req.body.genre }).then((category) => {
        Item_1.default.findOne({ name: req.body.name })
            .then((existngItem) => {
            if (existngItem) {
                res.status(500).send("Category is already exist");
            }
            else {
                next();
            }
        })
            .catch((err) => {
            console.error(err);
            return res.status(500);
        });
        Item_1.default.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            release_date: req.body.release_date,
            activation: req.body.activation,
            publisher: req.body.publisher,
            language: req.body.language,
            genre: category._id,
            age_rating: req.body.age_rating,
            OS: req.body.operating_system,
            image: req.body.image_URL,
            description: req.body.description,
            specification: {
                minimal: {
                    os: req.body.specification.minimal.os,
                    processor: req.body.specification.minimal.processor,
                    RAM: req.body.specification.minimal.ram,
                    GPU: req.body.specification.minimal.gpu,
                    disk_space: req.body.specification.minimal.disk_space
                },
                maximal: {
                    os: req.body.specification.maximal.os,
                    processor: req.body.specification.maximal.processor,
                    RAM: req.body.specification.maximal.ram,
                    GPU: req.body.specification.maximal.gpu,
                    disk_space: req.body.specification.maximal.disk_space
                }
            }
        })
            .then(item => {
            if (!item)
                return res.status(500);
            else
                return res.status(200).send(`Item with ${item._id} created`);
        })
            .catch((err) => {
            console.error(err.message);
        });
    });
};
exports.deleteItem = (req, res) => {
    Item_1.default.findByIdAndDelete(req.params.id)
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
exports.updateItem = (req, res) => {
    req.assert("name").len({ min: 1 });
    req.assert("price").len({ min: 1 });
    req.assert("discount");
    req.assert("release_date").len({ min: 1 });
    req.assert("activation").len({ min: 1 });
    req.assert("publisher").len({ min: 1 });
    req.assert("language").len({ min: 1 });
    req.assert("age_rating").len({ min: 1 });
    req.assert("OS").len({ min: 1 });
    req.assert("image").len({ min: 1 });
    req.assert("description").len({ min: 10 });
    req.assert("specification").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).end("Bad Request");
    }
    let item = Item_1.default.findOneAndUpdate(req.params.id, {});
};
