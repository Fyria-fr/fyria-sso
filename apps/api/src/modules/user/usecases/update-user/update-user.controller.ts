import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { UpdateUserDto } from './update-user.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { UpdateUserService } from './update-user.service';

@Controller(routesV1.version)
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @UseGuards(AuthGuard)
  @Put(routesV1.users.root)
  async execute(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = await this.updateUserService.execute(
      updateUserDto,
      request.session.user,
    );

    return { user: user };
  }
}
