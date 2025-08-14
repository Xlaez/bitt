import { Component } from "@dolphjs/dolph/decorators";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Component({ controllers: [RoomController], services: [RoomService] })
export class RoomComponent {}
