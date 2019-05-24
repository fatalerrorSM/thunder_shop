import { Document, Schema } from "mongoose";

export default interface IOrder extends Document {
  customer_first_name: string;
  customer_last_name: string;
  customer_email_adress: string;
  customer_phone_number: string;
  customer_order: [];
  price: string;
  order_status: string;
}
