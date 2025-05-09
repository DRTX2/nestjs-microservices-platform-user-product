import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// this inherit jwt verification logic, so, read token, verify with the appropiate strategy, and if its valid call to validate method, and if all went good, continue the way throw routes or an Exception(401)
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}