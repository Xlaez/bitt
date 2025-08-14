import { Component } from "@dolphjs/dolph/decorators";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Component({ controllers: [TokenController], services: [TokenService] })
export class TokenComponent {}
