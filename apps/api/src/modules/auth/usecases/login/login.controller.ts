import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { LoginDto } from './login.dto';
import { Response } from 'express';
import { getCookiesOptions } from '../../../../shared/utils/cookies';
import { ConfigService } from '@nestjs/config';
import { LoginService } from './login.service';

@Controller(routesV1.version)
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @Post(routesV1.auth.login)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.loginService.login(loginDto);
    this.setCookie(res, result.sessionId);
    res.status(HttpStatus.OK).json({
      account: result.user,
    });
  }

  private setCookie(res: Response, sessionId: string) {
    res.cookie('sessionId', sessionId, getCookiesOptions(this.configService));
  }
}
