"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    customer_first_name: { type: String, required: true },
    customer_last_name: { type: String, required: true },
    customer_email_adress: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_order: { type: Array, required: true },
    price: { type: String },
    order_status: { type: String }
}, {
    timestamps: true
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
