import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthenService } from '../authen/authen.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthenService, JwtStrategy],
  exports: [AuthenService]
})
export class AuthenModule {}
