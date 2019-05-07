import mongoose, { Schema } from "mongoose";
import ICategory from "../interfaces/category";

export type CategoryModel = mongoose.Document & {
  name: string;
  image: string;
};

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
