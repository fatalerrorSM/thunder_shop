"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const Order_1 = __importDefault(require("../models/Order"));
const Statistic_1 = __importDefault(require("../models/Statistic"));
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
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    const date = getDate();
    Statistic_1.default.findOne({ MONTHS: date.Month })
        .then((result) => {
        let tempReqPrice = parseInt(req.body.order_price);
        if (!result) {
            const stats = new Statistic_1.default({
                DAY: date.Day,
                MONTHS: date.Month,
                YEAR: date.Year,
                price: tempReqPrice
            });
            stats.save(err => {
                if (err) {
                    return next(err);
                }
            });
        }
        else {
            let tempPrice = result.price;
            let tempReqPrice = parseInt(req.body.order_price);
            let resPrice = 0;
            resPrice = parseInt(tempPrice) + tempReqPrice;
            Statistic_1.default.findOneAndUpdate({ MONTHS: date.Month }, {
                DAY: date.Day,
                price: resPrice
            }).catch((err) => {
                console.error(err.message);
            });
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
    const order = new Order_1.default({
        customer_first_name: req.body.customer_first_name,
        customer_last_name: req.body.customer_last_name,
        customer_email_adress: req.body.customer_email_adress,
        customer_phone_number: req.body.customer_phone_number,
        customer_order: req.body.customer_order,
        order_status: "Administration of the site, will contact you shortly.",
        price: req.body.order_price
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.customer_email_adress,
        subject: "Thunder Shop",
        text: `Hello ${order.customer_first_name} ${order.customer_last_name},thank you for your order -> ${order.customer_order}.To pay - ${order.price}$. ${order.order_status}`
    };
    order.save(err => {
        if (err) {
            return next(err);
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(201).json(order);
    });
};
exports.updateOrder = (req, res) => {
    req.assert("update_status").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send("Bad Request");
    }
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    const order = Order_1.default.findOneAndUpdate({ _id: req.params.id }, {
        order_status: req.body.update_status
    })
        .then((result) => {
        if (!result) {
            return res
                .status(500)
                .send(`Cannot update order with id ${req.params.id} , and body parametrs ${req.body.update_status}`);
        }
        else {
            var mailOptions = {
                from: process.env.EMAIL,
                to: result.customer_email_adress,
                subject: "Thunder Shop",
                text: `Hello ${result.customer_first_name} ${result.customer_last_name}.${req.body.update_status}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return res.status(200).json(order);
        }
    })
        .catch((err) => {
        console.error(err.message);
    });
};
function getDate() {
    let date = new Date();
    const resultDate = {
        Day: date.getDate(),
        Month: date.getMonth() + 1,
        Year: date.getFullYear()
    };
    return resultDate;
}
