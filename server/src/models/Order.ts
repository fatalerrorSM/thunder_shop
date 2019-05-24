import mongoose, { Schema } from "mongoose";
import IOrder from "../interfaces/order";

export type OrderModel = mongoose.Document & {
  customer_first_name: string;
  customer_last_name: string;
  customer_email_adress: string;
  customer_phone_number: string;
  customer_order: [];
  price: string;
  order_status: string;
};

const orderSchema: Schema = new Schema(
  {
    customer_first_name: { type: String, required: true },
    customer_last_name: { type: String, required: true },
    customer_email_adress: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_order: { type: Array, required: true },
    price: { type: String },
    order_status: { type: String }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model<OrderModel>("Order", orderSchema);

export default Order;
