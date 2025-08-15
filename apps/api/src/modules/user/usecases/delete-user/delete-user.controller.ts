import { Body, Controller, Delete, Req } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { DeleteUserDto } from './delete-user.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { DeleteUserService } from './delete-user.service';

@Controller(routesV1.version)
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}
  @Delete(routesV1.users.root)
  async delete(
    @Body() deleteUserDto: DeleteUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const events = await this.deleteUserService.execute(
      deleteUserDto,
      request.session.user,
    );

    return { events: events };
  }
}
