import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { RoomModel, IRoom } from "./room.model";
import { CreateRoomDto, UpdateRoomDto } from "./room.dto";
import { Pagination } from "mongoose-paginate-ts";

@InjectMongo("roomModel", RoomModel)
export class RoomService extends DolphServiceHandler<Dolph> {
  roomModel!: Pagination<IRoom>;

  constructor() {
    super("roomservice");
  }

  async createRoom(dto: CreateRoomDto, userId: string) {
    const room = await this.roomModel.create({
      ...dto,
      owner: userId,
    });

    return {
      message: "Room created successfully",
      data: room,
    };
  }

  async getRooms(query: { location?: string; page?: number; limit?: number }) {
    const { location = "", page = 1, limit = 10 } = query;
    const filter = location ? { $text: { $search: location } } : ({} as any);

    const rooms = await this.roomModel.paginate(filter, { page, limit } as any);

    return rooms;
  }

  async getRoomById(id: string) {
    const room = await this.roomModel
      .findById(id)
      .populate("owner", "firstname lastname email");
    if (!room) {
      throw new NotFoundException("Room not found");
    }
    return room;
  }

  async updateRoom(id: string, dto: UpdateRoomDto, userId: string) {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException("Room not found");
    }
    if (room.owner.toString() !== userId) {
      throw new ForbiddenException("You do not own this room");
    }

    Object.assign(room, dto);
    await room.save();

    return {
      message: "Room updated successfully",
      data: room,
    };
  }

  async deleteRoom(id: string, userId: string) {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException("Room not found");
    }
    if (room.owner.toString() !== userId) {
      throw new ForbiddenException("You do not own this room");
    }

    await room.deleteOne();

    return {
      message: "Room deleted successfully",
    };
  }
}
