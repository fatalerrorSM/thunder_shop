"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../models/Item"));
const Category_1 = require("../models/Category");
exports.getAllItems = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
exports.getItemsByGenre = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Item_1.default.find({ genre: req.params.id }).then((items) => {
        if (!items) {
            return res.status(404).send(`Items with genre id ${req.params.id} not found`);
        }
        else {
            return res.status(200).json(items);
        }
    });
};
exports.getItem = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.params.id) {
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
    }
    else {
        return res.status(400).send(`Bad Request`);
    }
};
exports.addItem = (req, res, next) => {
    req.assert("name").len({ min: 1 });
    req.assert("price").len({ min: 1 });
    req.assert("discount");
    req.assert("release_date").len({ min: 1 });
    req.assert("activation").len({ min: 1 });
    req.assert("publisher").len({ min: 1 });
    req.assert("language").len({ min: 1 });
    req.assert("genre").notEmpty();
    req.assert("age_rating").len({ min: 1 });
    req.assert("os").len({ min: 1 });
    req.assert("image_url").len({ min: 1 });
    req.assert("description").len({ min: 10 });
    req.assert("minimal_specification").notEmpty();
    req.assert("maximal_specification").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        console.error(errors);
        return res.status(400).end("Bad Request");
    }
    Category_1.Category.findOne({ name: req.body.genre }).then((category) => {
        Item_1.default.findOne({ name: req.body.name })
            .then((existngItem) => {
            if (existngItem) {
                return res.status(500).send("Item is already exist");
            }
            else {
                return next();
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500);
        });
        let min_spec = req.body.minimal_specification.split("\r\n");
        let max_spec = req.body.maximal_specification.split("\r\n");
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
            OS: req.body.os,
            image: req.body.image_url,
            description: req.body.description,
            specification: {
                minimal: {
                    os: min_spec[0],
                    processor: min_spec[1],
                    RAM: min_spec[2],
                    GPU: min_spec[3],
                    disk_space: min_spec[4]
                },
                maximal: {
                    os: max_spec[0],
                    processor: max_spec[1],
                    RAM: max_spec[2],
                    GPU: max_spec[3],
                    disk_space: max_spec[4]
                }
            }
        })
            .then(item => {
            if (!item)
                return res.status(500);
            else
                return res.status(201).send(`Item with ${item._id} created`);
        })
            .catch((err) => {
            console.error(err.message);
        });
    });
};
exports.deleteItem = (req, res) => {
    if (req.params.id) {
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
    }
    else {
        return res.status(400).send(`Bad Request`);
    }
};
exports.updateItem = (req, res) => {
    if (req.body.id &&
        req.body.name &&
        req.body.price &&
        req.body.discount &&
        req.body.release_date &&
        req.body.activation &&
        req.body.publisher &&
        req.body.language &&
        req.body.genre &&
        req.body.age_rating &&
        req.body.os &&
        req.body.image_url &&
        req.body.description &&
        req.body.minimal_specification &&
        req.body.maximal_specification) {
        let min_spec = req.body.minimal_specification.split("\r\n");
        let max_spec = req.body.maximal_specification.split("\r\n");
        Category_1.Category.findOne({ name: req.body.genre })
            .then((result) => {
            let item = Item_1.default.findOneAndUpdate(req.params.id, {
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                release_date: req.body.release_date,
                activation: req.body.activation,
                publisher: req.body.publisher,
                language: req.body.language,
                genre: result._id,
                age_rating: req.body.age_rating,
                OS: req.body.os,
                image: req.body.image_url,
                description: req.body.description,
                specification: {
                    minimal: {
                        os: min_spec[0],
                        processor: min_spec[1],
                        RAM: min_spec[2],
                        GPU: min_spec[3],
                        disk_space: min_spec[4]
                    },
                    maximal: {
                        os: max_spec[0],
                        processor: max_spec[1],
                        RAM: max_spec[2],
                        GPU: max_spec[3],
                        disk_space: max_spec[4]
                    }
                }
            })
                .then(up_res => {
                if (!up_res) {
                    return res
                        .status(500)
                        .send(`Cannot update category with id ${req.params.id}`);
                }
                else {
                    return res.status(200).json(item);
                }
            })
                .catch((err) => {
                console.error(err.message);
            });
        })
            .catch((err) => {
            console.error(err.message);
        });
    }
    else {
        res.status(500).send("Some field is empty or null");
    }
};
