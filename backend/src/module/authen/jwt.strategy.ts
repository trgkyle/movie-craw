import { AuthenService } from './authen.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authenService: AuthenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authenService.getUser(payload.username, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
