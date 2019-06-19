import mongoose, { Schema } from "mongoose";
import IStatistic from "../interfaces/statistic";

export type StatisticModel = mongoose.Document & {
  DAY: string;
  MONTHS: string;
  YEAR: string;
  price: string;
};

const statisticSchema: Schema = new Schema({
  DAY: { type: String, required: true },
  MONTHS: { type: String, required: true, unique: true },
  YEAR: { type: String, required: true },
  price: { type: String }
});

const Statistic = mongoose.model<StatisticModel>("Statistic", statisticSchema);

export default Statistic;
