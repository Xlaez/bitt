import { Schema, Document, model } from "mongoose";

export interface IAccount extends Document {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
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
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const AccountModel = model<IAccount>("accounts", AccountSchema);
