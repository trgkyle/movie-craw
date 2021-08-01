import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async getUser(email, password): Promise<any> {
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    const result = await this.usersRepository.findOne(newUser);
    if (result && result.email) {
      return result
    }
    throw "Username or password didn't correct";
  }
  
  public async loginUser(email, password): Promise<any> {
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    const result = await this.usersRepository.findOne(newUser);
    if (result && result.email) {
      return {
        access_token: this.jwtService.sign({
          username: result.email,
          password: result.password,
        }),
      };
    }
    throw "Username or password didn't correct";
  }
}
