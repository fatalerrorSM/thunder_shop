import mongoose,{Schema} from "mongoose";
import IItem from "../interfaces/item";

export type ItemModel = mongoose.Document & {
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

const itemSchema: Schema = new Schema(
    {
        name: {type:String,required: true,unique : true},
        price : {type: String,required: true},
        discount : {type: Number,required: true},
        release_date : {type : String, required: true},
        activation : {type : String,required : true},
        publisher : {type : String,required : true},
        language : {type : String,required : true},
        genre : {
            type : Schema.Types.ObjectId,
            ref : "Category",
            required : true
        },
        age_rating : {type:String,required: true},
        OS : {type: String,required : true},
        image : { type : String,required : true},
        description : {type : String,required : true},
        specification : {
            minimal: {
                os : { type : String, required : true},
                processor : { type : String, required : true},
                RAM : { type : String, required : true},
                GPU : { type : String, required : true},
                disk_space : { type : String, required : true}
            },
            maximal : {
                os : { type : String, required : true},
                processor : { type : String, required : true},
                RAM : { type : String, required : true},
                GPU : { type : String, required : true},
                disk_space : { type : String, required : true}
            }
        }
    },
    {
        timestamps : true
    }
);

const Item = mongoose.model<ItemModel>("Item",itemSchema);

export default Item;