import { AuthenModule } from '../authen/authen.module';
import { UserResolver } from './user.resolver';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserFunction } from './user.function';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthenModule],
  providers: [UserResolver, UserFunction],
})
export class UserModule {
  constructor(private userService: UserFunction) {
    // try {
    //   this.userService.checkUserExist('admin@admin.com').then(data => {
    //     if(data) return;
    //     this.userService.registerUser('admin@admin.com', '123qweasd');
    //   });
    // } catch (e) {
    //   console.log("Should remove");
    // }
  }
}
