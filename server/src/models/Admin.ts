import mongoose, { Schema } from "mongoose";
import IAdmin from "../interfaces/admin";
import bcrypt from "bcrypt";

export type AdminModel = mongoose.Document & {
  name: string;
  family_name: string;
  email: string;
  password: string;
  user_name: string;
  phone_number: string;
  age: number;
  city: {
    town: string;
    adress: string;
    city_code: number;
  };
  verifyPassword : verifyPassword
};

type verifyPassword = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const verifyPassword : verifyPassword = function (this : AdminModel,candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

const adminSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    family_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    city: {
      town: { type: String, required: true },
      adress: { type: String, required: true },
      city_code: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

adminSchema.pre<IAdmin>("save", function save(next) {
  console.log("asd");
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

adminSchema.methods.verifyPassword = verifyPassword;

const Admin = mongoose.model<AdminModel>("Admin", adminSchema);

export default Admin;