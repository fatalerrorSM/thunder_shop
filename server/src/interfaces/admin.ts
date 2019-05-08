import {Document} from "mongoose";

export default interface IAdmin extends Document{
    name : string,
    family_name : string,
    email : string,
    password : string,
    user_name : string,
    phone_number : string,
    age : number,
    city : {
        town : string,
        adress : string,
        city_code : number,
        full_address : string
    }
}