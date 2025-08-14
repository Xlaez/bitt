import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
} from "@dolphjs/dolph/common";
import { Get, Post, Route, DBody, DRes } from "@dolphjs/dolph/decorators";
import { AccountService } from "./account.service";
import { RegisterDto, LoginDto } from "./account.dto";

@Route("account")
export class AccountController extends DolphControllerHandler<Dolph> {
  private AccountService: AccountService;

  constructor() {
    super();
    this.AccountService = new AccountService();
  }

  @Post("register")
  async register(
    @DBody(RegisterDto) body: RegisterDto,
    @DRes() res: DResponse
  ) {
    await this.AccountService.register(body, res);
    SuccessResponse({ res, body: { message: "Success" } });
  }

  @Post("login")
  async login(@DBody(LoginDto) body: LoginDto, @DRes() res: DResponse) {
    await this.AccountService.login(body, res);
    SuccessResponse({ res, body: { message: "Success" } });
  }

  @Post("logout")
  async logout(@DRes() res: DResponse) {
    const result = await this.AccountService.logout(res);
    SuccessResponse({ res, body: result });
  }
}
