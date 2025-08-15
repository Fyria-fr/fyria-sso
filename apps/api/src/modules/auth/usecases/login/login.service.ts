import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../shared/ports/cache-storage';
import { LoginDto } from './login.dto';
import {
  comparePasswords,
  createSession,
  generateSessionId,
} from '../../config/sessions';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: {
        UserRole: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadGatewayException('Invalid password');
    }

    const sessionId = generateSessionId();

    const session = {
      id: user.id,
      user: {
        email: user.email,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        role: user.UserRole.map((r) => r.role),
      },
    };

    await createSession(this.cache, sessionId, session.user);

    return { sessionId, user: session };
  }
}
