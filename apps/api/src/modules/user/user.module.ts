import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateUserService } from './usecases/create-user/create-user.service';
import { DeleteUserService } from './usecases/delete-user/delete-user.service';
import { ListUsersService } from './usecases/list-users/list-users.service';
import { UpdateUserService } from './usecases/update-user/update-user.service';
import { CreateUserController } from './usecases/create-user/create-user.controller';
import { ListUsersController } from './usecases/list-users/list-users.controller';
import { DeleteUserController } from './usecases/delete-user/delete-user.controller';
import { UpdateUserController } from './usecases/update-user/update-user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { UserPrismaRepository } from './infrastructure/repositories/user.prisma.repository';

@Module({
  imports: [SharedModule],
  providers: [
    CreateUserService,
    DeleteUserService,
    ListUsersService,
    UpdateUserService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [
    CreateUserController,
    DeleteUserController,
    ListUsersController,
    UpdateUserController,
  ],
  exports: [],
})
export class UserModule {}
