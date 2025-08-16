import {
  DNextFunc,
  DRequest,
  DResponse,
  ForbiddenException,
  UnauthorizedException,
} from "@dolphjs/dolph/common";
import { verifyJWTwithHMAC } from "@dolphjs/dolph/utilities";
import { AccountService } from "@/components/account/account.service";

const accountService = new AccountService();

export const authShield = async (
  req: DRequest,
  res: DResponse,
  next: DNextFunc
) => {
  try {
    const authToken = req.headers?.authorization;

    if (!authToken) {
      return next(
        new UnauthorizedException("No authentication token provided")
      );
    }

    const payload = verifyJWTwithHMAC({
      token: authToken.split(" ")[1],
      secret: "default_jwt_secret",
    });

    if (!payload) {
      return next(new UnauthorizedException("Invalid or expired token"));
    }

    const account = await accountService.fetchUser({ _id: payload.userId });

    if (!account) {
      return next(
        new ForbiddenException("Cannot find this authenticated account")
      );
    }

    req.payload = {
      sub: account._id.toString(),
      info: {
        id: account._id,
        email: account.email,
        firstname: account.firstname,
        lastname: account.lastname,
      },
      exp: payload.exp,
      iat: payload.iat,
    };

    next();
  } catch (e) {
    next(new UnauthorizedException(e.message));
  }
};
