import { Schema, Document, model } from "mongoose";

export interface IToken extends Document {
  token: string;
  userId: string;
  type: string;
  expiresAt: Date;
}

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["ACCESS"],
      default: "ACCESS",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

tokenSchema.index({ token: 1, userId: 1 }, { background: true });

export const TokenModel = model<IToken>("tokens", tokenSchema);
