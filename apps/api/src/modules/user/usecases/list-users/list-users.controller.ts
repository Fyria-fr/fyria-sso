import { Controller, Get } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { ListUsersService } from './list-users.service';

@Controller(routesV1.version)
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get(routesV1.users.root)
  async listUsers() {
    const users = await this.listUsersService.execute();

    return { users: users };
  }
}
