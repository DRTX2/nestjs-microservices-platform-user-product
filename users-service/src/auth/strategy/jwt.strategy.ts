import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

// this class validate JWT token and takes payload from it, used for protected routes

// PassportStrategy is an abstract class that nestjs provides for use distinct strategies of Strategies
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // how to read token, and verify if it's not forged(falsificado)
      secretOrKey: configService.get<string>("JWT_SECRET")!,
    });
  }

  async validate(payload: any) {
    // this is that we expose like req.user automatically, if token is valid
    return { userId: payload.sub, role: payload.role };
  }
}
