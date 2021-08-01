import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFunction {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  public async checkUserExist(email): Promise<Boolean> {
    const result = await this.usersRepository.findOne({ email });
    if (result) return true;
    return false;
  }
  public async registerUser(email, password): Promise<any> {
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    if (!await this.checkUserExist(email)) {
      await this.usersRepository.save(newUser);
      return;
    }
    throw 'User already exist';
  }
}
