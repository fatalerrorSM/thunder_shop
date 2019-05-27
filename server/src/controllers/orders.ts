import { Request, Response, NextFunction } from "express";
import { Category, CategoryModel } from "../models/Category";
import nodemailer from "nodemailer";

import Order from "../models/Order";
import Item, { ItemModel } from "../models/Item";
import Statistic from "../models/Statistic";

const request = require("express-validator");

export let getAllOrders = (req: Request, res: Response) => {
  Order.find()
    .then((orders: any) => {
      if (!orders) {
        res.status(404).send("Orders not found");
      } else {
        res.status(200).json(orders);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let getOrder = (req: Request, res: Response) => {
  Order.findById({ _id: req.params.id })
    .then((foundOrder: any) => {
      if (!foundOrder) {
        res.status(404).send("Order is not found");
      } else {
        res.status(200).json(foundOrder);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let addOrder = (req: Request, res: Response, next: NextFunction) => {
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

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const date = getDate();

  Statistic.findOne({ MONTHS: date.Month })
    .then((result: any) => {
      let tempReqPrice = req.body.order_price.split("$");
      if (!result) {
        const stats = new Statistic({
          DAY: date.Day,
          MONTHS: date.Month,
          YEAR: date.Year,
          price: tempReqPrice[0]
        });

        stats.save(err => {
          if (err) {
            return next(err);
          }
        });
      } else {
        let tempPrice = result.price;
        let tempReqPrice = req.body.order_price.split("$");
        let resPrice = 0;
        resPrice = parseInt(tempPrice) + parseInt(tempReqPrice[0]);
        Statistic.findOneAndUpdate({MONTHS : date.Month}, {
          DAY : date.Day,
          price : resPrice
        }).catch((err : Error) => {
          console.error(err.message);
        })
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });

  const order = new Order({
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
    text: `Hello ${order.customer_first_name} ${
      order.customer_last_name
    },thank you for your order -> ${order.customer_order}.To pay - ${
      order.price
    }. ${order.order_status}`
  };

  order.save(err => {
    if (err) {
      return next(err);
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(201).json(order);
  });
};

export let updateOrder = (req: Request, res: Response) => {
  req.assert("update_status").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send("Bad Request");
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  let order: any = Order.findByIdAndUpdate(
    { _id: req.params.id },
    {
      order_status: req.body.update_status
    }
  )
    .then((result: any) => {
      if (!result) {
        return res
          .status(500)
          .send(
            `Cannot update order with id ${
              req.params.id
            } , and body parametrs ${req.body.update_status}`
          );
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: result.customer_email_adress,
          subject: "Thunder Shop",
          text: `Hello ${result.customer_first_name} ${
            result.customer_last_name
          }.${result.order_status}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res.status(200).json(order);
      }
    })
    .catch((err: Error) => {
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
