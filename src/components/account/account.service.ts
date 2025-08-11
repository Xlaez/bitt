import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";
import { InjectMongo} from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { AccountModel, IAccount } from "./account.model";


@InjectMongo("accountModel", AccountModel)
export class AccountService extends DolphServiceHandler<Dolph> {
  accountModel!: Model<IAccount>;

  constructor() {
    super("accountservice");
  }
}
    
