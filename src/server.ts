import { DolphFactory } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { RoomComponent } from "./components/room/room.component";

const dolph = new DolphFactory([
  AccountComponent,
  WalletComponent,
  RoomComponent,
]);
dolph.start();
