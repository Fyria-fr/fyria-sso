import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { getSessionStorageKey, SESSION_TTL_MS } from './config/storage';
import { v4 as uuidv4 } from 'uuid';
import { CacheStorage } from '../../shared/ports/cache-storage';
import { Session } from '../../types/session';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
  ) {}

  async getUser(sessionId: string): Promise<Session['user'] | null> {
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );
    if (!user) {
      return null;
    }
    return user;
  }

  async logout(sessionId: string) {
    await this.cache.del(getSessionStorageKey(sessionId));
  }

  async refreshSession(sessionId: string) {
    const sessionKey = getSessionStorageKey(sessionId);
    const user = await this.cache.get(sessionKey);
    if (!user) {
      throw new BadRequestException('Invalid session');
    }

    await this.cache.del(sessionKey);
    await this.cache.set(sessionKey, user, SESSION_TTL_MS);

    return { sessionId, user };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await this.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadGatewayException('Invalid password');
    }

    const sessionId = this.generateSessionId();

    const session = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name || '',
    };

    await this.createSession(sessionId, session);

    return { sessionId, user: session };
  }

  private async createSession(sessionId: string, user: Session['user']) {
    await this.cache.set(getSessionStorageKey(sessionId), user, SESSION_TTL_MS);
  }

  private generateSessionId() {
    return uuidv4();
  }

  private async comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
