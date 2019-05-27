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
const statisticSchema = new mongoose_1.Schema({
    DAY: { type: String, required: true },
    MONTHS: { type: String, required: true, unique: true },
    YEAR: { type: String, required: true },
    price: { type: String }
});
const Statistic = mongoose_1.default.model("Statistic", statisticSchema);
exports.default = Statistic;
