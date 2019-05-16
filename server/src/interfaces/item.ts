import { Document , Schema} from "mongoose";

export default interface IItem extends Document {
  name: string,
  price: string,
  discount: number,
  release_date: string,
  activation: string,
  publisher: string,
  language: string,
  genre: {
    type : Schema.Types.ObjectId,
    ref : "Category"
  }
  age_rating: string,
  OS: string,
  images: {
    image_url: string
  },
  description: string,
  specification: {
    minimal: {
      os: string,
      processor: string,
      RAM: string,
      GPU: string,
      disk_space: string
    },
    maximal: {
      os: string,
      processor: string,
      RAM: string,
      GPU: string,
      disk_space: string
    },
  }
}
