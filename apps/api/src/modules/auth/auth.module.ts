import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { GetUserService } from './usecases/get-user/get-user.service';
import { GetUserController } from './usecases/get-user/get-user.controller';
import { LoginController } from './usecases/login/login.controller';
import { LogoutController } from './usecases/logout/logout.controller';
import { LoginService } from './usecases/login/login.service';
import { LogoutService } from './usecases/logout/logout.service';

@Module({
  imports: [SharedModule],
  providers: [GetUserService, LoginService, LogoutService],
  controllers: [GetUserController, LoginController, LogoutController],
  exports: [],
})
export class AuthModule {}
