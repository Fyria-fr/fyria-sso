import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { getCookiesOptions } from '../../shared/utils/cookies';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from '../../types/auth-request';

@Controller(routesV1.version)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post(routesV1.auth.login)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    this.setCookie(res, result.sessionId);
    res.status(HttpStatus.OK).json({
      account: result.user,
    });
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.auth.logout)
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.authService.logout(req.session.id);

    res.clearCookie('sessionId');

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(routesV1.auth.me)
  async me(@Req() request: AuthenticatedRequest) {
    if (!request.session) {
      return { data: null };
    }
    const user = await this.authService.getUser(request.session.id);

    return { account: user };
  }

  private setCookie(res: Response, sessionId: string) {
    res.cookie('sessionId', sessionId, getCookiesOptions(this.configService));
  }
}
