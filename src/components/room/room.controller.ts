import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
} from "@dolphjs/dolph/common";
import {
  Post,
  Get,
  Put,
  Delete,
  Route,
  DBody,
  DReq,
  DRes,
  DParam,
  DQuery,
  Shield,
  UseMiddleware,
  DPayload,
} from "@dolphjs/dolph/decorators";
import { RoomService } from "./room.service";
import { CreateRoomDto, GetRoomsDto, UpdateRoomDto } from "./room.dto";
import { authShield } from "@/shared/shields/auth.shield";

@Route("rooms")
export class RoomController extends DolphControllerHandler<Dolph> {
  private RoomService: RoomService;

  constructor() {
    super();
    this.RoomService = new RoomService();
  }

  @Get("/")
  async getRooms(@DRes() res: DResponse, @DReq() req: DRequest) {
    const result = await this.RoomService.getRooms(req.query);
    SuccessResponse({ res, body: result });
  }

  @Get("/:id")
  async getRoomById(@DReq() req: DRequest, @DRes() res: DResponse) {
    const result = await this.RoomService.getRoomById(req.params.id);
    SuccessResponse({ res, body: result });
  }

  @Post("/")
  @UseMiddleware(authShield)
  async createRoom(
    @DBody(CreateRoomDto) body: CreateRoomDto,
    @DPayload() payload: any,
    @DRes() res: DResponse
  ) {
    const result = await this.RoomService.createRoom(body, payload.sub);
    SuccessResponse({ res, body: result });
  }

  @Put("/:id")
  @UseMiddleware(authShield)
  async updateRoom(
    @DParam("id") id: string,
    @DBody(UpdateRoomDto) body: UpdateRoomDto,
    @DPayload() payload: any,
    @DRes() res: DResponse
  ) {
    const result = await this.RoomService.updateRoom(id, body, payload.sub);
    SuccessResponse({ res, body: result });
  }

  @Delete("/:id")
  @UseMiddleware(authShield)
  async deleteRoom(
    @DPayload() payload: any,
    @DRes() res: DResponse,
    @DReq() req: DRequest
  ) {
    const result = await this.RoomService.deleteRoom(
      req.params.id,
      payload.sub
    );
    SuccessResponse({ res, body: result });
  }
}
