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
const itemSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    discount: { type: Number, required: true },
    release_date: { type: String, required: true },
    activation: { type: String, required: true },
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    genre: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    age_rating: { type: String, required: true },
    OS: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    specification: {
        minimal: {
            os: { type: String, required: true },
            processor: { type: String, required: true },
            RAM: { type: String, required: true },
            GPU: { type: String, required: true },
            disk_space: { type: String, required: true }
        },
        maximal: {
            os: { type: String, required: true },
            processor: { type: String, required: true },
            RAM: { type: String, required: true },
            GPU: { type: String, required: true },
            disk_space: { type: String, required: true }
        }
    }
}, {
    timestamps: true
});
const Item = mongoose_1.default.model("Item", itemSchema);
exports.default = Item;
