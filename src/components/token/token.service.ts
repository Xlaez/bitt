import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph, BadRequestException } from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { TokenModel, IToken } from "./token.model";
import { Response } from "express";
import * as jwt from "jsonwebtoken";

@InjectMongo("tokenModel", TokenModel)
export class TokensService extends DolphServiceHandler<Dolph> {
  tokenModel!: Model<IToken>;

  constructor() {
    super("tokenservice");
  }

  async generateToken(userId: string) {
    const secret = "default_jwt_secret";
    const expiresIn = "1h";

    const token = jwt.sign({ userId }, secret, { expiresIn });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.tokenModel.create({
      token,
      userId,
      type: "ACCESS",
      expiresAt,
    });

    return { accessToken: token };
  }

  async sendCookie(token: string, res: Response, data: any) {
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return {
      message: "Success",
      data,
    };
  }

  async verifyToken(token: string) {
    const secret = "default_jwt_secret";

    try {
      const decoded = jwt.verify(token, secret) as { userId: string };
      const tokenRecord = await this.tokenModel.findOne({
        token,
        userId: decoded.userId,
        expiresAt: { $gt: new Date() },
      });

      if (!tokenRecord) {
        throw new BadRequestException("Invalid or expired token");
      }

      return decoded.userId;
    } catch (error) {
      throw new BadRequestException("Invalid or expired token");
    }
  }
}
