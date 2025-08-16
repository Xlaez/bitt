import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  BadRequestException,
  SuccessResponse,
  DResponse,
} from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { AccountModel, IAccount } from "./account.model";
import { hashString, compareHashedString } from "@dolphjs/dolph/utilities";
import { Response } from "express";
import { RegisterDto, LoginDto } from "./account.dto";
import { TokensService } from "../token/token.service";

@InjectMongo("accountModel", AccountModel)
export class AccountService extends DolphServiceHandler<Dolph> {
  accountModel!: Model<IAccount>;
  TokensService: TokensService;

  constructor() {
    super("accountservice");
    this.TokensService = new TokensService();
  }

  async register(dto: RegisterDto, res: DResponse) {
    const existingAccount = await this.accountModel.findOne({
      email: dto.email,
    });

    if (existingAccount) {
      throw new BadRequestException(
        "An account with this email already exists"
      );
    }

    const hashedPassword = await hashString(dto.password, 12);

    const account = await this.accountModel.create({
      email: dto.email,
      firstname: dto.firstname,
      lastname: dto.lastname,
      password: hashedPassword,
    });

    const { accessToken } = await this.TokensService.generateToken(
      account._id.toString()
    );

    return {
      id: account._id,
      email: account.email,
      firstname: account.firstname,
      lastname: account.lastname,
      accessToken,
    };
  }

  async login(dto: LoginDto, res: Response) {
    const account = await this.accountModel.findOne({ email: dto.email });

    if (!account) {
      throw new BadRequestException("Invalid credentials");
    }

    if (
      !account.password ||
      !compareHashedString(dto.password, account.password)
    ) {
      throw new BadRequestException("Invalid credentials");
    }

    const { accessToken } = await this.TokensService.generateToken(
      account._id.toString()
    );

    return {
      id: account._id,
      email: account.email,
      firstname: account.firstname,
      lastname: account.lastname,
      accessToken,
    };
  }

  async logout() {
    return { message: "Logged out successfully" };
  }

  async fetchUser(filter: any) {
    return this.accountModel.findOne(filter);
  }
}
