import { Controller, Get, Req } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { GetUserService } from './get-user.service';

@Controller(routesV1.version)
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get(routesV1.auth.me)
  async getUser(@Req() request: AuthenticatedRequest) {
    if (!request.session) {
      return { data: null };
    }
    const user = await this.getUserService.getUser(request.session.id);

    return { account: user };
  }
}
