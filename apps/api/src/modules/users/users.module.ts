import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [SharedModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
