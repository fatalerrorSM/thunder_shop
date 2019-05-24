"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../models/Order"));
const request = require("express-validator");
exports.getAllOrders = (req, res) => {
    Order_1.default.find()
        .then((orders) => {
        if (!orders) {
            res.status(404).send("Orders not found");
        }
        else {
            res.status(200).json(orders);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.getOrder = (req, res) => {
    Order_1.default.findById({ _id: req.params.id })
        .then((foundOrder) => {
        if (!foundOrder) {
            res.status(404).send("Order is not found");
        }
        else {
            res.status(200).json(foundOrder);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
exports.addOrder = (req, res, next) => {
    req.assert("customer_first_name").len({ min: 1 });
    req.assert("customer_last_name").len({ min: 1 });
    req.assert("customer_email_adress").isEmail();
    req.assert("customer_phone_number").isMobilePhone("any");
    req.assert("order_price").notEmpty();
    req
        .assert("customer_order")
        .isArray()
        .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send("Bad Request");
    }
    const order = new Order_1.default({
        customer_first_name: req.body.customer_first_name,
        customer_last_name: req.body.customer_last_name,
        customer_email_adress: req.body.customer_email_adress,
        customer_phone_number: req.body.customer_phone_number,
        customer_order: req.body.customer_order,
        order_status: "Administration of the site, will contact you shortly.",
        price: req.body.order_price
    });
    order.save(err => {
        if (err) {
            return next(err);
        }
        res.status(201).json(order);
    });
};
exports.updateOrder = (req, res) => {
    req.assert("update_status").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send("Bad Request");
    }
    let order = Order_1.default.findById({ _id: req.params.id }, {
        order_status: req.body.update_status
    })
        .then((result) => {
        if (!result) {
            res
                .status(500)
                .send(`Cannot update order with id ${req.params.id} , and body parametrs ${req.body.update_status}`);
        }
        else {
            res.status(200).json(order);
        }
    })
        .catch((err) => {
        console.error(err.message);
        res.redirect("orders");
    });
};
