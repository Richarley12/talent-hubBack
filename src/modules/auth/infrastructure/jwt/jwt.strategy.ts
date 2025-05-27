import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';

interface JwtPayload {
  sub: string;
  email: string;
  companyId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt_secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.companyId) {
      throw new UnauthorizedException('Token sin empresa asociada');
    }

    return {
      id: payload.sub,
      email: payload.email,
      companyId: payload.companyId,
    };
  }


}
