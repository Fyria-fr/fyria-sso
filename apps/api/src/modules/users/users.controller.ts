import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from '../../types/auth-request';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller(routesV1.version)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(routesV1.users.root)
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    return { users: users };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.users.root)
  async add(
    @Body() addUserDto: AddUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const users = await this.usersService.add(addUserDto, request.session.user);
    return { users: users };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.users.root)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = await this.usersService.update(
      updateUserDto,
      request.session.user,
    );

    return { user: user };
  }

  @Delete(routesV1.users.root)
  async delete(
    @Body() deleteUserDto: DeleteUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const events = await this.usersService.delete(
      deleteUserDto,
      request.session.user,
    );

    return { events: events };
  }
}
