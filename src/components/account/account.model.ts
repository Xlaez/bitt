import { Schema, Document, model } from "mongoose";

export interface IAccount extends Document {
  _id: string;
  email: string;
  username: string;
  name: string;
  password: string;
  age: number;
  otp: string;
  otpExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

AccountSchema.index({ email: 1, username: 1 }, { background: true });

export const AccountModel = model<IAccount>("accounts", AccountSchema);
