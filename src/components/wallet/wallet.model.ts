import { Schema, Document, model, Types } from "mongoose";

export interface IWallet extends Document {
  _id: string;
  account: any;
  balance: string;
  currency: string;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema(
  {
    account: {
      type: Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    balance: {
      type: String,
      default: "0.00",
    },
    currency: {
      type: String,
      default: "BTC",
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

WalletSchema.index({ account: 1, currency: 1 }, { background: true });

export const WalletModel = model<IWallet>("wallets", WalletSchema);
