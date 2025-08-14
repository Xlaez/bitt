import { Schema, Document, model, Types } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IRoom extends Document {
  _id: Types.ObjectId;
  title: string;
  type: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  image: string;
  description?: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: Types.ObjectId,
      ref: "accounts",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

RoomSchema.index({ owner: 1 }, { background: true });
RoomSchema.index({ location: "text", title: "text" }, { background: true });

RoomSchema.plugin(mongoosePagination);

export const RoomModel: Pagination<IRoom> = model<IRoom, Pagination<IRoom>>(
  "rooms",
  RoomSchema
);
