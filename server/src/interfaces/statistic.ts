import { Document, Schema } from "mongoose";

export default interface IStatistic extends Document {
    DAY: string;
    MONTHS : string;
    YEAR: string;
    price : string;
}