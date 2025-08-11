import { DolphFactory } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";
import { WalletComponent } from "./components/wallet/wallet.component";

const dolph = new DolphFactory([AccountComponent, WalletComponent]);
dolph.start();
