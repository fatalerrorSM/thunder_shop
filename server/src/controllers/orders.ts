import { Request, Response, NextFunction } from "express";
import { Category, CategoryModel } from "../models/Category";

import Order from "../models/Order";
import Item, { ItemModel } from "../models/Item";

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

  const order = new Order({
    customer_first_name: req.body.customer_first_name,
    customer_last_name: req.body.customer_last_name,
    customer_email_adress: req.body.customer_email_adress,
    customer_phone_number: req.body.customer_phone_number,
    customer_order: req.body.customer_order,
    order_status: "Administration of the site, will contact you shortly.",
    price : req.body.order_price
  });

  order.save(err => {
    if (err) {
      return next(err);
    }
    res.status(201).json(order);
  });
};

export let updateOrder = (req: Request, res: Response) => {
  req.assert("update_status").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send("Bad Request");
  }

  let order: any = Order.findById(
    { _id: req.params.id },
    {
      order_status: req.body.update_status
    }
  )
    .then((result: any) => {
      if (!result) {
        res
          .status(500)
          .send(
            `Cannot update order with id ${
              req.params.id
            } , and body parametrs ${req.body.update_status}`
          );
      } else {
        res.status(200).json(order);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
      res.redirect("orders");
    });
};
